Ext.define('Webgis.controller.Catalog', {
    extend: 'Ext.app.Controller',

	views: [
		'CatalogPanel',
		'catalog.Button',
		'catalog.DataView'
	],
	
	stores: ['CatalogStore'],
	models: ['CatalogModel'],
	
    init: function() {

		
		//INIT DEI CONTROLLI
		this.control({
            'catalogdataview':{
				itemclick: this.addLayerToMap,
				scope:this
			},
            '#webgiscenter': {
                afterlayout: {
                    fn:this.onPanelRendered,
                    scope: this,
                    single:true
                }
            }
        });
		
    },
    onPanelRendered: function(){
        //inizializzo gli store per i due cataloghi
        var baseSt = new Webgis.store.CatalogStore();
        var datiSt = new Webgis.store.CatalogStore();

        //Load dei dati presenti nella configurazione del Webgis
        baseSt.loadData(Webgis.config.catalogs.base);
        datiSt.loadData(Webgis.config.catalogs.dati);

        //Inizializzo il panello del Catalogo
        var catalogPanel = new Webgis.view.CatalogPanel();

        catalogPanel.add({
            xtype: 'catalogbutton',
            text: 'Base',
            iconCls: 'x-catalogpanel-base',
            catalogview: {
                xtype: 'catalogdataview',
                store: baseSt
            }
        },{
            xtype: 'catalogbutton',
            text: 'Data',
            iconCls: 'x-catalogpanel-data',
            catalogview: {
                xtype: 'catalogdataview',
                store: datiSt
            }
        });
    },
    addLayerToMap: function(view,record,el){
		//CHIUDO IL MENU
		if(el.id){
			Ext.get(el.id).frame("#DFE9F6");
		}
		view.up('menu').hide();
		
		var map = Webgis.maps[0];
		
		//Var locale con il label e il codice del layer
		var layer_label = record.data.text;
		var layer_workspace = record.data.geoserver_workspace;
		var layer_codice = record.data.name_layer;
		var layer_url = record.data.geoserver_url;
		
		//Var locale con lo stile
		var style = record.data.style;
		
		//Creo il nome vero del layer (workspace + codice)
		var layer_name = this.getQueryLayer(layer_workspace,layer_codice);
		
		//Setting dei parametri per il WMS GetMap 
		var params = {
			styles: style,
			layers:  layer_name,
			format: 'image/png',
			transparent: true
		}

		//Setting per l'oggetto OpenLayers.Layers
		var options = {
			isBaseLayer: false,
			style_url: null,
			displayInLayerSwitcher: true,
			visibility: true,
			projection: map.projection,
			singleTile: true,
			opacity: 1
			//~ buffer: layer.fields.buffer,
			//~ tileSize: new OpenLayers.Size(layer.fields.tile_size,layer.fields.tile_size)
		}
		//Creo oggetto layer
		var l = new OpenLayers.Layer.WMS(layer_label,
			layer_url,
			params,
			options
		);
		
		//Aggiungo l'oggetto layer alla corrispettiva mappa
		map.addLayer(l);
	},
	getQueryLayer: function(layer_workspace,layer_name){
		//Se il workspace non e' nullo lo imposto nel nome del layer da chiamare
		if(layer_workspace!=''){
			var res = [layer_workspace, layer_name].join(":");
		} else {
			var res = layer_name;
		}
		return res;
	}
});
