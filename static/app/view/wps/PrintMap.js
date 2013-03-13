Ext.define('Webgis.view.wps.PrintMap', {
    extend: 'Ext.form.Panel',
    alias : 'widget.printmap',

    border: false,
    frame: true,

    width: 250,

    title: 'Stampa mappa',

    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    defaultType: 'textfield',

    autoScroll: true,

    maps: Webgis.maps[0],

    layer: new OpenLayers.Layer.Vector("Print Extent",{displayInLayerSwitcher: false}),

    capabilities: {"scales":[{"name":"1:1,000","value":"1000"},{"name":"1:2,000","value":"2000"},{"name":"1:4,000","value":"4000"},
        {"name":"1:8,000","value":"8000"},{"name":"1:16,000","value":"16000"},
        {"name":"1:32,000","value":"32000"},{"name":"1:64,000","value":"64000"},
        {"name":"1:128,000","value":"128000"},{"name":"1:256,000","value":"256000"},
        {"name":"1:512,000","value":"512000"},{"name":"1:1,024,000","value":"1024000"},{"name":"1:2,048,000","value":"2048000"}
    ],
        "dpis":[{"name":"75","value":"75"},{"name":"150","value":"150"},{"name":"300","value":"300"}],
        "layouts":[{"name":"A4","map":{"width":440,"height":600},"rotation":false}],
        "printURL":"http://demo.opengeo.org/geoserver/pdf/print.pdf","createURL":"http://demo.opengeo.org/geoserver/pdf/create.json"},

    dockedItems: [{
        text: 'Invia',
        dock: 'bottom',
        componentCls: 'x-base-return-button',
        xtype: 'button',
        disableCaching: false,
        handler: function() {
            var form = this.up('form').getForm();

            var dpi = this.up("form").down("combobox[name=dpi]");
            var filename = this.up("form").down("textfield[name=OUTPUT_FILENAME]");
            var bbox = this.up("form").PrintExtent.pages[0].getPrintExtent(Webgis.maps[0]);
            var map = Webgis.maps[0];
//  TODO SISTEMARE QUESTA PARTE PER GENERALIZZARE IL CODICE!!!
//            http://geoext.github.com/geoext2/docs/source/PrintProvider.html#GeoExt-data-PrintProvider-event-print
            // ensure that the baseLayer is the first one in the encoded list
//            var layers = map.layers.concat();
//
//            Ext.Array.remove(layers, map.baseLayer);
//            Ext.Array.insert(layers, 0, [map.baseLayer]);
//
//            Ext.each(layers, function(layer){
//                if(layer instanceof OpenLayers.Layer.WMS && layer.getVisibility() === true) {
//                    var enc = this.encodeLayer(layer);
//                    enc && encodedLayers.push(enc);
//                }
//            }, this);


            var res = new Array();
            for (var i = 0; i < Webgis.maps[0].layers.length; i++){
                if(Webgis.maps[0].layers[i] instanceof OpenLayers.Layer.WMS){

                    var url = Webgis.maps[0].layers[i].getFullRequestString({
                        BBOX: bbox,
                        WIDTH:440,
                        HEIGHT: 600,
                        VERSION: '1.1.1'
                    });
                    var opacity = Webgis.maps[0].layers[i].opacity;
                    res.push(
                        "FILE_URL_OPACITY=" +
                        encodeURIComponent(decodeURIComponent(url)) +
                        "|"+
                        opacity
                    );
                }
            }

            res.push("OUTPUT_FILENAME="+filename.getValue());

            if(form.isValid()){

                Ext.Ajax.request({
                    scope: this,
                    method: 'GET',
                    params: {
                        DataInputs: res.join(";"),
                        Identifier:	'org.n52.wps.server.algorithm.FBK.ImageOverlayProcess',
                        Request: 'Execute',
                        ResponseDocument: 'OUTPUT_LINK',
                        Service: 'WPS',
                        Version: '1.0.0'
                    },
                    url: '/tomcat/wps/WebProcessingService',
                    success: function(response, opts) {
                        literal = response.responseXML.getElementsByTagName("LiteralData")[0];
                        urlres = literal.childNodes[0].nodeValue;
                        Ext.Msg.show({
                            title:'Stampa completata',
                            msg: 'La sua richiesta di stampa e\' stata correttamente processata' +
                                '<br/>Puoi accedere al risultato al seguente ' +
                                '<b><a href="'+urlres+'" target="_blank">url</a></b>',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                    },
                    failure: function(response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }
        }
    }],

    initComponent: function() {

        //init del controllo per creare la pagina vector
        var printProvider = Ext.create('GeoExt.data.PrintProvider', {
            method: "GET", // "POST" recommended for production use
            capabilities: this.capabilities, // from the info.json script in the html
            customParams: {
                mapTitle: "Printing Demo",
                comment: "This is a map printed from GeoExt."
            }
        });
        this.PrintExtent = Ext.create('GeoExt.plugins.PrintExtent', {
            printProvider: printProvider,
            map:this.maps,
            layer:this.layer
        });
        this.PrintExtent.createControl();
        this.PrintExtent.addPage();

        //Set listener per visualizzare la pagina
        this.on("activate", this.onPanelActivate, this);
        this.on("hide", this.onPanelHidden, this);

        this.items = [{
            xtype: 'displayfield',
            hideLabel: true,
            name: 'home',
            margin: '0 0 15 0',
            value: 'Per stampare una mappa, compilare i seguenti campi e poi premere sul pulsante "stampa".' +
                '<br/><b>Attenzione!</b><br/>Il tempo di esecuzione puo\' varirare a seconda quantita\' di mappe visualizati e/o della dimensione richiesta.'
        },{
            xtype: 'hiddenfield',
            name: 'Request',
            value: 'Execute'
        },{
            xtype: 'hiddenfield',
            name: 'Identifier',
            value: 'org.n52.wps.server.algorithm.FBK.ImageOverlayProcess'
        },{
            xtype: 'hiddenfield',
            name: 'Version',
            value: '1.0.0'
        },{
            xtype: 'hiddenfield',
            name: 'Service',
            value: 'WPS'
        },{
            xtype: 'hiddenfield',
            name: 'ResponseDocument',
            value: 'OUTPUT_LINK'
        },{
            fieldLabel: 'Nome file di output',
            labelAlign: "top",
            name: 'OUTPUT_FILENAME',
            allowBlank: false
        },{
            fieldLabel: 'DPI (risoluzione)',
            xtype: 'combobox',
            store: Ext.create('Ext.data.Store',{
                fields: ['abbr', 'name'],
                data : [
                    {"abbr":"300", "name":"300 dpi"},
                    {"abbr":"150", "name":"150 dpi"},
                    {"abbr":"90", "name":"90 dpi"}
                ]
            }),
            labelAlign: "top",
            queryMode: 'local',
            displayField: 'name',
            valueField: 'abbr',
            name: 'dpi',
            allowBlank: false
        }];

        this.callParent(arguments);
    },
    onPanelActivate: function(){
        this.PrintExtent.show();
        var page = this.PrintExtent.pages[0];
        page.fit(Webgis.maps[0],{mode:"screen"})
    },
    onPanelHidden: function(){
        this.PrintExtent.hide();
    }

});