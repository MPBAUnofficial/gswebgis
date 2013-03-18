/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/14/13
 * Time: 11:17 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.controller.function.LegendPanelAlwaysVisible', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: "webgiseast",
            selector: "#webgiseast"
        }
    ],
    requires: [
        'GeoExt.panel.Map',
        'GeoExt.container.WmsLegend',
        'GeoExt.container.UrlLegend',
        'GeoExt.container.VectorLegend',
        'GeoExt.panel.Legend'
    ],

    init: function() {

        this.control({
            '#webgiscenter': {
                afterlayout: {
                    fn:this.onPanelRendered,
                    scope: this,
                    single:true
                }
            }
        });

    },
    onPanelRendered: function(){
        var p = this.getWebgiseast();
        var legendp;
        legendp = Ext.create('GeoExt.panel.Legend', {
            title: 'Legenda',
            header: {
                xtype: 'container',
                html: 'Legenda',
                border: false,
                baseCls: 'x-maplegend-title'
            },
            defaults: {
                labelCls: 'gx-legend-item',
                style: 'padding:5px'
            },
            autoScroll: true,
            border: false,
            layerStore: GeoExt.panel.Map.guess().layers,
            autoScroll: true,
            flex: 1.2
        });
        p.add(legendp);
    }
});