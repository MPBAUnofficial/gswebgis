Ext.define('Webgis.controller.Interface', {
    extend: 'Ext.app.Controller',

	views: [
		'BaseInterface'
	],

    init: function() {
        this.control({
            'viewport > panel': {
                render: this.onPanelRendered
            },
            '#webgiscenter':{
					afterlayout: {fn:this.panMapToCenter,
					single: true}
			}
        });
    },
    onPanelRendered: function() {
		starter.applyText('Loading interface...');
    },
    //@DEPRECATED
    containerMapsRender:function(container) {
        starter.applyText('Rendering maps container...');

		
		//Faccio il render di ogni mappa nel rispettivo div
		var maps = Webgis.maps
		for (idx in maps){
			maps[idx].render('mappa-'+idx);
			maps[idx].zoomToMaxExtent();
			//Set del numero di zoom
            console.log(maps[idx].mapdjangozoom);
			if(maps[idx].mapdjangozoom){
                console.log('a')
				maps[idx].zoomTo(maps[idx].mapdjangoxy,maps[idx].mapdjangozoom);
			}
		}
		container.addListener('afterlayout',
			this.panMapToCenter
		);
	},
	panMapToCenter: function(){
		//Quando l'interfaccia registra un evento 'resize' sposta la mappa per far vedere nuovamente il centro.
		var maps = Webgis.maps
		for (idx in maps){
            if(maps[idx].mapdjangozoom){
                maps[idx].setCenter(maps[idx].mapdjangoxy,maps[idx].mapdjangozoom);
            }
		}
	}
});
