Ext.define('Webgis.view.enviro.VectorChart', {
    extend: 'Ext.chart.Chart',
    alias : 'widget.vectorchart',
	
	animate: true,
	
	width: '400',
	height: '300',
            axes: [{
                type: 'Category',
                position: 'bottom',
                fields: ['id'],
                                grid: true,
                title: 'Month of the Year'
            },{
                type: 'Numeric',
                position: 'left',
                fields: ['s1', 's2','s3','s4','s5'],
                //minimum: 0,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                grid: true,
                title: 'Number of Hits'
            }],
            series: [{
                type: 'column',
                axis: 'left',
                xField: 'id',
                yField: ['s1', 's2','s3','s4','s5']
            }],
	
    initComponent: function() {

        this.callParent(arguments);
    }
});
