/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/14/13
 * Time: 11:01 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.GtMainPanelIndicator', {
    extend: 'Ext.container.Container',
    alias : 'widget.gtmainpanelindicator',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    style: 'background-color: #FFFFFF',

    initComponent: function() {
        //Template per visualizzare le informazioni introduttive

        this.items = [
            {
            xtype: 'container',
            flex: 2,
            id: 'gtmainpanelaccordion',

            layout: {
                type: 'accordion',
                titleCollapse: false,
                animate: true,
                activeOnTop: true
            },
            items: [
//                {
//                    xtype: 'gtwhereclauseindicator',
//                    autoScroll: true
//                },
                {
                    xtype: 'gttreepanelindicator',
                    store: this.store
                },
                {
                    title: 'mappe in sessione'
                }
            ]
        }]

        this.callParent(arguments);
    }
});
