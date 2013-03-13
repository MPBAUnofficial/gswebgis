Ext.define('Webgis.store.enviro.Mensili', {
    extend: 'Ext.data.Store',
    
    model: 'Webgis.model.enviro.MensiliModel',
   
    proxy: {
        type: 'memory',
        reader: {
            type: 'array'
        }
    }
});
