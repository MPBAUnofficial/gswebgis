Ext.define('Webgis.model.enviro.StagionaliModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 
    {
		name:'s1',
		type: 'float',
		convert: function(value, record) {
			return Ext.util.Format.round(value,2);
		}
	},{
		name:'s2',
		type: 'float',
		convert: function(value, record) {
			return Ext.util.Format.round(value,2);
		}
	},{
		name:'s3',
		type: 'float',
		convert: function(value, record) {
			return Ext.util.Format.round(value,2);
		}
	},{
		name:'s4',
		type: 'float',
		convert: function(value, record) {
			return Ext.util.Format.round(value,2);
		}
	},{
		name:'s5',
		type: 'float',
		convert: function(value, record) {
			return Ext.util.Format.round(value,2);
		}
	}]

});

