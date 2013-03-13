Ext.define('Webgis.view.Webgl3dBtn', {
    extend: 'Ext.button.Button',
    alias : 'widget.webgl3dbtn',
	
	scale: 'large',
	
	xtype: 'button',

	style: 'z-index: 500002;',
	
	//id: 'webgl3dbtn',
	
	enableToggle: true,
	
	text: '3D (experimental)',
				
    initComponent: function() {
		
        this.callParent(arguments);
    }
});
