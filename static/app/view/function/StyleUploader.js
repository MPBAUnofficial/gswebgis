Ext.define('Webgis.view.function.StyleUploader', {
    extend: 'Ext.form.Panel',
    alias : 'widget.styleuploader',

    border: false,
    frame: true,

    width: 250,

    title: 'Carica uno stile',

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
                    url: '/api/styles/',
                    scope: this.up('form'),
                    waitMsg: 'Invio segnalazione in corso...',
                    success: function(fp, o) {
                        this.store.load(0);
                        Ext.Msg.alert('Caricamento avvenuto', 'Lo stile da lei indicato e\' stato correttamente processato.');
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
            value: 'Per caricare un nuovo stile nel sistema basta compilare le seguenti informazioni.<br/>' +
                'Ti ricordiamo che lo stile sara\' visibile unicamente nella tua area personale, che ha una quota limite di 30 stili.<br/>' +
                '<b>Attenzione</b><br/>Affinche\' la procedura vada a buon fine e\' necessario che lo stile segua il formato standard OGC <b>SLD Styled Layer Descriptor.' +
                'Maggiori informazioni <a target="_blank" href="http://www.opengeospatial.org/standards/sld">qui</a>.</b>'
        },{
            fieldLabel: 'Nome dello stile',
            labelAlign: "top",
            name: 'label',
            allowBlank: false
        },{
            fieldLabel: 'SLD (formato xml)',
            labelAlign: "top",
            name: 'xml',
            xtype: 'textarea',
            allowBlank: false
        },{
            fieldLabel: 'Stile',
            xtype: 'combobox',
            store:  Ext.create('Ext.data.Store', {
                fields: ['abbr', 'name'],
                data : [
                    {"abbr":"PN", "name":"Punti"},
                    {"abbr":"PL", "name":"Poligoni"},
                    {"abbr":"LI", "name":"Linee"}
                ]
            }),
            labelAlign: "top",
            displayField: 'name',
            valueField: 'abbr',
            name: 'feature_type',
            allowBlank: false
        }]

        this.callParent(arguments);
    }
});