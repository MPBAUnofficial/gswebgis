Ext.define('Webgis.store.function.ShpStyle', {
    extend: 'Ext.data.Store',

    model: 'Webgis.model.function.ShpStyle',

    autoLoad: true,

    proxy: {
        type: 'rest',
        url: '/api/styles/',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json'
        },
        appendId: true
    },

    data: []
});
