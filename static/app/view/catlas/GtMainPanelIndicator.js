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

    border: false,
    style: 'background-color: #FFFFFF',


//    id: 'gtmainpanelaccordion',

    layout: {
        type: 'accordion',
        titleCollapse: false,
        animate: true,
        activeOnTop: true
    },

    defaults: {
        margin: '0 0 10 0'
    },


    initComponent: function() {

        this.items = [
                {
                    title: 'Configura indicatore',
                    layout: 'card',
                    border: false,
                    cls: 'gt-main-panel',
                    frame: true,
                    id: 'gtsubpanelindicator',
                    style: 'background-color: #FFFFFF;',
                    bodyStyle: 'background-color: #FFFFFF;border-top-width: 0px;',
                    items: [{
                        xtype: 'gttreepanelindicator',
                        store: this.store
                    }]
                },
                {
                    xtype: 'gtcachepanelindicator',
                    store: this.cacheStore,
                    controllerScope: this.controllerScope
                }
            ]

        this.callParent(arguments);
    }
});
