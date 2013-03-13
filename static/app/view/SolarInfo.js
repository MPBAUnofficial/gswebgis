Ext.define('Webgis.view.SolarInfo', {
    extend: 'Ext.window.Window',
    alias : 'widget.solarinfo',
	
	//requires: ['Webgis.store.enviro.Stagionali','Webgis.store.enviro.Mensili','Webgis.store.enviro.Winkler','Webgis.model.enviro.StagionaliModel','Webgis.model.enviro.MensiliModel','Webgis.model.enviro.WinklerModel','Webgis.view.enviro.StagionaliChart','Webgis.view.enviro.MensiliGrid','Webgis.view.enviro.WinklerChart','Ext.chart.theme.Base','Ext.chart.series.Column'],
	requires: ['Webgis.store.Solar','Webgis.model.Solar','Webgis.view.SolarChart'],
    layout: 'border',
	border: false,
	
	width: 600,
	height: 450,
	
	id: 'solarinfo',
	
	autoShow: false,
	
	hidden: true,
	
	title: 'SolarWeb building roof info',
	
	stdata: null,
	
	closeAction: 'hide',
	
    initComponent: function() {
		//CREO STORE
		//this.ststagionali = new Webgis.store.enviro.Stagionali();
		//this.stmensili = new Webgis.store.enviro.Mensili();
		//this.stwinkler = new Webgis.store.enviro.Winkler();
		this.stdata = new Webgis.store.Solar();
		
		//AGGIUNGO I GRAFICI / TABELLE
		this.items = [
			{
				region: 'north',
				border: false,
				id: 'solarinfocenter',
				height: 150
			},{
				region: 'center',
				border: false,
				xtype: 'solarchart',
				store: this.stdata
				//id: 'solarchartcenter'
				}
		]
		
        this.callParent(arguments);
    }
		
});
