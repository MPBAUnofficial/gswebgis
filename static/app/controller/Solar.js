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
		
		var starter = new Ext.create('Webgis.class.ChangeStarterStatus',
		{
			text: 'Load envigrid...'
		});
	},
	onClick: function(btn,status){
		var map = Webgis.maps[0];
		if(status){
			Webgis.mapclickcontrol.activate();
			//Setto correttamente i controlli presenti in mappa
			var c = Webgis.maps[0].getControlsByClass('OpenLayers.Control.NavToolbar');
			c[0].controls[1].deactivate(true);
			c[0].controls[0].activate(true);
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
//			url:"http://enviro.fbk.eu/geoserver/land/wfs",
			url:"/geoserver/wfs",
			params: {
				service: 'WFS',
				version: '1.0.0',
				request: 'GetFeature',
				typeName: "solarweb:roof_radiance",
				maxFeatures: 1,
				outputFormat: 'json',
				propertyName: "",
				filter: '<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"><Intersects><PropertyName>the_geom</PropertyName><gml:Point srsName="EPSG:32632"><gml:coordinates>'+lonlat.lon+','+lonlat.lat+'</gml:coordinates></gml:Point></Intersects></Filter>'
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
						errmsg: "No building selected... try again.",
						err: 1
						};
					cdata = [
						["Jan",0,0,0,0],
						["Feb",0,0,0,0],
						["Mar",0,0,0,0],
						["Apr",0,0,0,0],
						["May",0,0,0,0],
						["Jun",0,0,0,0],
						["Jul",0,0,0,0],
						["Aug",0,0,0,0],
						["Sep",0,0,0,0],
						["Oct",0,0,0,0],
						["Nov",0,0,0,0],
						["Dec",0,0,0,0]
					]
					this.updateBody(rDecoded,cdata);
				} else {
					//Elaboro rDecoded
					rDecoded = r.features[0].properties;
					rDecoded.fid = r.features[0].id;
					rDecoded.bbox = r.bbox.join(",");
					rDecoded.err = 0; 
					
					//Elaboro altezza e larghezza della immagine da chiedere a geoserver
					rDecoded.width = Math.round(new OpenLayers.Bounds(r.bbox[0],r.bbox[1],r.bbox[2],r.bbox[3]).getWidth()+5);
					rDecoded.height = Math.round(new OpenLayers.Bounds(r.bbox[0],r.bbox[1],r.bbox[2],r.bbox[3]).getHeight()+5);
					if(rDecoded.height >= 145){
						rDecoded.width = Math.round((145*rDecoded.width)/rDecoded.height);
						rDecoded.height = 145;
						
						//console.info((rDecoded.width/rDecoded.height)*140);
						//console.info((150*rDecoded.height)/rDecoded.width);
					}
					rDecoded.AREA1P = Ext.util.Format.round((rDecoded.AREA1 / rDecoded.AREA) * 100,2);
					rDecoded.AREA2P = Ext.util.Format.round((rDecoded.AREA2 / rDecoded.AREA) * 100,2);
					rDecoded.AREA3P = Ext.util.Format.round((rDecoded.AREA3 / rDecoded.AREA) * 100,2);
					//Rimuovo le vecchie selezioni
					vectorselezione.addFeatures(features);
					
					//Elaboro i dati per i grafici
					cdata = [
						["Jan",rDecoded.IR_01,rDecoded.DF_01,rDecoded.GL_01,rDecoded.GL_AVG_123],
						["Feb",rDecoded.IR_02,rDecoded.DF_02,rDecoded.GL_02,rDecoded.GL_AVG_123],
						["Mar",rDecoded.IR_03,rDecoded.DF_03,rDecoded.GL_03,rDecoded.GL_AVG_123],
						["Apr",rDecoded.IR_04,rDecoded.DF_04,rDecoded.GL_04,rDecoded.GL_AVG_123],
						["May",rDecoded.IR_05,rDecoded.DF_05,rDecoded.GL_05,rDecoded.GL_AVG_123],
						["Jun",rDecoded.IR_06,rDecoded.DF_06,rDecoded.GL_06,rDecoded.GL_AVG_123],
						["Jul",rDecoded.IR_07,rDecoded.DF_07,rDecoded.GL_07,rDecoded.GL_AVG_123],
						["Aug",rDecoded.IR_08,rDecoded.DF_08,rDecoded.GL_08,rDecoded.GL_AVG_123],
						["Sep",rDecoded.IR_09,rDecoded.DF_09,rDecoded.GL_09,rDecoded.GL_AVG_123],
						["Oct",rDecoded.IR_10,rDecoded.DF_10,rDecoded.GL_10,rDecoded.GL_AVG_123],
						["Nov",rDecoded.IR_11,rDecoded.DF_11,rDecoded.GL_11,rDecoded.GL_AVG_123],
						["Dec",rDecoded.IR_12,rDecoded.DF_12,rDecoded.GL_12,rDecoded.GL_AVG_123]
					]		
					this.updateBody(rDecoded,cdata);
				}
			},
			failure: function(){
				solarinfo.setLoading(false);
			}
		})
	},
	updateBody: function(data,cdata){
		var tpl = new Ext.XTemplate(
		    '<tpl if="err == 1">',
				'<div style="font-size: 16px;padding-left: 4px;padding-top:4px;">{errmsg}</div>',
		    '</tpl>',
		    '<tpl if="err == 0">',
			'<table style="font-size:12px;"><tr><td style="width:290px;padding-left: 4px;padding-top:4px;">',
				'<p><b>ID:{ID_EDIFICI}</b></p>',
				'<p>Total roof area: {AREA}</p>',
				'<p>Very well suitable (class 1): {AREA1}m2 - <i>{AREA1P}%</i></p>',
				'<p>Well suitable (class 2): {AREA2}m2 - <i>{AREA2P}%</i></p>',
				'<p>Suitable (class 3): {AREA3}m2 - <i>{AREA3P}%</i></p>',
				'<p>Direct radiation avarage (IR):{IR_AVG} (Wh/m2)</p>',
				'<p>Diffuse radiation avarage (DF):{DF_AVG} (Wh/m2)</p>',
				'<p>Global radiation avarage (GL):{GL_AVG} (Wh/m2)</p>',
				'<p>KWH/YEAR:<b>{KWH_YEAR}</b></p>',
			'</td><td style="width:290;text-align:center;">',
				'<img alt="" style="vertical-align: center;" src="http://solarwebgis.fbk.eu/geoserver/land/wms?featureid={fid}&STYLES=&LAYERS=solarweb%3Aroof_radiance&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG%3A32632&BBOX={bbox}&WIDTH={width}&HEIGHT={height}">',
			'</td></tr></table>',
			'</tpl>'
		);
		var c = Ext.getCmp('solarinfocenter');
		tpl.overwrite(c.body,data);
		solarinfo.stdata.loadData(cdata);
		solarinfo.setLoading(false);
	}	
});
