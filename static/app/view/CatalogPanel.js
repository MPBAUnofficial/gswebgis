Ext.define('Webgis.view.CatalogPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.catalogpanel',
 
	border: false,
	
	renderTo: 'webgiscenter',
	
	closable: false,
	preventHeader: true,
	resizable: false,
	border: false,
	autoShow: true,
	
	id: 'catalogpanel',
	
	baseCls: 'x-catalogpanel',

	width: 60,
	height: 500,

    layout: {
        type: 'vbox',
        align: 'stretchmax'
    },
	
    initComponent: function() {
        this.callParent(arguments);
        
    }
});

