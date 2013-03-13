Ext.define('Webgis.model.CaTreePanel', {
    extend: 'Ext.data.Model',

    idgen: 'sequential',

    fields: [
        'text',
        'workspace',
        'layer_name',
        'geourl',
        'sede',
        'anno'
    ],

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }

});