/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/18/13
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.gtclause.PopolazioneStd', {
    extend: 'Ext.form.FieldContainer',
    alias : 'widget.gt_standard_population',

    border: false,

    labelAlign: "top",
    fieldLabel: 'Seleziona la popolazione standard di riferimento',

    bodyPadding: 10,

    combineErrors: true,
    msgTarget : 'side',
    layout: 'hbox',
    defaults: {
        flex: 1,
        hideLabel: true
    },

    initComponent: function() {
        var stPop = Ext.create('Webgis.store.catlas.GtPopolazioneStd',{
            data: this.values
        });
        this.items = [{
            xtype: 'combobox',
            store: stPop,
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

