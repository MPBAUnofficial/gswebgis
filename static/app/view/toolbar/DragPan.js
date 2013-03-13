Ext.define('Webgis.view.toolbar.DragPan', {
    extend: 'Ext.button.Button',
    alias : 'widget.dragpan',

    scale: 'medium',

    enableToggle: true,
    toggleGroup: 'maptoolbar',
    flex: 1,

    iconAlign: 'top',
    iconCls: 'x-toolbar-pan',

    cls: 'x-button-maptoolbar',

    olControl: OpenLayers.Control.DragPan,
    olMap: null,
    pressed: true,

    initComponent: function() {

        this.control = new this.olControl();
        this.olMap.addControl(this.control);

        this.callParent(arguments);
    }
});