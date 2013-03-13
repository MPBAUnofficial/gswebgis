Ext.define('Webgis.view.enviro.TimeSliderSettings', {
    extend: 'Ext.window.Window',
    alias : 'widget.timeslidersettings',
	
	//~ requires: [
		//~ 'Webgis.model.Layer',
		//~ 'Webgis.store.Layers',
		//~ 'Ext.grid.column.Action',
		//~ 'Webgis.view.function.LayerSwitcher'
	//~ ],

	width: 400,
	height: 200,
	
	headerPosition: 'left',
	title: 'TimeSlider Settings',
	
	layout: 'anchor',
	autoShow: true,
	closable: false,
	closeAction: 'destroy',
	modal: true,
	
	formato_data: null,
	data_iniziale: null,
	data_finale: null,

	
    initComponent: function() {
		
		this.items = [{
			xtype: 'numberfield',
			fieldLabel: 'Interval (seconds)',
			name: 'interval',
			id:'interval',
			minValue: 500,
			maxValue: 5000,
			allowDecimals: true,
			decimalPrecision: 1,
			allowBlank: false,
			step: 500,
			anchor: '95%',
			value: 1000
		},{
			xtype: 'datefield',
			fieldLabel: 'Start Date',
			name: 'startdt',
			id: 'startdt',
			anchor: '95%',
			allowBlank: false,
			format: this.formato_data,
			value: this.data_iniziale,
			minValue: this.data_iniziale_bk,
			showToday: false,
			//~ vtype: 'daterange',
			endDateField: 'enddt' // id of the end date field
		},
		{	
			xtype: 'datefield',
			fieldLabel: 'End Date',
			name: 'enddt',
			id: 'enddt',			
			anchor: '95%',
			allowBlank: false,
			format: this.formato_data,
			value:this.data_finale,
			maxValue: this.data_finale_bk,
			showToday: false,
			//~ vtype: 'daterange',
			startDateField: 'startdt' // id of the start date field
		},
		Ext.create('Ext.slider.Multi', {
			width: 200,
			values: [50, 75],
			increment: 1,
			minValue: 0,
			
			maxValue: 100,

			anchor: '95%',
			// this defaults to true, setting to false allows the thumbs to pass each other
			constrainThumbs: true
		})
		
		]
		
		this.buttons = [{
			text: 'Apply'
		}]
        this.callParent(arguments);
    }	
});
