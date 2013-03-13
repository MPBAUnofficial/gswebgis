Ext.define('Webgis.view.toolbar.ZoomOut', {
    extend: 'Ext.button.Button',
    alias : 'widget.zoomout',

    scale: 'medium',

    enableToggle: true,
    toggleGroup: 'maptoolbar',
    flex: 1,

    olControl: OpenLayers.Control.ZoomBox,
    olInit: {
        out: true
    },
    olMap: null,

    iconAlign: 'top',
    iconCls: 'x-toolbar-zoomout',

    componentCls: 'x-button-maptoolbar',

    initComponent: function() {

        this.control = new this.olControl(this.olInit);
        this.olMap.addControl(this.control);

        this.callParent(arguments);
    }
});