Ext.define('Webgis.view.SolarInfo', {
    extend: 'Ext.window.Window',
    alias : 'widget.solarinfo',
	
	requires: ['Webgis.store.Solar','Webgis.model.Solar','Webgis.view.SolarChart'],
    layout: 'border',
	border: false,
	
	width: 350,
	height: 450,
	
	id: 'solarinfo',
	autoScroll: true,
	autoShow: false,
	
	hidden: true,
	
	title: 'Click info',

	closeAction: 'hide',
	
    initComponent: function() {
		//CREO STORE

		
		//AGGIUNGO I GRAFICI / TABELLE
		this.items = [
			{
				region: 'center',
				border: false,
				id: 'solarinfocenter'
			}
		]
		
        this.callParent(arguments);
    }
		
});
