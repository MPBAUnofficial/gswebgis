Ext.define('Webgis.store.enviro.StagionaliPgrd', {
    extend: 'Ext.data.Store',

    model: 'Webgis.model.enviro.StagionaliModel',

    proxy: {
        type: 'memory',
        reader: {
            type: 'array'
        }
    }
});
