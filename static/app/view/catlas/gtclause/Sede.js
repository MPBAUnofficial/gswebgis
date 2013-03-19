/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/14/13
 * Time: 11:08 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.gtclause.Sede', {
    extend: 'Ext.form.FieldContainer',
    alias : 'widget.gtwhereclausesede',

    border: false,

    labelAlign: "top",
    fieldLabel: 'Seleziona una o piu\' sedi (tenere premuto il tasto CTRL o spuntare la checkbox)',

    combineErrors: true,
    msgTarget : 'side',

    initComponent: function() {

        var sm = Ext.create('Ext.selection.CheckboxModel');

        this.items = [{
            xtype: 'grid',
            hideHeaders: true,
            columns: [
                { text: 'Label',  dataIndex: 'label', flex: 1 }
            ],
            store: this.selectedStore,
            selModel: sm,
            height: 250,
            autoScroll: true,
            columnLines: true
        },{
            xtype: 'displayfield',
            hideLabel: true,
            margin: '5 0 0 0',
            name: 'label_sede',
            value: 'Nessuna sede selezionata'
        },{
//            xtype: 'hiddenfield',
            xtype: 'textfield',
            hidden: true,
            name: 'sedi',
            allowBlank: false,
            value: null
        }]

        this.callParent(arguments);
    }
});

