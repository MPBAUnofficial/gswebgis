/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/18/13
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.store.catlas.GtCachedLayer', {
    extend: 'Ext.data.Store',

    model: 'Webgis.model.catlas.GtCachedLayer',

    autoLoad: true,

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
