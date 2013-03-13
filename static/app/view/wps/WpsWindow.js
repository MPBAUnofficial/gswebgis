/**
 * Created with PyCharm.
 * User: shamar
 * Date: 12/09/12
 * Time: 10.18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.wps.WpsWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.wpswindow',

    autoShow: true,

    headerPosition: "left",
    title: 'Execute WPS',

    bodyCls: 'x-border-layout-ct',

    width: 500,
    maxHeight: 700,

    titleTemplate: new Ext.XTemplate(
        '<div class="wps-header">',
        '<h3>{title}</h3>',
        '<div>Some description here. Some description here. Some description here.</div>',
        '<div style="color: gray;"><i>{identifier} - v{version}</i></div>',
        '</div>'
    ),
    loadMask: new Ext.XTemplate(
        '<div class="x-mask-msg x-mask-loading"><div>Loading variable from wps server...</div></div>'
    ),

    initComponent: function() {
//        var margine = 15;
//        var m = Ext.get('webgiscenter');
//        this.setPosition(m.getX()+margine, m.getY()+margine);
//        this.width = (m.getWidth()-(margine*2));
//        this.height = (m.getHeight()-(margine*2));

        this.items = [{
            xtype: 'container',
            border: false,
            padding: '8 8 8 8',
            tpl: this.titleTemplate,
            tplWriteMode: 'overwrite',
            data: this.dataHeader
        },{
            xtype: 'container',
            border: false,
            type: "loadmask",
            padding: '8 8 8 8',
            tpl: this.loadMask,
            tplWriteMode: 'overwrite',
            data: []
        }]

        this.callParent(arguments);
    }
});