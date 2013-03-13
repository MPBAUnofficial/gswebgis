Ext.define('Webgis.store.enviro.Winkler', {
    extend: 'Ext.data.Store',
    
    model: 'Webgis.model.enviro.WinklerModel',
    
    proxy: {
        type: 'memory',
        reader: {
            type: 'array'
        }
    }
});
