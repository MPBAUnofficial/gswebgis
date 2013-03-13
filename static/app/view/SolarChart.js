Ext.define('Webgis.view.SolarChart', {
    extend: 'Ext.chart.Chart',
    alias : 'widget.solarchart',
	
	animate: true,
	
	legend: {
		position: 'bottom'
	},
	
	axes: [{
		type: 'Category',
		position: 'bottom',
		fields: ['month'],
		grid: true
	},{
		type: 'Numeric',
		position: 'left',
		fields: ['ir', 'df','gl','gl_avg'],
		minimum: 0,
		maximum: 3200,
		grid: true,
		label: {
			renderer: Ext.util.Format.numberRenderer('0,0')
		},
		title: 'solar radiance (Wh/m2)'
	}],
	series: [{
		type: 'line',
		highlight: {
			size: 7,
			radius: 7
		},
		axis: 'left',
		smooth: false,
		fill: false,
		xField: 'id',
		yField: 'ir',
		title: 'Direct',
		tips: {
			trackMouse: true,
			width: 50,
			renderer: function(storeItem, item) {
				this.setTitle("Direct: "+storeItem.get('ir'));
			}
		},
		markerConfig: {
			type: 'circle',
			size: 4,
			radius: 4,
			'stroke-width': 0
		}
	},{
		type: 'line',
		highlight: {
			size: 7,
			radius: 7
		},
		axis: 'left',
		smooth: false,
		fill: false,
		xField: 'id',
		yField: 'df',
		title: 'Diffuse',
		tips: {
			trackMouse: true,
			width: 50,
			renderer: function(storeItem, item) {
				this.setTitle("Diffuse: "+storeItem.get('df'));
			}
		},
		markerConfig: {
			type: 'circle',
			size: 4,
			radius: 4,
			'stroke-width': 0
		}
	},{
		type: 'line',
		highlight: {
			size: 7,
			radius: 7
		},
		axis: 'left',
		smooth: false,
		fill: false,
		xField: 'id',
		yField: 'gl',
		title: 'Global',
		tips: {
			trackMouse: true,
			width: 50,
			renderer: function(storeItem, item) {
				this.setTitle("Global: " + storeItem.get('gl'));
			}
		},
		markerConfig: {
			type: 'circle',
			size: 4,
			radius: 4,
			'stroke-width': 0
		}
	}],
	
    initComponent: function() {
		
        this.callParent(arguments);
    }
});
