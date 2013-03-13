Ext.define('Webgis.model.CatalogModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'gs_name', type: 'string'},
		{name: 'gs_workspace', type: 'string'},
        {name: 'gs_url', type: 'string'},
        {name: 'gs_url', type: 'string'},
        {name: 'geoserver_url', type: 'string'},
        {name: 'geoserver_workspace', type: 'string'},
        {name: 'name_layer', type: 'string'},
        {name: 'style', type: 'string'},

        {name: 'creation_time', type: 'string'},
		{name: 'gs_legend_url', type: 'string'},
		{name: 'has_metadata', type: 'boolean'},
		{name: 'leaf', type: 'boolean'},
		{name: 'public', type: 'boolean'},
		{name: 'text', type: 'string', mapping:'name'}
	]
});
