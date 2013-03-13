Ext.define('Webgis.model.enviro.WinklerModel', {
    extend: 'Ext.data.Model',
    fields: ['id', 
    
    {
		name:'winkler1',
		type: 'float',
		convert: function(value, record) {
			return Ext.util.Format.round(value,2);
		}
	},{
		name:'winkler2',
		type: 'float',
		convert: function(value, record) {
			return Ext.util.Format.round(value,2);
		}
	}]
	
});
