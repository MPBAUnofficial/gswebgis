Ext.define('Webgis.view.enviro.EnviGridItem', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.envigriditem',

	frame: true,
	border: true,

	//~ layout: 'fit',
	
	cls: 'x-envigrid-fit-td',
	
	bodyCls: 'x-envigrid-fit-td-itembg',
	tagcloudid: null,
	
	listeners: {
		afterrender: function(){
			var id = "#" + this.tagcloudid + " a";
			//SET WIDTH & HEIGHT ACCORDING TO THE DIV DIMENSION
			var w = Ext.getBody().getWidth();
			var h = Ext.getBody().getHeight();
			var start, end;
			var area = w*h;
			
			if (area > 1900000){
				start = 16;
			    end = 24;
			} else if(area > 1000000) {
				start = 12;
				end = 16;
			} else {
				start = 8;
				end = 10;
			}

			$(id).tagcloud({ size: {start: start, end: end, unit: "px"}, color: {start: '#00CCFF', end: '#3300FF'} });
			
			//Ciclo per tutti gli ambito climatici per creare i bottoni
			var ambito_climatico = this.ambito_climatico
			for (var idx in ambito_climatico){
				Ext.create('Webgis.view.enviro.EnviGridButton',{
					renderTo: this.tagcloudid + '-btn',
					ambito_climatico: ambito_climatico[idx],
					ambito_spaziale: this.ambito_spaziale,
					ambito_temporale: this.ambito_temporale
				})
			}
		
		}
	},
	
    initComponent: function() {
		
		//Template per visualizzare le informazioni introduttive
        this.tpl = new Ext.XTemplate(
			'<div id="{id}-btn" class="x-envigrid-item-btn"></div>',
			'<div id="{id}" class="x-envigrid-item-cloud">',
				'<a rel="16">Tgrd mean</a>',
                '<a rel="10">Tgrd max</a>',
				'<a rel="3">Phenology Chardonnay</a>',
				'<a rel="6">Phenology</a>',
				'<a rel="6">Lobesia</a>',
                '<a rel="10">Tgrd min</a>',
                '<a rel="10">Tgrd min</a>',
				'<a rel="3">Oidio</a>',
			'</div>'
        );
        
        //Metodo utilizzato per aggiornare l'area
		this.tplWriteMode = 'overwrite';
		
		//Associo al template i dati presenti nella configurazione del Webgis
		var tagcloudid = Ext.id('','cloud');
		this.data = {
			id: tagcloudid
		};
		this.tagcloudid = tagcloudid;
		
        this.callParent(arguments);
    }
});

