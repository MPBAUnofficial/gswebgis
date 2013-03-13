Ext.define('Webgis.view.enviro.StagionaliChart', {
    extend: 'Ext.chart.Chart',
    alias : 'widget.stagionalichart',
	
	animate: true,
	
	legend: {
		position: 'bottom'
	},
	
    flex: 1,

    shadow: false,


    series: [{
        type: 'column',
        axis: 'left',
        xField: 'id',
        yField: ['s1', 's2','s3','s4','s5'],
        title: ["Autumn","Winter","Spring","Summer","Autumn"],
        tips: {
          trackMouse: true,
          width: 140,
          height: 28,
          renderer: function(storeItem, item) {
              this.setTitle("g"+item.value[0] + ": "+item.value[1]);
          }
        }
    }],
	
    initComponent: function() {

        this.axes = [{
            type: 'Category',
            position: 'bottom',
            fields: ['id'],
            grid: true,
            title: 'Generations'
        },{
            type: 'Numeric',
            position: 'left',
            fields: ['s1', 's2','s3','s4','s5'],
            grid: true,
            title: this.axesTitle
        }],

        this.callParent(arguments);
    }
});
