/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/14/13
 * Time: 11:08 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.GtWhereClauseIndicator', {
    extend: 'Ext.form.Panel',
    alias : 'widget.gtwhereclauseindicator',

    autoHeight: true,
    bodyPadding: 5,
    layout: {
        type: 'anchor',
        reserveScrollbar: true // There will be a gap even when there's no scrollbar
    },

    border: false,

    title: 'Crea indicatore',
    margin: '10 0 10 0',
    dockedItems: [{
        text: 'Invia',
        dock: 'bottom',
        componentCls: 'x-base-return-button',
        xtype: 'button',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                console.log("invio richiesta");
                console.log(this.up("form"));
                f = this.up("form");
//                form.submit({
//                    url: '/geodocs/new/',
//                    scope: this,
//                    waitMsg: 'Invio segnalazione in corso...',
//                    success: function(fp, o) {
//                        Ext.Msg.alert('Segnalazione avvenuta', 'La Sua segnalazione e\' stata correttamente inserita. <br/> Grazie.');
//                        this.up('form').resetAll();
//                    },
//                    failure: function(fp, o) {
//                        Ext.Msg.alert('Errore', 'Siamo spiacenti ma in seguito ad un errore imprevisto non e\' stato possibile aggiugnere la Sua segnalazione');
//                        this.up('form').resetAll();
//                    }
//                });
            }
        }
    },{
        text: 'Reset selezioni effettuate',
        dock: 'bottom',
        componentCls: 'x-base-return-button',
        xtype: 'button',
        handler: function() {
            var f = this.up("form");
            var g = f.down("grid");

            f.getForm().reset();
            g.getSelectionModel().deselectAll();
        }
    }],

    initComponent: function() {
        //Template per visualizzare le informazioni introduttive
        var st = Ext.create('Webgis.store.catlas.GtAnnoRt');
        var st1 = Ext.create('Webgis.store.catlas.GtAnnoRt');

        var stClassiStart = Ext.create('Webgis.store.catlas.GtClassiEta');
        var stClassiEnd = Ext.create('Webgis.store.catlas.GtClassiEta');

        var stSedeSelected = Ext.create('Webgis.store.catlas.GtSede');
        this.items = [{
            xtype: 'gtclauseannort',
            storeStart: st,
            storeEnd: st1
        },{
            xtype: 'gtclausesesso'
        },{
            xtype: 'gtclauseclassieta',
            storeStart: stClassiStart,
            storeEnd: stClassiEnd
        },{
            xtype: 'gtwhereclausesede',
            selectedStore: stSedeSelected
        }]


        this.callParent(arguments);
    }
});
