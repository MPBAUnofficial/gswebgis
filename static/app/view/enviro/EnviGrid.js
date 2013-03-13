Ext.define('Webgis.view.enviro.EnviGrid', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.envigridpanel',
	
	id: 'envigridwindow',
	
	closable: false,
	preventHeader: true,
    floating: true,
	baseCls: 'x-panel',
	resizable: false,
	border: false,
	
    initComponent: function() {
		var wc = Ext.getCmp('webgiscenter');
		
		//SETUP dimensioni e posizioni
		this.width = wc.getWidth();
		this.height = wc.getHeight();
	
		this.x = 285;
		this.y = 60;
		
		//SETUP del layout
		this.layout = 'border'
		
		this.items = [{
			//flex: 1,
			width: '100%',
			border: false,
			region: 'north',
			items: this.north
		},{
			border: false,
			layout: 'fit',
			region: 'center',
			items: this.center
		}];
		
        this.callParent(arguments);
    }
});
