Ext.define('Webgis.store.enviro.CatalogStore', {
    extend: 'Ext.data.Store',
    
    model: 'Webgis.model.enviro.CatalogModel',
   
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },
    
    data: []
});
