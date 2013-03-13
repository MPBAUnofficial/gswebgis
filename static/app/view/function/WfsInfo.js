Ext.define('Webgis.view.function.WfsInfo', {
    extend: 'Ext.window.Window',
    alias : 'widget.wfsinfo',

    layout: 'fit',
    border: false,

    width: 600,
    height: 350,

    autoShow: false,

    hidden: true,

    id: 'wfsinfo',

    cls: 'x-wfs-metadata',

    title: 'Informazioni sulla selezione.',

    closeAction: 'hide',

    initComponent: function() {

        this.callParent(arguments);
    }

});
