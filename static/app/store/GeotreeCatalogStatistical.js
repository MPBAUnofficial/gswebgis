/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 12/20/12
 * Time: 2:48 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.store.GeotreeCatalogStatistical', {
    extend: 'Ext.data.TreeStore',

    autoLoad: true,
    proxy: {
        type: 'rest',
        url: '/api/statistical/',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json'
        },
        appendId: true,
        listeners: {
            exception: function(proxy,response){
                var err = Ext.decode(response.responseText);
                Ext.MessageBox.show({
                    title:'Errore nel catalogo statistico',
                    msg: err.message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        }

    },

    nodeParam: 'id',

    root: {
        text: 'my Root',
        expanded: true,
        id: 0
    }
});
