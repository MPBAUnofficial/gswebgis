/**
 * Created with PyCharm.
 * User: shamar
 * Date: 09/10/12
 * Time: 10.00
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.controller.function.LegendPanelSx', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: "fnpanel",
            selector: "#webgiswestfn"
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
        var fn = this.getFnpanel();
        fn.addNewComponent({
            classe: 'GeoExt.panel.Legend',
            name_btn: 'Legend',
            options_btn:{pressed: false},
            options_obj: {
                border: false,
                defaults: {
                    labelCls: 'gx-legend-item',
                    style: 'padding:5px'
                },
                layerStore: GeoExt.panel.Map.guess().layers,
                autoScroll: true
            }
        });
    }
});