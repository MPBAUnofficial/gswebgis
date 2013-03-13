Ext.define('Webgis.view.function.ShpUploader', {
    extend: 'Ext.form.Panel',
    alias : 'widget.shpuploader',

    border: false,
    frame: true,

    width: 250,

    title: 'Carica un layer temporaneo',

    layout: 'anchor',
    defaults: {
        anchor: '95%'
    },

    olMap: Webgis.maps[0],

    defaultType: 'textfield',

    autoScroll: true,

    dockedItems: [{
        text: 'Invia',
        dock: 'bottom',
        componentCls: 'x-base-return-button',
        xtype: 'button',
        disableCaching: false,
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: '/api/layer/',
                    scope: this,
                    waitMsg: 'Invio file in corso...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Caricamento avvenuto', 'Il file da lei indicato e\' stato correttamente processato.');
                        var tp = Ext.getCmp('geotreecataloglayer');
                        var st = tp.getStore();
                        st.load({node:st.getNodeById(1)});
                        form.reset();
                    },
                    failure: function(fp, o) {
                        Ext.Msg.alert('Errore', o);
                        form.reset();
                    }
                });
            }
        }
    }],

    initComponent: function() {
        this.items = [{
            name: 'csrfmiddlewaretoken',
            xtype: 'hiddenfield',
            value:  Ext.util.Cookies.get('csrftoken'),
            allowBlank: false
        },{
            xtype: 'displayfield',
            hideLabel: true,
            name: 'home',
            margin: '0 0 15 0',
            value: 'Per caricare un nuovo layer vettoriale nel sistema basta compilare le seguenti informazioni.<br/>' +
                'Ti ricordiamo che il tematismo sara\' visibile unicamente a te, e potra\', tramite l\'apposita funzione, essere condivisio con gli altri utenti.<br/>' +
                '<b>Attenzione</b><br/>Affinche\' la procedura vada a buon fine e\' necessario che lo zip caricato contenga almeno i file <b>.shp, .shx, .dbf, .prj</b>'
        },{
            fieldLabel: 'Nome layer',
            labelAlign: "top",
            name: 'name',
            allowBlank: false
        },{
            fieldLabel: 'Codice EPSG',
            labelAlign: "top",
            name: 'epsg_code',
            allowBlank: false,
            value: 32632
        },{
            fieldLabel: 'Stile',
            xtype: 'combobox',
            store: this.store,
            labelAlign: "top",
            allowBlank: false,
            displayField: 'label',
            valueField: 'id',
            name: 'style',
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                '<div class="x-boundlist-item">',
                    '<img style="margin-right: 10px;" src="/static/resources/images/{feature_type}.png"/>',
                    ' {label}</div>',
                '</tpl>'
            ),
            allowBlank: false
        },{
            fieldLabel: 'Shape ZIP',
            name: 'shape_zip',
            xtype: 'filefield',
            hidden: false,
            labelAlign: "top",
            allowBlank: false
        }]

        this.callParent(arguments);
    }
});