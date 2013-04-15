/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/18/13
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.gtclause.Ambito', {
    extend: 'Ext.form.FieldContainer',
    alias : 'widget.gt_output_level',

    border: false,

    labelAlign: "top",
    fieldLabel: 'Seleziona il livello geografico',

    bodyPadding: 10,

    combineErrors: true,
    msgTarget : 'side',
    layout: 'hbox',
    defaults: {
        flex: 1,
        hideLabel: true
    },

    initComponent: function() {
        var stAmbito = Ext.create('Webgis.store.catlas.GtAmbito',{
            data: this.values
        });
        this.items = [{
            xtype: 'combobox',
            store: stAmbito,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            vtype: 'checkdata',
            name:  this.baseName + "_" + this.suffixes,
            margin: '0 5 0 0',
            allowBlank: false,
            typeAhead: true,
            forceSelection: true
        }]



        this.callParent(arguments);
    }
});

