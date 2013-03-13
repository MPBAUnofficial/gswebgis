Ext.define('Webgis.store.Solar', {
    extend: 'Ext.data.Store',
    
    model: 'Webgis.model.Solar',
  
    proxy: {
        type: 'memory',
        reader: {
            type: 'array'
        }
    }
});
