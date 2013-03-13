Ext.define('Webgis.store.wps.ProcessStatus', {
    extend: 'Ext.data.Store',

    model: 'Webgis.model.wps.ProcessStatus',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: '/wps/process/my/',
        reader: {
            type: 'json'
        },
        listeners: {
            exception: function(proxy,response){
                var err = Ext.decode(response.responseText);
                Ext.MessageBox.show({
                    title:'Errore WPS Status',
                    msg: err.message,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        }
    },

    data: []
});
