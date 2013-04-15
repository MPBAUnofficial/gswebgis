/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/18/13
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.gtclause.ClassiEta', {
    extend: 'Ext.form.FieldContainer',
    alias : 'widget.gt_age_class',

    border: false,
//    style: 'background-color: #FFFFFF',

    labelAlign: "top",
    fieldLabel: 'Seleziona l\'intervallo di classi di eta\'',

    bodyPadding: 10,

    combineErrors: true,
    msgTarget : 'side',
    layout: 'hbox',
    defaults: {
        flex: 1,
        hideLabel: true
    },

    initComponent: function() {
        //Preparo il vtype per effettuare il check delle date
        Ext.apply(Ext.form.field.VTypes, {
            checkdata: function (val, field) {
                if (field.startDateField) {
                    var end = field;
                    var endVal = field.getValue();
                    var start = field.up('form').down('#' + field.startDateField);
                    var startVal = start.getValue();
                    if (startVal > endVal && start) {
                        return false
                    }
                } else if (field.endDateField) {
                    var end = field.up('form').down('#' + field.endDateField);
                    var endVal = end.getValue();
                    var start = field
                    var startVal = field.getValue();
                    if (startVal > endVal && endVal) {
                        return false
                    }
                }
                /*
                 * Always return true since we're only using this vtype to set the
                 * min/max allowed values (these are tested for after the vtype test)
                 */
                return true;
            },

            checkdataText: 'La data di inizio deve essere minore della data di fine.'
        });

        var storeStart = Ext.create('Webgis.store.catlas.GtClassiEta',{
            data: this.values
        });
        var storeEnd = Ext.create('Webgis.store.catlas.GtClassiEta',{
            data: this.values
        });

        this.items = [{
            xtype: 'combobox',
            store: storeStart,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            vtype: 'checkdata',
            name: this.baseName + "_" + this.suffixes[0],
            margin: '0 5 0 0',
            id: 'gtclassietastart',
            allowBlank: false,
            typeAhead: true,
            forceSelection: true,
            endDateField: "gtclassietatend"
        },{
            xtype: 'combobox',
            store: storeEnd,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            vtype: 'checkdata',
            name: this.baseName + "_" + this.suffixes[1],
            id: 'gtclassietatend',
            allowBlank: false,
            typeAhead: true,
            forceSelection: true,
            startDateField: "gtclassietastart"
        }]



        this.callParent(arguments);
    }
});

