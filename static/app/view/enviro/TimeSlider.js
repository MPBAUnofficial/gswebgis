Ext.define('Webgis.view.enviro.TimeSlider', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.timeslider',
 
	border: false,
	
	//~ renderTo: 'webgiscenter',
	
	preventHeader: true,
	resizable: false,
	border: false,
	hidden: true,
	
	id: 'timeslider',
	
	//~ baseCls: 'x-timeslider',

	width: 450,
	//~ height: 140,

    layout: {
        type: 'table',
        columns: 6,
        tableAttrs: {
			//~ style: 'width: 100%;'
		},
        tdAttrs: {
			style: 'text-align: center;'
		}
    },

    initComponent: function() {
		
		this.items = [{
			xtype: 'button',
            iconCls: 'x-envigrid-backward',
            componentCls: 'x-envigrid-button',
            disabledCls: 'x-envigrid-button-disabled',
			id: 'backward',
			scale: 'medium'
		},{
			xtype: 'button',
            iconCls: 'x-envigrid-play',
            componentCls: 'x-envigrid-button',
            disabledCls: 'x-envigrid-button-disabled',
			id: 'play',
			running: false,
			scale: 'medium'
		},{
			xtype: 'button',
            iconCls: 'x-envigrid-forward',
            componentCls: 'x-envigrid-button',
            disabledCls: 'x-envigrid-button-disabled',
			id: 'forward',
			scale: 'medium'
		},{
			xtype: 'button',
            iconCls: 'x-envigrid-settings',
            componentCls: 'x-envigrid-button',
            disabledCls: 'x-envigrid-button-disabled',
			id: 'settings',
			scale: 'medium'
		},{
			xtype: 'panel',
			id: 'timeslidertitle',
			border: false,
			width: 120,
			html: '2000'
		},{
			xtype: 'panel',
			border: false,
			width: 120,
			id: 'timesliderinfo'
			}]
		
        this.callParent(arguments);
    }
});

