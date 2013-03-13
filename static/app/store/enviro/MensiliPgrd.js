Ext.define('Webgis.store.enviro.MensiliPgrd', {
    extend: 'Ext.data.Store',
    
    model: 'Webgis.model.enviro.MensiliModelPgrd',
   
    proxy: {
        type: 'memory',
        reader: {
            type: 'array'
        }
    }
});
