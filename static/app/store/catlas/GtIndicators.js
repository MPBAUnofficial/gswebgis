/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/18/13
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.store.catlas.GtIndicators', {
    extend: 'Ext.data.Store',

    model: 'Webgis.model.catlas.GtIndicators',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/api/indicator/',
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    sorters: [
        {
            property : 'name',
            direction: 'ASC'
        }
    ]
});
