/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/18/13
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.gtclause.AnnoRt', {
    extend: 'Ext.form.FieldContainer',
    alias : 'widget.gt_date_range',

    border: false,

    labelAlign: "top",
    fieldLabel: 'Seleziona l\'anno di inizio e fine serie',

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

        var st = Ext.create('Webgis.store.catlas.GtAnnoRt',{
            data: this.values
        });
        var st1 = Ext.create('Webgis.store.catlas.GtAnnoRt',{
            data: this.values
        });

        this.items = [{
            xtype: 'combobox',
            store: st,
            queryMode: 'local',
            typeAhead: true,
            forceSelection: true,
            displayField: 'name',
            valueField: 'id',
            vtype: 'checkdata',
            name: this.baseName + "_" + this.suffixes[0],
            margin: '0 5 0 0',
            id: 'gtannortstart',
            allowBlank: false,
            endDateField: "gtannortend"
        },{
            xtype: 'combobox',
            store: st1,
            queryMode: 'local',
            typeAhead: true,
            forceSelection: true,
            displayField: 'name',
            valueField: 'id',
            vtype: 'checkdata',
            name: this.baseName + "_" + this.suffixes[1],
            id: 'gtannortend',
            allowBlank: false,
            startDateField: "gtannortstart"
        }]



        this.callParent(arguments);
    }
});

