Ext.define('Webgis.view.wps.BufferAndIntersect', {
    extend: 'Ext.form.Panel',
    alias : 'widget.bufferandintersect',

    border: false,
    frame: true,

    width: 250,

    title: 'Esegui il modello',

    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    defaultType: 'textfield',

    autoScroll: true,

    olMap: Webgis.maps[0],

    dockedItems: [{
        text: 'Invia',
        dock: 'bottom',
        componentCls: 'x-base-return-button',
        xtype: 'button',
        disableCaching: true,
        handler: function() {
            var form = this.up('form').getForm();

            var point = this.up("form").down("hiddenfield[name=lonlat]");
            var wfs_url = this.up("form").down("combobox[name=buffer-layer]");
            var buffer = this.up("form").down("textfield[name=buffer]");
            var column_name = this.up("form").down("combobox[name=buffer-column]");

            var res = new Array();
            res.push('POINT='+point.getValue());
            res.push('WFS_URL='+encodeURIComponent(decodeURIComponent(wfs_url.wfs_url.split("|")[0])));
            res.push('BUFFER_RADIUS='+buffer.getValue());
            res.push('COLUMN_NAME='+column_name.getValue().toLowerCase());
            res.push('LAYER_NAME='+wfs_url.wfs_url.split("|")[1]);
            res.push('CRS_ID=EPSG:32632');
            var myMask = new Ext.LoadMask( this.up("form"), {msg:"Operazione in corso..."});
            myMask.show();

            if(form.isValid()){
                Ext.Ajax.request({
                    scope: this,
                    method: 'GET',
                    params: {
                        Identifier:	'org.n52.wps.server.algorithm.FBK.WFSCropBuffer',
                        Request: 'Execute',
                        Service: 'WPS',
                        Version: '1.0.0'
                    },
                    url: '/tomcat/wps/WebProcessingService?DataInputs='+res.join(";")+'&ResponseDocument=TOTAL_BUFFER_SUM;GEOJSON_CROP_BUFFER',
                    success: function(response, opts) {
                        //var obj = Ext.decode(response.responseText);
                        var xml=response.responseXML;
                        var outputs = xml.getElementsByTagName('Output');
                        var sum = outputs[0].getElementsByTagName('LiteralData')[0].childNodes[0].wholeText;
                        var geojson = Ext.decode(outputs[1].getElementsByTagName('LiteralData')[0].childNodes[0].wholeText);

                        try {
                            var geojson_format = new OpenLayers.Format.GeoJSON();
                            var vector_layer = new OpenLayers.Layer.Vector("Output modello");
                            Webgis.maps[0].addLayer(vector_layer);
                            vector_layer.addFeatures(geojson_format.read(geojson));

                            myMask.hide()

                            Ext.MessageBox.show({
                                title:'Modello calcolato correttamente.',
                                msg: 'Il modello da lei richiesto e\' stato eseguito corretamente.<br/> In mappa verra\' visualizzata l\'intersezione ottenuta.' +
                                    'La somma dell\'attributo richiesto e\' di: <b>' +
                                    sum +
                                    '</b>',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });

                        } catch(e) {
                            Ext.MessageBox.show({
                                title:'Errore nel eseguire il modello',
                                msg: 'Siamo spiacenti, ma in seguiti ad errori imprevisti, non e\' stato possibile eseguire l\'operazione da lei richiesta.',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                            myMask.hide()
                            Raven.captureException(e, {
                                tags: {
                                    context: 'Ext.Ajax.Request',
                                    origin: 'Webgis.view.wps.BufferAndIntersect',

                                }
                            })
                        }


                    },
                    failure: function(response, opts) {
                        Ext.MessageBox.show({
                            title:'Errore nel eseguire il modello',
                            msg: 'Siamo spiacenti, ma in seguiti ad errori imprevisti, non e\' stato possibile eseguire l\'operazione da lei richiesta.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        }
    },{
        text: "Seleziona punto",
        xtype: "button",
        dock: 'bottom',
        getmouse: true,
        componentCls: 'x-base-return-button',
        enableToggle: true
    }],

    initComponent: function() {
        var st = Ext.getCmp('webgiscenter').map.store;
        this.items = [{
            xtype: 'displayfield',
            hideLabel: true,
            name: 'home',
            margin: '0 0 15 0',
            value: 'Questo modello permette di selezionare un punto e in seguito di intersecare la selezione con il tematismo indicato.' +
                '<br/>Una volta completato il processo l\'output viene caricato in mappa.'
        },{
            xtype: 'hiddenfield',
            name: 'Request',
            value: 'Execute'
        },{
            xtype: 'hiddenfield',
            name: 'Identifier',
            value: 'org.n52.wps.server.algorithm.FBK.WFSCropBuffer'
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
            id: 'buffer-lonlatwps',
            name: 'lonlat'
        },{
            fieldLabel: 'Lon/Lat segnalazione',
            labelAlign: "top",
            id: 'buffer-lonlat',
            name: 'punto',
            disabled: false,
            emptyText: "Selezionare un punto sulla mappa...",
            allowBlank: false
        },{
            fieldLabel: 'Raggio del buffer (m)',
            labelAlign: "top",
            name: 'buffer',
            allowBlank: false
        },{
            fieldLabel: 'Layer che si vuole intersecare',
            xtype: 'combobox',
            store: st,
            labelAlign: "top",
            queryMode: 'local',
            displayField: 'name',
            name: 'buffer-layer',
            listeners: {
                select: this.updateComboColumn
            },
            allowBlank: false
        },{
            fieldLabel: 'Colonna che si vuole sommare',
            xtype: 'combobox',
            store:  Ext.create('Ext.data.Store',{
                fields: ['localType', 'name'],
                data : [
                ]
            }),
            labelAlign: "top",
            queryMode: 'local',
            displayField: 'name',
            name: 'buffer-column',
            allowBlank: false
        }];

        this.markerslayer = new OpenLayers.Layer.Markers("Markers 3",{displayInLayerSwitcher:false});
        var size = new OpenLayers.Size(15,24);
        var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
        this.iconol = new OpenLayers.Icon("/static/resources/images/icons/getmouseposition25.png", size, offset);

        this.control = new OpenLayers.Control.Click({
            handlerOptions: {
                "single": true,
                "ref": this
            },
            fn: this.updateInfoPanel
        })
        this.olMap.addControl(this.control);

        this.callParent(arguments);
    },
    updateInfoPanel: function(e){
        var latlon = this.handlerOptions.ref.olMap.getLonLatFromPixel(e.xy);
        var latlon4326 = latlon.clone().transform("EPSG:32632","EPSG:4326")

        var latloncp = Ext.getCmp("buffer-lonlat");
        var latlonwps = Ext.getCmp("buffer-lonlatwps");

        latloncp.setValue("POINT ("+latlon4326.lat+","+latlon4326.lon+")");
        latlonwps.setValue(latlon.lon+","+latlon.lat);
        this.handlerOptions.ref.markerslayer.addMarker(new OpenLayers.Marker(latlon, this.handlerOptions.ref.iconol))
    },
    updateComboColumn: function(combo, rec){
//        console.log(rec[0]);
        var form = combo.up("form");
        var combocol = form.down("combobox[name='buffer-column']");

        var map = rec[0].data.map;
        var l = map.getLayersBy('id',rec[0].data.id)[0]; //Assumo che l'id sia univoco e che mi restituisca solo un layer
        var url = l.getFullRequestString({SERVICE:'wfs',VERSION:'1.1.0',REQUEST:'DescribeFeatureType',TYPENAME:l.params.LAYERS});

        if(url.search("http") < 0){
            combo.wfs_url = location.origin + l.getFullRequestString({SERVICE:'wfs',VERSION:'1.1.0',REQUEST:'GetFeature',TYPENAME:l.params.LAYERS});
        } else {
            combo.wfs_url = l.getFullRequestString({SERVICE:'wfs',VERSION:'1.1.0',REQUEST:'GetFeature',TYPENAME:l.params.LAYERS});
        }
        combo.wfs_url = combo.wfs_url + '|' + l.params.LAYERS;



        Ext.Ajax.request({
            scope: this,
            method: 'GET',
            url: '/webgis/proxy?url='+encodeURIComponent(url),
            success: function(response, opts) {
                var featureTypesParser = new OpenLayers.Format.WFSDescribeFeatureType();
                var responseText = featureTypesParser.read(response.responseText);
                var featureTypes = responseText.featureTypes;
                var st = combocol.getStore()
                st.loadData(featureTypes[0].properties);

            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    }

});
