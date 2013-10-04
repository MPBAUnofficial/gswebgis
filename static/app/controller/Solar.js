Ext.define('Webgis.controller.Solar', {
    extend: 'Ext.app.Controller',

	require: [
		'Ext.data.*',
		'Ext.util.*',
		'Ext.view.View',
		'Ext.ux.DataView.Animated',
		'Ext.XTemplate',
		'Ext.panel.Panel',
		'Ext.toolbar.*',
		'Ext.slider.Multi',
		'Webgis.class.Click'
	],

	views: [
		'SolarBtn',
		'SolarInfo'
	],
	
	stores: ['Solar'],
	models: ['Solar'],
	
    init: function() {
		
		this.control({
            '#webgiscenter': {
                afterlayout: {
					fn:this.onPanelRendered,
					scope: this,
					single:true
				}
            },
            'solarbtn':{
				toggle: {
					 fn: this.onClick,
					 scope: this
					}
				}
        });
        
        
    },
    onPanelRendered: function(){
		//Define new OpenLayer Control
		OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
			defaultHandlerOptions: {
				'single': true,
				'double': false,
				'pixelTolerance': 0,
				'stopSingle': false,
				'stopDouble': false
			},
			
			initialize: function(options) {
				this.handlerOptions = OpenLayers.Util.extend(
					{}, this.defaultHandlerOptions
				);
				OpenLayers.Control.prototype.initialize.apply(
					this, arguments
				); 
				this.handler = new OpenLayers.Handler.Click(
					this, {
						'click': this.trigger
					}, this.handlerOptions
				);
			}, 

			trigger: function(e) {
				var lonlat = map.getLonLatFromViewPortPx(e.xy);
				this.scope.getWfsRequest(e);
			}
		});
		//Creo il bottone sulla barra north per richiamare in futuro la griglia
		var wn = Ext.getCmp('webgisnorth');
		wn.add({
			border: false,
			items: [ new Webgis.view.SolarBtn() ]
		})
		
		var map = Webgis.maps[0];
		vectorselezione = new OpenLayers.Layer.Vector("Selezione",{displayInLayerSwitcher:false});
		map.addLayer(vectorselezione);
		
		map.events.register("addlayer",null,function(){
			var map = Webgis.maps[0];
            map.setLayerIndex(vectorselezione,map.layers.length);
			})
		
		Webgis.mapclickcontrol = new OpenLayers.Control.Click({scope: this});
		map.addControl(Webgis.mapclickcontrol);
		
		solarinfo = Ext.create('Webgis.view.SolarInfo');
	},
	onClick: function(btn,status){
		var map = Webgis.maps[0];
		if(status){
			Webgis.mapclickcontrol.activate();
			//Setto correttamente i controlli presenti in mappa
//			var c = Webgis.maps[0].getControlsByClass('OpenLayers.Control.NavToolbar');
//			c[0].controls[1].deactivate(true);
//			c[0].controls[0].activate(true);
		} else {
			Webgis.mapclickcontrol.deactivate();
		}
	},
	getWfsRequest: function(xy){
		if(vectorselezione.features.length > 0){
				vectorselezione.removeAllFeatures();
		}
		if(solarinfo.isVisible){
			solarinfo.setVisible(true);
		}
		var map = Webgis.maps[0];
		var lonlat = map.getLonLatFromViewPortPx(xy.xy);
		
		//console.log(lonlat);
		//console.log(xy);
		
		//solarinfo.setPosition(xy.clientX,xy.clientY,true);
		solarinfo.setLoading(true);
		
		Ext.Ajax.request({
			url:"https://catlas.fbk.eu/geoserver/wfs",
			params: {
				service: 'WFS',
				version: '1.0.0',
				request: 'GetFeature',
				typeName: "cite:casi_point",
				maxFeatures: 50,
				outputFormat: 'json',
				propertyName: "",
				filter: '<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"><Intersects><PropertyName>geom</PropertyName><gml:Point srsName="EPSG:32632"><gml:coordinates>'+lonlat.lon+','+lonlat.lat+'</gml:coordinates></gml:Point></Intersects></Filter>'
			},
			method: 'POST',
			scope: this,
			success: function(response){
				var result = response.responseText;
				var geojson = new OpenLayers.Format.GeoJSON();
				var features = geojson.read(result);
				var r = Ext.decode(result);
				
				if(!r.features[0]){
					var rDecoded = {
						errmsg: "Nessuna incidenza selezionata",
						err: 1
						};

					this.updateBody(rDecoded);
				} else {
					//Elaboro rDecoded
                    console.log(r);
					//Rimuovo le vecchie selezioni
					vectorselezione.addFeatures(features);

					this.updateBody(r);
				}
			},
			failure: function(){
				solarinfo.setLoading(false);
			}
		})
	},
	updateBody: function(data){
		var tpl = new Ext.XTemplate(
		    '<tpl if="err == 1">',
				'<div style="font-size: 16px;padding-left: 4px;padding-top:4px;">{errmsg}</div>',
		    '</tpl>',
//		    '<tpl if="err == 0">',
			'<table style="font-size:12px;">',
		        '<tpl for="features">',
                    '<tr><td style="width:100%;padding-left: 4px;padding-top:4px;">',
                    '<p style="font-size: 16px !important;">ID: <b>{properties.id_incidenza}</b>, paziente nr: {properties.id_paziente}</p>',
                    '<hr />',
                    '<p>Indirizzo: {properties.indirizzo} {properties.civico} </p>',
                    '<p>Sede: <b>{properties.sede}</b> - anno incidenza: <i>{properties.anno_incidenza}</i> </p>',
                    '<p>Eta\': <b>{properties.eta}</p>',
                    '</td></tr>',
		        '</tpl>',
            '</table>'
//			'</tpl>'
		);
		var c = Ext.getCmp('solarinfocenter');
		tpl.overwrite(c.body,data);
		solarinfo.setLoading(false);
	}	
});
