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

//    proxy: {
//        type: 'ajax',
//        url: '/api/layer/',
//        reader: {
//            type: 'json',
//        }
//    },

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },

    sorters: [
        {
            property : 'label',
            direction: 'ASC'
        }
    ],

    data: [
        {"id": 1, "label": "Tasso grezzo"},
        {"id": 2, "label": "Tasso grezzo std"},
        {"id": 8, "label": "Incidenza"}
    ]
});
