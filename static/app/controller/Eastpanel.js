Ext.define('Webgis.controller.Eastpanel', {
    extend: 'Ext.app.Controller',

    views: [
        'function.WfsInfo'
    ],

    requires: [
        'Ext.container.Viewport',
        'Ext.layout.container.Border',
        'GeoExt.panel.Map',
        'GeoExt.container.WmsLegend',
        'GeoExt.container.UrlLegend',
        'GeoExt.container.VectorLegend',
        'GeoExt.panel.Legend'
    ],

    refs: [{
        ref: "webgiseastpanel",
        selector: "#webgiseastpanelbtn"
    },{
        ref: 'fnpanel',
        selector: 'functionbtnpanel'
    },{
        ref: "btnfiltro",
        selector: "#btn-fn-filtro"
    },{
        ref: 'btnrmfiltro',
        selector: '#btn-fn-rmfiltro'
    },{
        ref: 'TreeCatalogLayer',
        selector: 'geotreecataloglayer'
    }],

    stores: [
        'function.ShpStyle',
        'function.WmsCapabilities'
    ],

    card_id: 1,

    init: function() {
        this.control({
            '#webgiseast':{
                render: {
                    fn:this.createFunctionPanel,
                    single: true
                }
            },
            '#btn-fn-toponimi':{
                toggle: {
                    fn: this.setToponimi,
                    scope: this
                }
            },
            '#btn-fn-segnalazioni':{
                toggle: {
                    fn: this.setSegnalazioni,
                    scope: this
                }
            },
            '#webgiseast geodocs button[getmouse]':{
                toggle: {
                    fn: this.getMousePosition,
                    scope: this
                }
            },
            '#webgiseast geodocs ':{
                deactivate: this.getMousePositionToggle
            },
            '#webgiseast bufferandintersect button[getmouse]':{
                toggle: {
                    fn: this.getMousePosition,
                    scope: this
                }
            },
            '#webgiseast bufferandintersect ':{
                deactivate: this.getMousePositionToggle
            },
            '#webgiseast button[iscard]':{
                click: this.updatePanel
            },
            'geodocsfilter button[isfilter]':{
                click: {
                    fn: this.applyFilter,
                    scope: this
                }
            },
            '#btn-fn-rmfiltro':{
                click: {
                    fn: this.rmFilter,
                    scope: this
                }
            },
            'wmscapabilities button[iswms]':{
                click: {
                    fn:this.connectToWmsServer,
                    scope:this
                }
            }

        });
    },
    //Funzione che crea un nuovo pannello per le funzioni e lo aggiunge all'area webgiswest
    createFunctionPanel: function(panel){
        starter.applyText('Rendering function east panel...');

        var p = this.getWebgiseastpanel();
        p.setVisible(true);
        if(panel.isHidden){
            panel.setVisible(true);
        }

        var fnpanel = Ext.create('Webgis.view.FunctionButtonPanel');

        p.add(fnpanel);

        this.addToggleBtn('Webgis.view.BaseButton',{
            text: "Toponimi",
            id: 'btn-fn-toponimi',
            enableToggle: true
        })

        /* * * * * * * * * * * *
         * Common function
         *
         */
//        var body = Ext.create('Webgis.view.function.MapLegend');
//        var body = Ext.create('GeoExt.panel.Legend',{
//            title: 'Legenda',
//            header: {
//                xtype: 'container',
//                html: 'Legenda',
//                border: false,
//                baseCls: 'x-maplegend-title'
//            },
//            defaults: {
//                labelCls: 'gx-legend-item',
//                style: 'padding:5px'
//            },
//            border: false,
//            autoScroll: true
//        });
//        this.addCardBtn(Ext.id(),'Legenda','',body);
        var body1 = Ext.create('Webgis.view.function.LayerSwitcher',{
            map: Webgis.maps[0],
            dockedItems: [{
                xtype: 'container',
                dock: 'top',
                html: 'Layer attivi',
                border: false,
                baseCls: 'x-maplegend-title'
            }]
        });
        this.addCardBtn(Ext.id(),'Layer attivi','',body1);

//        this.addToggleBtn('Ext.container.Container');

        /* * * * * * * * * * * *
         * GeoDocs Area
         *
         */
//        this.addToggleBtn('Webgis.view.BaseButton',{
//            text: "Segnalazioni",
//            id: 'btn-fn-segnalazioni',
//            enableToggle: true
//        });
//        var body2 = Ext.create('Webgis.view.function.GeoDocs');
//        this.addCardBtn(Ext.id(),'Aggiungi <br/>segnalazione','',body2);
//        var body3 = Ext.create('Webgis.view.function.GeoDocsFilter');
//        var btn3 = this.addCardBtn('btn-fn-filtro','Filtra <br/>segnalazioni','',body3);
//        btn3.setDisabled(true);
//        this.addToggleBtn('Webgis.view.BaseButton',{
//            text: "Rimuovi filtro",
//            id: 'btn-fn-rmfiltro',
//            enableToggle: false,
//            disabled: true
//        });

        /* * * * * * * * * * * *
         * ShpUploader Area
         *
         */
//        var shpStyle =  this.getFunctionShpStyleStore()
//        shpStyle.load(0);
//        var body4 = Ext.create('Webgis.view.function.StyleAdmin',{
//            store: shpStyle
//        });
//        this.addCardBtn(Ext.id(),'Gestione <br/>stili','',body4);
//        var body5 = Ext.create('Webgis.view.function.StyleUploader',{
//            store: shpStyle
//        });
//        this.addCardBtn(Ext.id(),'Aggiungi <br/>stile','',body5);
//        var body41 = Ext.create('Webgis.view.function.ShpUploader',{
//            store: shpStyle
//        });
//        this.addCardBtn(Ext.id(),'Aggiungi <br/>SHP','',body41);
        /* * * * * * * * * * * *
         * WMS request
         *
         */
//        var body6 = Ext.create('Webgis.view.function.WmsCapabilities',{
//            store: this.getFunctionWmsCapabilitiesStore()
//        });
//        this.addCardBtn(Ext.id(),'Aggiungi <br/>WMS','',body6);

//        var body7 = Ext.create('Webgis.view.wps.PrintMap');
//        this.addCardBtn(Ext.id(),'Stampa<br/>mappa','',body7);
//
//        var body8 = Ext.create('Webgis.view.wps.BufferAndIntersect');
//        this.addCardBtn(Ext.id(),'Modello <br/>buffer','',body8);

        var body9 = Ext.create('Webgis.view.catlas.PlrTassiStd');
        this.addCardBtn(Ext.id(),'Tasso grezzo<br/>standard','',body9);

        var body9 = Ext.create('Webgis.view.catlas.PlrTassiGrezzi');
        this.addCardBtn(Ext.id(),'Tasso <br/>grezzo','',body9);

        var body10 = Ext.create('Webgis.view.catlas.PlrPercentuale');
        this.addCardBtn(Ext.id(),'Distribuzione <br/>percentuale','',body10);

        var body11 = Ext.create('Webgis.view.catlas.PlrComunale');
        this.addCardBtn(Ext.id(),'Tasso grezzo<br/>comunale','',body11);
    },
    addToggleBtn: function(btn,opt){
        this.getFnpanel().add(Ext.create(btn,opt));
    },
    addCardBtn: function(btnid,text, iconcls, body){
        var btn = Ext.create('Webgis.view.BaseButton',{
            id: btnid,
            text: text,
            iconCls: iconcls,
            iscard: true,
            card_id: this.getNewCardId()
        });
        this.getFnpanel().add(btn);

        //add dock item whit return btn
        body.addDocked({
            border: false,
            dock: 'bottom',
            xtype: 'button',
            iscard: true,
            componentCls: 'x-base-return-button',
            card_id: 0,
            text: 'Chiudi ' + text
        },0);


        this.getWebgiseastpanel().add(body);
        return btn;
    },
    getCardId: function(){
        return this.card_id;
    },
    setCardId: function(){
        this.card_id = this.card_id + 1;
    },
    getNewCardId: function(){
        var old = this.card_id;
        this.setCardId();
        return old;
    },
    setToponimi: function(btn,toggle){
        var map = Webgis.maps[0]
        if(toggle){
            //Setting dei parametri per il WMS GetMap
            var params = {
                layers: Webgis.config.TOPONIMI_LAYER_NAME,
                format: 'image/png',
                transparent: true
            }

            //Setting per l'oggetto OpenLayers.Layers
            var options = {
                displayInLayerSwitcher: false,
                projection: map.projection
            }
            //Creo oggetto layer
            var l = new OpenLayers.Layer.WMS("Toponimi",
                Webgis.config.TOPONIMI_URL,
                params,
                options
            );
            btn.layer = l;
            map.addLayer(l);

            //Setto il listner per impostarlo sempre al livello piu' alto
            map.events.on({
                'addlayer': this.setFirstLayer,
                'removelayer': this.setFirstLayer,
                scope: btn
            });
        } else {
            //Setto il listner per impostarlo sempre al livello piu' alto
            map.events.un({
                'addlayer': this.setFirstLayer,
                'removelayer': this.setFirstLayer,
                scope: btn
            });

            map.removeLayer(btn.layer);
        }
    },setFirstLayer: function(){
        var map = Webgis.maps[0];
        var target = this.layer;

        map.setLayerIndex(target,map.getNumLayers());
    },
    updatePanel: function(btn){
        //Attivo la card associata al pulsante (parametro card_id del bottone).
        //Faccio il cast in maniera che il numero passato alla funzione setActiveItem sia intero
        this.getWebgiseastpanel().getLayout().setActiveItem(parseInt(btn.card_id));
    },
    /* * * * * * * * * * * *
     * GeoDocs Area
     *
     */
    getMousePosition: function(btn,toggle){
        var p = btn.up("form")
        if (toggle) {
            p.control.activate();
            //imposto marker layer
            p.olMap.addLayer(p.markerslayer);
        } else {
            p.olMap.removeLayer(p.markerslayer);
            p.control.deactivate();
        }
    },
    getMousePositionToggle: function(p){
        var btn = p.down("button[getmouse]");
        btn.toggle(false);
    },
    setSegnalazioni: function(btn,toggle){
        var map = Webgis.maps[0]
        if(toggle){

            var q1 = new OpenLayers.Rule({
                name: 'Poco importante',
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "degree",
                    value: 1
                }),
                symbolizer: {pointRadius: 6, fillColor: "#2B83BA", fillOpacity: 0.7, strokeColor: "black"}
            });
            var q2 = new OpenLayers.Rule({
                name: 'Mediamente importante',
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "degree",
                    value: 2
                }),
                symbolizer: {pointRadius:6, fillColor: "#ABDDA4", fillOpacity: 0.7, strokeColor: "black"}
            });
            var q3 = new OpenLayers.Rule({
                name: 'Importante',
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "degree",
                    value: 3
                }),
                symbolizer: {pointRadius: 6, fillColor: "#FFFFBF", fillOpacity: 0.7, strokeColor: "black"}
            });
            var q4 = new OpenLayers.Rule({
                name: 'Molto importante',
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "degree",
                    value: 4
                }),
                symbolizer: {pointRadius: 6, fillColor: "#FDAE61", fillOpacity: 0.7, strokeColor: "black"}
            });
            var q5 = new OpenLayers.Rule({
                name: 'Estremamente importante',
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "degree",
                    value: 5
                }),
                symbolizer: {pointRadius: 6, fillColor: "#D7191C", fillOpacity: 0.7, strokeColor: "black"}
            });
            var q5 = new OpenLayers.Rule({
                name: 'Estremamente importante',
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "degree",
                    value: 5
                }),
                symbolizer: {pointRadius: 6, fillColor: "#D7191C", fillOpacity: 0.7, strokeColor: "black"}
            });
            var q6 = new OpenLayers.Rule({
                name: 'Selezionato',
                symbolizer: {pointRadius: 6, fillColor: "black", fillOpacity: 0.7, strokeColor: "black"}
            });
            var style = new OpenLayers.Style();
            style.addRules([q1,q2,q3,q4,q5]);
            var l = new OpenLayers.Layer.Vector("Segnalazioni", {
                displayInLayerSwitcher: true,
                styleMap: new OpenLayers.StyleMap(style),
                strategies: [new OpenLayers.Strategy.BBOX()],
                protocol: new OpenLayers.Protocol.WFS.v1_1_0({
                     srsName: map.displayProjection,
                     url:  Webgis.config.GEODOCS_URL,
                     outputFormat:"json",
                     featureType: "geodocs_point"
                 })
            });
            btn.layer = l;
            Webgis.segnalazioni = {
                layer: l
            };
            map.addLayer(l);

            //Setto il listner per impostarlo sempre al livello piu' alto
            map.events.on({
                'addlayer': this.setFirstLayer,
                'removelayer': this.setFirstLayer,
                scope: btn
            });

            //Setto i listner, control per creare la finestra
            btn.layer.events.on({
                'featureselected':this.viewFeaturesInfo,
//                'featureunselected': this.viewFeaturesInfo,
                scope: btn
            });
            btn.ctrl = new OpenLayers.Control.SelectFeature(
                l,
                {
                    clickout: true, toggle: false,
                    multiple: false, hover: false,
                    toggleKey: "ctrlKey", // ctrl key removes from selection
                    multipleKey: "shiftKey", // shift key adds to selection
                    box: false
                }
            );
            map.addControl(btn.ctrl);
            btn.ctrl.activate();

            //Creo la finestra
            Ext.create('Webgis.view.function.WfsInfo',{
                listeners: {
                    hide: {
                        fn: function(cp){
                            this.ctrl.unselect(Webgis.segnalazioni.layer.selectedFeatures[0]);
                        },
                        scope: btn
                    }
                }
            });

            //Setto attivi i pulsanti
            this.getBtnfiltro().setDisabled(false);
        } else {
            //Setto il listner per impostarlo sempre al livello piu' alto
            map.events.un({
                'addlayer': this.setFirstLayer,
                'removelayer': this.setFirstLayer,
                scope: btn
            });
            btn.layer.events.un({
                'featureselected':this.viewFeaturesInfo,
                //TODO: rimuovere questo commento
//                'featureunselected': this.viewFeaturesInfo,
                scope: btn
            });
            btn.ctrl.deactivate();
            map.removeControl(btn.ctrl);
            map.removeLayer(btn.layer);

            //Elimino la finestra
            var w = Ext.getCmp("wfsinfo");
            w.destroy();

            //Disabilito i pulsanti
            this.getBtnfiltro().setDisabled(true);
        }
    },
    viewFeaturesInfo: function(ft){
        var w = Ext.getCmp('wfsinfo');
        //Setto la visibilita' corretamente in base al tipo di evento
        //TODO: Rimuovere questo commento
//        if(ft.type === 'featureselected' && !w.isVisible()){
//            w.setVisible(true);
//        } else {
//            w.setVisible(false);
//            b=this
//            //Webgis.segnalazioni.layer
//            return;
//        }
        if(ft.type === 'featureselected' && !w.isVisible()){
            w.setVisible(true);
        }

        var bbox = new OpenLayers.Geometry.Polygon.createRegularPolygon(
            ft.feature.geometry,
            100,
            4,
            0
        );
        var prevurl = Webgis.config.GEODOCS_URL_PREVIEW+"STYLES=&LAYERS=pupbos&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG%3A32632&BBOX="+bbox.getBounds().toBBOX()+"&WIDTH="+parseInt(bbox.getBounds().getWidth())+"&HEIGHT="+parseInt(bbox.getBounds().getHeight());

        Ext.Ajax.request({
            url:"/geodocs/getinfo/"+ft.feature.data.id,
            method: 'GET',
            scope: this,
            success: function(response){
                var result = response.responseText;
                var r = Ext.decode(result);
                var tpl = new Ext.XTemplate(
                    '<table style="font-size:12px;width:100%;padding-left: 4px;padding-top:4px;">',
                    '<tr>',
                        '<td style="padding-left: 4px;padding-top:4px;float:left;">',
                           '<h2>Segnalazione #{pk} - {data.lat} {data.lon}</h2></p>',
                           '<hr/>',
                           '<p>{data.created} by < {data.user} ></p>',
                           '<p>Indirizzo: {data.address}</p>',
                           '<p>Importanza: {[this.getDegree(values)]}</p>',
                           '<p>Argomento: {data.topic}</p>',
                        '</td><td rowspan=2>',
                            '<img src="{url}" />',
                        '</td>',
                     '</tr><tr>',
                        '<td style="padding-left: 4px;padding-top:4px;">',
                            '<p>Documenti allegati <i>clicca per scaricare</i></p>',
                                '<tpl for="data.docs">',
                                    '<div>{#}. <a href="{.}" target="_blank">Scarica il file</a></div>',
                                '</tpl>',
                         '</td>',
                    '</tr><tr>',
                        '<td colspan=2 style="padding-left: 4px;padding-top:4px;">',
                            '<p>Immagini allegate <i>cliccaci per ingrandire</i></p>',
                            '<tpl for="data.images">',
                            '<div class="imageRow"><div class="single"><a href="{.}" rel="lightbox[wpsinfo{pk}]" /><img style="width: 100px;" src="{.}" /></a></div></div>',
                            '</tpl>',
                        '</td>',
                    '</tr>',
                 '</table>',{
                    getDegree: function(v){
                        var degree = v.data.degree;
                        var r = 'None';
                        if(degree == 1){
                            r = 'Poco importante'
                        }
                        if(degree == 2){
                            r = 'Mediamente importante'
                        }
                        if(degree == 3){
                            r = 'Importante'
                        }
                        if(degree == 4){
                            r = 'Molto importante'
                        }
                        if(degree == 5){
                          r = 'Estremamente importante'
                       }
                       return r;
                   }
                }
                );
                var ct = w.down('container');
                tpl.overwrite(w.body.id,r);
            },
            failure: function(){
                //TODO: mettere un json per far comparire l'errore
            }
        });
    },
    applyFilter: function(btn){
        var checkgrp = btn.prev('fieldcontainer');
        var checkboxs = checkgrp.items.items;
        var filters = new Array()

        //Costruisco le comparazioni interne
        for (var i=0;i < checkboxs.length;i++){
            if(checkboxs[i].value){
                var tmp = new btn.olFilter({
                    type: btn.olFilterOperator,
                    property:  checkboxs[i].name,
                    value:  checkboxs[i].inputValue
                });
                filters.push(tmp);
            }
        }

        //Costruisco il filtro intero da ritornare
        var filter = new btn.olLogical({
            type: btn.olLogicalOperator,
            filters: filters
        })
        Webgis.segnalazioni.layer.filter = filter;
        Webgis.segnalazioni.layer.refresh({force:true});
        this.getBtnrmfiltro().setDisabled(false);
    },
    rmFilter: function(btn){
        Webgis.segnalazioni.layer.filter = null;
        Webgis.segnalazioni.layer.refresh({force:true});
        this.getBtnrmfiltro().setDisabled(true);
    },
    /* * * * * * * * * * * *
     * WMS Area
     *
     */
    connectToWmsServer: function(btn){
        var myMask = new Ext.LoadMask(btn.up('form'), {msg:"Richiesta in corso..."});
        myMask.show();

        var baseurl = btn.prev("textarea").getValue();
        //var url = baseurl.trim() + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities'

        Ext.Ajax.request({
            url: '/webgis/proxy?url='+encodeURIComponent(baseurl.trim()),
            method: 'GET',
            scope: this,
//            params: {
//                SERVICE: "WMS",
//                VERSION: "1.1.1",
//                REQUEST: "GetCapabilities"
//            },
            success: function(response){
                var format = new OpenLayers.Format.WMSCapabilities({
//                    version: "1.1.1"
                });
                layers = format.read(response.responseText);
                this.getFunctionWmsCapabilitiesStore().getmapurl = layers.capability.request.getmap.href;
                this.getFunctionWmsCapabilitiesStore().loadData(layers.capability.layers);
                myMask.destroy();
            },
            failure: function(){
                Ext.Msg.alert('Errore', 'Siamo spiacenti il server indicato ha fornito un documento di "capabilities" che non e\' stato possibile processare.');
                myMask.destroy();
            }
        });
    },
    addLayerToMap: function(){

    }
});