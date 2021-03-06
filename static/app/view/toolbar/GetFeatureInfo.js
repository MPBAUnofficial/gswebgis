Ext.define('Webgis.view.toolbar.GetFeatureInfo', {
    extend: 'Ext.button.Button',
    alias : 'widget.getfeatureinfo',

    scale: 'medium',

    flex: 1,

    enableToggle: true,
    toggleGroup: 'maplocation',

    iconAlign: 'top',
    iconCls: 'x-toolbar-getfeatureinfo',

    componentCls: 'x-button-maptoolbar',

    initComponent: function() {
        //Preparo l'infopanel
        this.infopanel = new Ext.container.Container({
            border: false,

            renderTo: Ext.getBody(),

            closable: false,
            preventHeader: true,
            resizable: false,
            shadow: false,
            autoShow: false,
            hidden:true,
            floating: true,
            componentCls: 'x-info-panel',
            width: 350,
            height: 50,
            tpl: new Ext.Template(
                '<p>Click on Map to get feature info.</p>'
            ),
            tplWriteMode: "overwrite",
            data: []
        });

        //Preparo il marker
        this.markerslayer = new OpenLayers.Layer.Markers("Markers",{displayInLayerSwitcher:false});
        var size = new OpenLayers.Size(15,24);
        var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
        this.icon = new OpenLayers.Icon("/static/resources/images/icons/getmouseposition25.png", size, offset);

        //Aggiungo il control per il click
        this.control = new OpenLayers.Control.Click({
            handlerOptions: {
                "single": true,
                "ref": this
            },
            fn: this.fn
        })
        this.olMap.addControl(this.control);

        this.callParent(arguments);
    }
});