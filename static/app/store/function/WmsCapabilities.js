Ext.define('Webgis.store.function.WmsCapabilities', {
    extend: 'Ext.data.Store',

    model: 'Webgis.model.function.WmsCapabilities',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },

    data: []
});
