Ext.define('Webgis.store.Layers', {
    extend: 'Ext.data.Store',
    
    model: 'Webgis.model.Layer',
   
    data: [],

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
