Ext.define('Webgis.model.function.ShpStyle', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'xml', type: 'string'},
        {name: 'feature_type', type: 'string'},
        {name: 'public', type: 'boolean', defaultValue: true},
        {name: 'created_at',type: 'date'},
        {name: 'label',type: 'string'},
        {name: 'style_name',type: 'string'},
        {name: 'id',type: 'integer'}
    ],
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

    }
});