Ext.define('Webgis.view.enviro.MensiliChart', {
    extend: 'Ext.chart.Chart',
    alias : 'widget.mensilichart',

    animate: true,

    legend: {
        position: 'bottom'
    },

    flex: 1,

    axes: [{
        type: 'Numeric',
        minimum: 0,
        position: 'left',
        fields: ['data1', 'data2', 'data3'],
        title: 'Number of Hits',
        minorTickSteps: 1,
        grid: {
            odd: {
                opacity: 1,
                fill: '#ddd',
                stroke: '#bbb',
                'stroke-width': 0.5
            }
        }
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['name'],
        title: 'Month of the Year'
    }],
    series: [{
        type: 'line',
        highlight: {
            size: 7,
            radius: 7
        },
        axis: 'left',
        xField: 'name',
        yField: 'data1',
        markerConfig: {
            type: 'cross',
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }, {
        type: 'line',
        highlight: {
            size: 7,
            radius: 7
        },
        axis: 'left',
        smooth: true,
        xField: 'name',
        yField: 'data2',
        markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }, {
        type: 'line',
        highlight: {
            size: 7,
            radius: 7
        },
        axis: 'left',
        smooth: true,
        fill: true,
        xField: 'name',
        yField: 'data3',
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

