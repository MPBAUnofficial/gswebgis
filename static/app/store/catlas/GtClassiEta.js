/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/18/13
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.store.catlas.GtClassiEta', {
    extend: 'Ext.data.Store',

    model: 'Webgis.model.catlas.GtClassiEta',

    autoLoad: true,

//    proxy: {
//        type: 'ajax',
//        url: '/api/layer/',
//        reader: {
//            type: 'json',
//            root: 'styles'
//        }
//    },

    proxy: {
        type: 'memory',
        reader: {
            type: 'array'
        }
    },

    data: [
        [1, '0-4'],
        [2, '5-9'],
        [3, '10-14']
    ]
});
