Ext.define('Webgis.view.toolbar.ZoomMaxExtent', {
    extend: 'Ext.button.Button',
    alias : 'widget.zoomextent',

    scale: 'medium',
    flex: 1,

    olControl: OpenLayers.Control.ZoomToMaxExtent,
    olMap: null,

    iconAlign: 'top',
    iconCls: 'x-toolbar-zoommax',

    componentCls: 'x-button-maptoolbar',

    initComponent: function() {

        this.control = new this.olControl(this.olInit);
        this.olMap.addControl(this.control);
        this.callParent(arguments);

    }

});