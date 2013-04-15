/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/18/13
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.gtclause.Sesso', {
    extend: 'Ext.form.FieldContainer',
    alias : 'widget.gt_sex',

    border: false,

    labelAlign: "top",
    fieldLabel: 'Seleziona il sesso',

    bodyPadding: 10,

    combineErrors: true,
    msgTarget : 'side',
    layout: 'hbox',
    defaults: {
        flex: 1,
        hideLabel: false
    },

    initComponent: function() {

        this.items = [
            {xtype: 'radiofield', checked: true, boxLabel: 'Maschi', name:  this.baseName + "_" + this.suffixes, inputValue: 1  ,margin: '0 5 0 0'},
            {xtype: 'radiofield', boxLabel: 'Femmine', name: this.baseName + "_" + this.suffixes, inputValue: 2}
        ]

        this.callParent(arguments);
    }
});

