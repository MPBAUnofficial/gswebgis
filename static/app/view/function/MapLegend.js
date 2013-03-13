Ext.define('Webgis.view.function.MapLegend', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.maplegend',

    autoScroll: true,

    bodyStyle: "overflow: auto !important;",

    layout: 'fit',
	border: false,
	
	//Impostazione di base
	//~ imageFormat: "image/gif", //Formato immagine di default nel caso non venga specificata
	//~ map: null, //La mappa dove registrare gli eventi,
	
	/* *
	 * Se falso la maplegend non rimane in ascolto su aggiunta, rimozione, 
	 * cambio del layerStore. Una volta inizializzata non cambia piu'
	 * 
	 */
	dynamic: true,
	
	/* *
	 * Il layer store che contiene i layers da visualizzare nella legenda,
	 * se non viene indicato viene preso dalla mappa inidicata come parametro
	 * 
	 */
	layerStore: [],
	
	/* *
	 * La mappa che si vuole utilizzare, di default quelle presenti in Webgis.maps
	 * 
	 */
	maps: Webgis.maps,
	
	/* * 
	 * Il tipo di immagine che si vuole avere da geoserver (solo nel caso di chiamata WMS getLegendGraphics)	 
	 * Di defautl impostato a image/png
	 */
	imageFormat: 'image/png',
	 
	 /*
	  * Definizione della grandezza dell'icona creata da geoserver
	  * 
	  */
	height: 30,
	width: 30,
	
    initComponent: function() {
		
		var maps = this.maps;
		//Ciclo su tutte le mappe presenti nella configurazione del webgis, o specificate nella configurazione dell'oggetto MapLegend
		for (var idx in this.maps){
			//Aggiungo un elemento all'array layerstore per ogni mappa con i layer che hanno il paramentro displayInLayerSwitcher true
			this.layerStore.push(maps[idx].getLayersBy('displayInLayerSwitcher',true));
			
			//Setto il listeners che aggiorna il panello quando questo appare nell'interfaccia
			this.addListener('render',this.onRenderItem);
			//Setto i listernes per registrare gli eventi sulla mappa (solo se la configurazione dynamic e' true)
			if (this.dynamic){
				maps[idx].events.on({
					'addlayer': this.addLayer,
					'removelayer': this.removeLayer,
					'changelayer': this.update,
					scope: this
				});
			}
		}
        this.callParent(arguments);
    }
    
    ,onRenderItem: function(){
		var dh = Ext.core.DomHelper; //Per creare il div specifico di ogni mappa
		//Ciclo su ogni layerStore presente nella configurazione del MapPanel (cosi posso gestire la legenda per piu di una mappa)
		for (var idy in this.layerStore){
			var ls = this.layerStore[idy];
			//Creo specifiche per creare il div
			var spec = {
				tag:'div',
				html:'Map Legend '+ idy,
				"class": 'x-maplegend-title',
				id: 'x-maplegend-map'+this.maps[idy].mapdjangoid //Trovo l'id univoco della mappa con lo stesso indice utilizzato dal layerstore	
			}
			dh.append(
				this.body.id,
				spec
			);
			
			//Ciclo su ogni layer presente nel layerStore (con configurazione di una sola mappa nel webgis ciclo una unica volta!)
			for (var idz in ls){
				this.addLegend(ls[idz]);
			}
		}
	},
	
    update: function(object){
		var l = object.layer;
		var url = this.getLegendUrl(l);
		var nome_layer = capitaliseFirstLetter(l.name);
		
		//DomHelper per aggiungere il div della legenda di questo layer
		var dh = Ext.core.DomHelper;

		//Creo id univoco;
		var unique_id = l.id + 'mapLegend';
		var spec = {
			tag:'div',
			id: unique_id + 'div',
			children:[{
				tag:'div',
				html:nome_layer	
			}]				
		}
		
		dh.overwrite(
			unique_id,
			spec
		);

		var tpl = dh.createTemplate({tag: 'img',src: '{text}'});
		for(var idxa in url){
			tpl.append(unique_id+'div',url[idxa]);
		}
	},
	addLayer: function(object){
		var l = object.layer;
		var map = object.object;
		if(l.displayInLayerSwitcher){
			var url = this.getLegendUrl(l);
			var nome_layer = capitaliseFirstLetter(l.name);
			
			//DomHelper per aggiungere il div della legenda di questo layer
			var dh = Ext.core.DomHelper;

			//Creo id univoco;
			var unique_id = l.id + 'mapLegend';
			var spec = {
				id: unique_id, 
				tag: 'div',
				"class": 'x-maplegend',
				children:[{
					tag:'div',
					id: unique_id + 'div',
					children:[{
						tag:'div',
						html:nome_layer	
					}]				
				}]
			}
			
			dh.append(
				'x-maplegend-map'+map.mapdjangoid,
				spec
			);

			var tpl = dh.createTemplate({tag: 'img',src: '{text}'});
			for(var idxa in url){
				tpl.append(unique_id+'div',url[idxa]);
			}
		}
	},
	addLegend: function(l){
		var url = this.getLegendUrl(l);
		var nome_layer = capitaliseFirstLetter(l.name);
		
		//DomHelper per aggiungere il div della legenda di questo layer
		var dh = Ext.core.DomHelper;

		//Creo id univoco;
		var unique_id = l.id + 'mapLegend';
		var spec = {
			id: unique_id, 
			tag: 'div',
			"class": 'x-maplegend',
			children:[{
				tag:'div',
				id: unique_id + 'div',
				children:[{
					tag:'div',
					html:nome_layer	
				}]				
			}]
		}
		
		dh.append(
			'x-maplegend-map'+l.map.mapdjangoid,
			spec
		);

		var tpl = dh.createTemplate({tag: 'img',src: '{text}'});
		for(var idxa in url){
			tpl.append(unique_id+'div',url[idxa]);
		}
		
	},
	
	getLegendUrl: function(l) {
        var url = [], style_url, sld;
        var style = l.params.STYLES;
        var layers_name = [l.params.LAYERS].join(',').split(',');

        //Verifico se il layer indica una sorgente per la legenda statico (url all'immagine);
        if (!l.params.style_url) {
            //Check se lo stile del layer non e' quello di default ma e' specificato come SLD
            if (l.params.SLD) {
                sld = l.params.SLD
            } else {
                sld = null
            }

            for (var idz in layers_name) {
                var lurl;
                lurl = l.getFullRequestString({
                    REQUEST:"GetLegendGraphic",
                    WIDTH:this.width,
                    HEIGHT:this.height,
                    EXCEPTIONS:"application/vnd.ogc.se_xml",
                    LAYER:layers_name[idz],
                    LAYERS:null, //sovrascrivo questo paramentro perche specificato solo nella request WMS GetMap
                    STYLE:(style !== '') ? style : null,
                    STYLES:null, //sovrascrivo questo paramentro perche specificato solo nella request WMS GetMap
                    SRS:null, //sovrascrivo questo paramentro perche specificato solo nella request WMS GetMap
                    FORMAT:this.imageFormat,
                    SLD:sld
                });
                url.push({text:lurl});
            }
        } else {
            url.push(style_url);
        }
        return url;
    },
	removeLayer: function(object){
        var l = object.layer;
        if(l.displayInLayerSwitcher){
            var div = Ext.get(object.layer.id + 'mapLegend');
            div.remove();
        }
	}
		
});
