Ext.define('Webgis.view.toolbar.NavPrevious', {
    extend: 'Ext.button.Button',
    alias : 'widget.navprevious',

    scale: 'medium',
    flex: 1,

    iconAlign: 'top',
    iconCls: 'x-toolbar-navprevious',

    componentCls: 'x-button-maptoolbar',

    initComponent: function() {

        this.callParent(arguments);

    }

});