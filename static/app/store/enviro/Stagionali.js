Ext.define('Webgis.store.enviro.Stagionali', {
    extend: 'Ext.data.Store',
    
    model: 'Webgis.model.enviro.StagionaliModel',
  
    proxy: {
        type: 'memory',
        reader: {
            type: 'array'
        }
    }
});
