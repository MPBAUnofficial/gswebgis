Ext.define('Webgis.view.wps.WpsExecuteBtn', {
    extend: 'Ext.button.Button',
    alias : 'widget.wpsexecute',

    text: 'Run!',

    componentCls: 'x-envigrid-button',

    margin: '8 8 8 8',

    initComponent: function() {
        this.callParent(arguments);
    }
});
