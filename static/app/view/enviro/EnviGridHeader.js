Ext.define('Webgis.view.enviro.EnviGridHeader', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.envigridheader',

	frame: true,
	border: true,

	layout: 'fit',
	
	height: 40,
	
	cls: 'x-envigrid-fit-td-header',
	
	bodyCls: 'x-envigrid-fit-td-headerelement',
	
    initComponent: function() {
		
		this.html = this.label_ambito

        this.callParent(arguments);
    }
});
