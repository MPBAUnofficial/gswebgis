Ext.define('Webgis.controller.Webgl3d', {
    extend: 'Ext.app.Controller',

	require: [],

	views: [
		'Webgl3dBtn',
		'Webgl3dCanvas'
	],
	
	stores: [],
	models: [],
	
    init: function() {
		
		this.control({
            '#webgiscenter': {
                afterlayout: {
					fn:this.onPanelRendered,
					scope: this,
					single:true
				}
            },
            'webgl3dbtn':{
				toggle: {
					 fn: this.onClick,
					 scope: this
					}
				}
        });
        
        
    },
    onPanelRendered: function(){
		
		//Creo il bottone sulla barra north per richiamare in futuro la griglia
		var wn = Ext.getCmp('webgisnorth');
		wn.add({
			border: false,
			items: [ new Webgis.view.Webgl3dBtn() ]
		})
		
		Webgis.webgl3dcanvas = Ext.create('Webgis.view.Webgl3dCanvas');
		
		var starter = new Ext.create('Webgis.class.ChangeStarterStatus',
		{
			text: 'Load 3d modules...'
		});
	},
	onClick: function(btn,status){
		var map = Webgis.maps[0];
		//var bbox = map.getExtent().toArray();
		//var wh = map.getSize();
		//wh.h = wh.w;
		var bbox = [ 663539.19641116, 5103042.9833959, 664685.19250491, 5104188.9794897 ];
		var width = 800;
		wh = {
			h:width ,
			w:width 
			}
		if(status){
			Webgis.webgl3dcanvas.show();
			this.load3dCanvas();
			Ext.Function.defer(this.prepareGeoserver, 20, this, [bbox,wh]);
			//setTimeout(this.prepareGeoserver, 2, bbox, wh);
		} else {
			Webgis.webgl3dcanvas.hide();

		}
	},
	load3dCanvas: function(){
		wt = new CanvasManager("wt3d_canvas", "overlay");
		wt.dtmManager.setColorMode('ortho');
		wt.setUserControlsEnabled(true);
	},
	prepareGeoserver: function(bbox,wh){
		rgs = new GeoServer(
				"http://ietpat.fbk.eu/geoserver/",
				"worldclim:ofc_tiles,mpba:roof_classes", "EPSG:32632");
		lgs = new GeoServer(
				"http://ietpat.fbk.eu/geoserver/",
				"mpba:dsm1x1m", "EPSG:32632");

		var bbox = [663539.19641116, 5103042.9833959, 664685.19250491, 5104188.9794897];
		var width = 800;
		
		Ext.Function.defer(this.loadDTM, 20, this, [bbox,width]);
		
		//setTimeout(this.loadDTM, 2, bbox, wh);	
	},
	loadDTM: function(bbox, width){
		var height = width;
		
		var tmp = function(hmap) {
			
			var bbox = [ 663539.19641116, 5103042.9833959, 664685.19250491, 5104188.9794897];
			var width = 800;
		
			var height = width;
			try {
				var cmap = rgs.getColorMapAddress(bbox, width, height);

				var img = new Image();
				img.onload = function() {
					wt.drawTerrain(hmap, img, rgs.getSampleSize(bbox, width) * 1.3);
				}
				img.src = cmap;

			} catch (e) {
				alert(e);
			}
		}
		
		try {
			var hmap = lgs.getHeightMap(bbox, width, height, tmp);
		} catch (e) {
			alert(e);
		}
	}
});
