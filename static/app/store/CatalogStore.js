Ext.define('Webgis.store.CatalogStore', {
    extend: 'Ext.data.Store',

    model: 'Webgis.model.CatalogModel',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/api/layer/',
        reader: {
            type: 'json',
            root: 'styles'
        }
    },

    data: []
});
