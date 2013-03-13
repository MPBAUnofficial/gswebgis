Ext.define('Webgis.view.enviro.WinklerChart', {
    extend: 'Ext.chart.Chart',
    alias : 'widget.winklerchart',
	
	animate: true,
	
	legend: {
		position: 'bottom'
	},

    flex: 1,

//    mask: 'horizontal',
//        listeners: {
//            select: {
//                fn: function(me, selection) {
//                    me.setZoom(selection);
//                    me.mask.hide();
//                }
//            }
//        },

    axes: [{
        type: 'Category',
        position: 'bottom',
        fields: ['id'],
        grid: true,
        title: 'Generations'
    },{
        type: 'Numeric',
        position: 'left',
        fields: ['winkler1', 'winkler2'],
        minimum: 0,
        grid: true,
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        grid: true,
        title: 'Winkler index'
    }],
    series: [{
        type: 'column',
        axis: 'left',
        xField: 'id',
        yField: ['winkler1', 'winkler2'],
        title: ["First year","Second year"],
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

        this.callParent(arguments);
    }
});
