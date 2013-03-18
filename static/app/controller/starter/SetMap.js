Ext.define('Webgis.controller.starter.SetMap', {
    extend: 'Ext.app.Controller',

    init: function() {

        starter.applyText('Add maps to container...');

		this.setMap();
		
		starter.applyText('Loading base layers...');
		
		this.setBaseLayerToMap()
    },
	setBaseLayerToMap: function(){
		//Ciclo su tutte le mappe presenti nel webgis
		Ext.Array.each(Webgis.maps,function(map,index,mapsItSelf){
			//E per ogni mappa, vado a configurare i relativi base layer
			for (var idx in map.mapdjangobaselayer){
				var layer = map.mapdjangobaselayer[idx]; //Per semplicita inizializzo la variabile layer
				var larray = layer.fields.layer_name.split(',');
				//Elaboro nome del layer (la confiugrazione WMS permette infatti di unire piu di un layer in una chiamata unica!)
				if(layer.fields.geoserver_workspace != ''){
					//Split della stringa con carattere ',' in modo da avere un array di nomi
					for (var idy in larray){
						larray[idy] = layer.fields.geoserver_workspace + ':' +larray[idy];
					}
				}
				//Setting dei parametri per il WMS GetMap 
//				var params = {
//					styles: layer.fields.styles,
//					layers: larray.join(','),
//					format: layer.fields.format,
//					//srs: item.srs is null ? map.projection : 'EPSG:' + item.srs,
//					transparent: layer.fields.transparent,
//                    tiled: true,
//                    tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
//				}
//
//				//Setting per l'oggetto OpenLayers.Layers
//				var options = {
//					isBaseLayer: layer.fields.is_base_layer,
//					style_url: layer.fields.style_url,
//					displayInLayerSwitcher: layer.fields.display_in_layer_switcher,
//					visibility: layer.fields.visibility,
//					projection: layer.fields.srs === null ? map.projection : 'EPSG:' + layer.fields.srs,
//					transitionEffect: layer.fields.transition_effect == '' ? null : layer.fields.transition_effect,
//					buffer: layer.fields.buffer,
//					opacity: 1,
//					tileSize: new OpenLayers.Size(layer.fields.tile_size,layer.fields.tile_size)
//				}
//				//Creo oggetto layer
////				var l = new OpenLayers.Layer.WMS(layer.fields.layer_label,
////					layer.fields.geoserver_url,
////					params,
////					options
////				);
                var l = new OpenLayers.Layer.WMS(
                    larray.join(','), layer.fields.geoserver_url,
                    {layers: larray.join(','), format: 'image/png' },
                    { tileSize: new OpenLayers.Size(256, 256), displayInLayerSwitcher: layer.fields.display_in_layer_switcher}
                );

				//Aggiungo l'oggetto layer alla corrispettiva mappa
				map.addLayer(l);
			}
		});
	},
    setMap: function(){
		//Leggo tutte le mappe presenti nel Webgis.config.maps e creo gli oggetti OpenLayers
		Webgis.maps = [];
        var tpl = new Ext.Template("<p><a target=\"_blank\" href=\"http://spatialreference.org/ref/epsg/{0}/\">EPSG:{0}</a> coordinates:");
        // pink tile avoidance
        OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;

		Ext.Array.each(Webgis.config.maps,function(item,index,mapsItSelf){
			var properties = {
                units: 'm',
                projection: new OpenLayers.Projection('EPSG:32632'),
				maxExtent: new OpenLayers.Bounds(item.fields.max_extent.fields.left,item.fields.max_extent.fields.bottom,item.fields.max_extent.fields.right,item.fields.max_extent.fields.top),
//				units: item.fields.units,
                maxResolution: item.fields.max_resolution,
    			numZoomLevels: item.fields.num_zoomlevel,
				mapdjangoid: item.pk,
				mapdjangozoom: item.fields.center_level_zoom,
                mapdjangoxy: [item.fields.center_y,item.fields.center_x],
				mapdjangobaselayer: item.extras.mapbaselayer_set,
				controls: [
					new OpenLayers.Control.TouchNavigation({
						dragPanOptions: {
							enableKinetic: true
						}
					}),
                    new OpenLayers.Control.Navigation(),
                    new OpenLayers.Control.ScaleLine(),
                    new OpenLayers.Control.Scale(),
                    new OpenLayers.Control.MousePosition({
                        prefix: tpl.apply([item.fields.projection]),
                        suffix: "</p>"
                    })
				]
			}
			
			var m = new OpenLayers.Map(properties);
			Webgis.maps.push(m);
		});
	}
});
