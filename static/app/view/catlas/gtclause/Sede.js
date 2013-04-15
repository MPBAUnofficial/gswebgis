/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/14/13
 * Time: 11:08 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.gtclause.Sede', {
    extend: 'Ext.form.FieldContainer',
    alias : 'widget.gt_tumor_site',

    border: false,

    labelAlign: "top",
    fieldLabel: 'Seleziona una o piu\' sedi (tenere premuto il tasto CTRL o spuntare la checkbox)',

    combineErrors: true,
    msgTarget : 'side',

    initComponent: function() {
        var sm = Ext.create('Ext.selection.CheckboxModel');

        var stSedeSelected = Ext.create('Webgis.store.catlas.GtSede',{
            data: this.values
        });

        this.items = [{
            xtype: 'grid',
            hideHeaders: true,
            columns: [
                { text: 'Nome',  dataIndex: 'name', flex: 1 }
            ],
            store: stSedeSelected,
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
            xtype: 'textfield',
            hidden: true,
            name: this.baseName + "_" + this.suffixes,
            allowBlank: false,
            value: null
        }]

        this.callParent(arguments);
    }
});

