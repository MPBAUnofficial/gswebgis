/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/14/13
 * Time: 10:25 AM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with PyCharm.
 * User: shamar
 * Date: 09/10/12
 * Time: 10.00
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.controller.catlas.GtCatalogIndicators', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: "fnpanel",
            selector: "#webgiswestfn"
        },
        {
            ref: "sedehiddenfield",
            selector: "gt_tumor_site > textfield"
        },
        {
            ref: "sededisplayfield",
            selector: "gt_tumor_site > displayfield"
        },{
            ref: 'gtsubpanelindicator',
            selector: '#gtsubpanelindicator '
        }
    ],
    requires: [
        'Ext.ux.grid.column.ActionButtonColumn',
        'Webgis.view.catlas.GtMainPanelIndicator',
        'Webgis.view.catlas.GtTreePanelIndicator',
        'Webgis.view.catlas.GtWhereClauseIndicator',
        'Webgis.view.catlas.GtCachePanelIndicator',
        'Webgis.view.catlas.gtclause.AnnoRt',
        'Webgis.view.catlas.gtclause.Sesso',
        'Webgis.view.catlas.gtclause.ClassiEta',
        'Webgis.view.catlas.gtclause.Sede',
        'Webgis.view.catlas.gtclause.Ambito',
        'Webgis.view.catlas.gtclause.PopolazioneStd',
        'Webgis.types.JsonObject',
        'Webgis.types.Array',
        'Ext.form.field.ComboBox'
    ],

    stores: [
        'catlas.GtIndicators',
        'catlas.GtCachedLayer'
    ],

    init: function() {

        this.control({
            '#webgiswestfn': {
                afterlayout: {
                    fn:this.onPanelRendered,
                    scope: this,
                    single:true
                }
            },
            'gt_tumor_site > grid': {
                selectionchange: {
                    fn: this.updateSedeSelection
                }
            },
            'gtwhereclauseindicator button[type="undu"]': {
                click: {
                    fn: this.viewGtTreePanelIndicator
                }
            },
            'gtwhereclauseindicator button[type="submit"]': {
                click: {
                    fn: this.runIndicator
                }
            },
            'gttreepanelindicator > grid actioncolumn': {
                click: {
                    fn: this.createGtWhereClauseIndicator,
                    scope: this
                }
            }
        });

    },
    onPanelRendered: function(){
        var fn = this.getFnpanel();
        fn.addNewComponent({
            classe: 'Webgis.view.catlas.GtMainPanelIndicator',
            name_btn: 'Indicatori',
            options_btn:{
                pressed: false
            },
            options_obj: {
                store: this.getCatlasGtIndicatorsStore(),
                cacheStore: this.getCatlasGtCachedLayerStore(),
                controllerScope: this,
                border: false
            }
        });
    },
    updateSedeSelection: function(sm,rec,index){
        var hidden = this.getSedehiddenfield();
        var display = this.getSededisplayfield();
        var idc = new Array();
        var label = new Array();

        Ext.Array.each(rec,function(item,idex,allItems){
            idc.push(item.get("id"));
            label.push(item.get("name"));
        }, this);

        hidden.setValue(idc.join(','));
        display.update("Hai selezionato: "+label.join(','));
    },
    createGtWhereClauseIndicator: function(view,cell,row,col,e){
        var rec = view.getStore().getAt(row);
        var sp = this.getGtsubpanelindicator();

        var whereClauseItems = new Array();

        Ext.Array.each(rec.get('widgets').raw, function(w,idx,allItems){
            var xtype = "gt_"+ w.type;
            var baseName = w.name;
            var suffixes = w.suffixes ? w.suffixes : "out";
            var values = w.values ? w.values : {};

            whereClauseItems.push({
                xtype: xtype,
                baseName: baseName,
                suffixes: suffixes,
                values: values
            })
        });

        var whereClausePanel = Ext.widget('gtwhereclauseindicator',{
            indicatorId: rec.get('id'),
            indicatorName: rec.get('name'),
            items: whereClauseItems
        });

        sp.add(whereClausePanel);

        sp.getLayout().setActiveItem(whereClausePanel);
    },
    viewGtTreePanelIndicator: function(btn){
        var sp = this.getGtsubpanelindicator();
        var activeItem = sp.getLayout().getActiveItem();

        sp.getLayout().setActiveItem(0);
        activeItem.destroy();
    },
    runIndicator: function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
//            var f = this.up("form");
            var indicatorId = btn.up("form").indicatorId;
            var indicatorName = btn.up("form").indicatorName;

            var p = btn.up("form").body;
            p.mask("Operazione in corso...");

            form.submit({
                url: '/api/indicator/run/' + indicatorId + "/",
                scope: this,
                // 5 minutes
                timeout: 5 * 60 * 1000,
//                waitMsg: 'Elaborazione dati in corso...',
                success: function (fp, o) {
                    p.unmask();
                    var rec = this.addLayerToCache(o.result.data);
                    this.addLayerToMap(rec);
                },
                failure: function (fp, o) {
                    Ext.Msg.alert('Errore', 'Siamo spiacenti ma in seguito ad un errore imprevisto non e\' stato possibile eseguire la Sua richiesta');
                    p.unmask();
                }
            });

        }
    },
    addLayerToCache: function(data){
        var st = this.getCatlasGtCachedLayerStore();
        var rec = Ext.create('Webgis.model.catlas.GtCachedLayer',data);
        st.insert(st.getCount(),rec);
        return rec;
    },
    addLayerToMap: function(rec){
        var map = Webgis.maps[0];

        //Var locale con il label e il codice del layer
        var layer_name = rec.get("gs_workspace") + ':' + rec.get("gs_layer");
        var layer_hash = rec.get("hash");
        var layer_url = rec.get("gs_url");
        var quantile = rec.get("quantile");
        var indicator_desc = rec.get("gs_layer_name");


        //Setting dei parametri per il WMS GetMap
        var p = {
            format: 'image/png',
            transparent: true,
            layers: layer_name,
            viewparams: 'hash:'+layer_hash,
            env: 'b1:' + quantile[0] + ";b2:" + quantile[1]  + ";b3:" + quantile[2] + ";b4:" + quantile[3],
            EXCEPTIONS: "application/vnd.ogc.se_inimage"
        }
        //Aggiungo il parametro per il TIME (corretamente a seconda di vector/raster)

        // Preparo i valori per ottenere la legenda corretta
        var qString = new Array(
            '0',
            '0 -' + quantile[0] + '',
            quantile[0] + " - " + quantile[1],
            quantile[1] + " - " + quantile[2],
            quantile[2] + " - " + quantile[3]
        );
        var cString = new Array(
            "#ffffff",
            "#bae4bc",
            "#7bccc4",
            "#43a2ca",
            "#0868ac"
        );

        // Giro i valori per R
        qString = qString.reverse();
        cString = cString.reverse();

        // Aggiungo apici e codifico... Strettamente richiesto x inviare un url corretto e passare i valori a R
        qString = Ext.Array.map(qString,function(el){
            return encodeURIComponent('"' + el + '"')
        });
        cString = Ext.Array.map(cString,function(el){
            return encodeURIComponent('"' + el + '"')
        });



        var o = {
            isBaseLayer: false,
            displayInLayerSwitcher: true,
            visibility: true,
            isIndicator: true,
            projection: map.projection,
            legendURL: '/plr/legend/250/250/'+cString.join(',')+'/'+qString.join(','),
            opacity: 1
            //~ buffer: layer.fields.buffer,
            //~ tileSize: new OpenLayers.Size(layer.fields.tile_size,layer.fields.tile_size)
        }
        //Creo oggetto layer
        var l = new OpenLayers.Layer.WMS(indicator_desc,
            layer_url,
            p,
            o
        );

        //Aggiungo l'oggetto layer alla corrispettiva mappa
        map.addLayer(l);

    },
    downloadShpFile: function(rec){
        //estraggo dal record i dati che mi servono
        var layer_name = rec.get("gs_workspace") + ':' + rec.get("gs_layer");
        var layer_hash = rec.get("hash");

        //set url e query string per aprire il popup
        var layer_url = rec.get("gs_url");
        var query_str = Ext.Object.toQueryString({
            "service" : 'WFS',
            "version" : '1.0.0',
            "VIEWPARAMS" : 'hash:' + layer_hash,
            "request" : 'GetFeature',
            "typeName" : layer_name,
            "maxFeatures" : 250,
            "outputFormat" : 'SHAPE-ZIP'
        });

        //Apro il popup
        var url = Ext.String.format('{0}{1}',layer_url,query_str);
        window.open(url);
    },
    downloadCsv: function(rec){
        //estraggo dal record i dati che mi servono
        var layer_name = rec.get("gs_workspace") + ':' + rec.get("gs_layer");
        var layer_hash = rec.get("hash");

        //set url e query string per aprire il popup
        var layer_url = rec.get("gs_url");
        var query_str = Ext.Object.toQueryString({
            "service" : 'WFS',
            "version" : '1.0.0',
            "VIEWPARAMS" : 'hash:' + layer_hash,
            "request" : 'GetFeature',
            "typeName" : layer_name,
            "maxFeatures" : 250,
            "outputFormat" : 'csv'
        });

        //Apro il popup
        var url = Ext.String.format('{0}{1}',layer_url,query_str);
        window.open(url);
    }
});