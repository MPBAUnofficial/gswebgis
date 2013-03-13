Ext.define('Webgis.view.SolarBtn', {
    extend: 'Ext.button.Button',
    alias : 'widget.solarbtn',
	
	scale: 'large',
	
	xtype: 'button',

	style: 'z-index: 500002;',
	
	//id: 'solarclickinfo',
	
	enableToggle: true,
	
	text: 'Query layer',
				
    initComponent: function() {

		
        this.callParent(arguments);
    }
});
