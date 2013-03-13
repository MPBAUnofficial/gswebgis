Ext.define('Webgis.model.wps.WpsModel', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.SequentialIdGenerator'],
    idgen: 'sequential',

    fields: [
		{name: 'identifier', type: 'string'},
		{name: 'version', type: 'string'},
		{name: 'title',type: 'string'}
	]
});
