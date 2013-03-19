/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/18/13
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.store.catlas.GtAnnoRt', {
    extend: 'Ext.data.Store',

    model: 'Webgis.model.catlas.GtAnnoRt',

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

    data: [[1, '1999'],[2, '2000']]
});
