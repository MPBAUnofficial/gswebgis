/**
 * Created with PyCharm.
 * User: shamar
 * Date: 12/09/12
 * Time: 16.00
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.enviro.EnviClimaPanel', {
    extend: 'Ext.container.Container',
    alias : 'widget.enviclimapanel',

    border: false,
    header: false,

    preventHeader: true,
    resizable: false,
    shadow: true,

    width: 70,
    height: 30,

    layout: {
        type: 'hbox',
        align: 'stretchmax',
        defaultMargins: {top: 0, right: 0, bottom: 0, left: 10}
    },

    initComponent: function() {

        this.items = [{
            xtype: "button",
            type: "stagionali",
            cardid: 0,
            componentCls: 'x-envigrid-button',
            text: "Grafici stagionali"
        },{
            xtype: "button",
            componentCls: 'x-envigrid-button',
            type: "winkler",
            cardid: 1,
            text: "Grafici Winkler"
        },{
            xtype: "button",
            componentCls: 'x-envigrid-button',
            type: "tabella",
            cardid: 2,
            text: "Tabella mensile"
        }]

        this.callParent(arguments);
    }
});
