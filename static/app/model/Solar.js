Ext.define('Webgis.model.Solar', {
    extend: 'Ext.data.Model',
    fields: ['month', 
		{name: 'ir', 
		type: 'float',
		convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
		}, 
				{name: 'df', 
		type: 'float',
		convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
		}, 
				{name: 'gl', 
		type: 'float',
		convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
		},
		{name: 'gl_avg', 
		type: 'float',
		convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
		}  
		
	 ]

});
