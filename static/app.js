function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

Ext.Loader.setConfig({
    enabled:true,
    paths: {
        'GeoExt' : '/static/GeoExt'
    }
});
Ext.require('Ext.util.Cookies');

Ext.application({
    name: 'Webgis',

    appFolder: '/static/app',
    
    launch: function() {
		Ext.Loader.setPath('Ext.ux', '/static/extjs/src/ux');
        Ext.Loader.setPath('GeoExt', '/static/GeoExt');

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            border: false,
            items: {
				xtype: 'baseinterface',
				border: false
			}
        });

    },
    controllers: [
		'starter.ReadConfiguration',
	    'starter.SetMap',
	    'Interface',
	    'Westpanel',
        'Eastpanel', //TODO: setVisibile del panel dal controller invece che in BaseInterface
//	    'Catalog',
        'MapToolbar',
//        'enviro.EnviGrid',
//        'enviro.EnviClimaDashboard',
//        'function.LegendPanelSx',
//        'wps.WpsEngine',
        'function.FuzzySearch',
        'function.LegendPanelAlwaysVisible',
//        'Solar',
        'catlas.GtCatalogIndicators',
        'starter.Done'
        //'CaInterface'

//	    'Webgl3d'
    ]
});
