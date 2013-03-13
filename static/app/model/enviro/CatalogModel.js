Ext.define('Webgis.model.enviro.CatalogModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'pk', type: 'int'},
		{name: 'ambito_climatico', type: 'int'},
		{name: 'ambito_spaziale', type: 'int'},
		{name: 'ambito_temporale', type: 'int'},
		{name: 'step', type: 'int'},
		{name: 'step_iniziale', type: 'string'},
		{name: 'step_finale', type: 'string'},
		{name: 'full_codice', type: 'string'},
		{name: 'full_label', type: 'string'},
		{name: 'icon_url', type: 'string'},
		{name: 'full_style',type: 'string'},
		{name: 'full_values',type: 'string'},
        {name: 'layer_workspace',type: 'string'},
        {name: 'geoserver_url',type: 'string'},
		{name: 'full_colour',type: 'string'},
		{name: 'grafico',type: 'string'}
	]
	
});
