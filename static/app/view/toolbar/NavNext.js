Ext.define('Webgis.view.toolbar.NavNext', {
    extend: 'Ext.button.Button',
    alias : 'widget.navnext',

    scale: 'medium',
    flex: 1,

    iconAlign: 'top',
    iconCls: 'x-toolbar-navnext',

    componentCls: 'x-button-maptoolbar',

    initComponent: function() {

        this.callParent(arguments);

    }

});