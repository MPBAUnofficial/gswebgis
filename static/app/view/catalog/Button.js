Ext.define('Webgis.view.catalog.Button', {
    extend: 'Ext.button.Button',
    alias : 'widget.catalogbutton',
	
	scale: 'large',
	iconAlign: 'top',
	iconCls: null,
	
	arrowAlign: 'bottom',
	
	catalogview: {
		text: 'aaaaa'
	},
	
    initComponent: function() {
		var menu = Ext.create('Ext.menu.Menu', {
			layout: 'fit',
			items: [{
				xtype: 'panel',
				layout: 'fit',
				width: 500,
				height: 400,
				items: [
					this.catalogview
				]
			}]
		});
		this.menu = menu;
		
        this.callParent(arguments);
    }
});


