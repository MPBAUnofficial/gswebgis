Ext.define('Webgis.view.CaAmbitoSex', {
    extend: 'Ext.form.RadioGroup',
    alias : 'widget.caambitosex',

//    layout: {
//        type: 'table',
//        // The total column count must be specified here
//        columns: 1
//    },

    fieldLabel: 'Sesso',

    initComponent: function() {

        this.columns = 1
        this.items = [
            {xtype: 'radio', boxLabel: 'Totale', id:'sesso0', checked: true, name: 'sesso',inputValue: 'tot'},
            {xtype: 'radio', boxLabel: 'Femmine', id:'sesso1', name: 'sesso',inputValue: 'f'},
            {xtype: 'radio', boxLabel: 'Maschi', id:'sesso2', name: 'sesso',inputValue: 'm'}
        ]
        this.callParent(arguments);
    }
});