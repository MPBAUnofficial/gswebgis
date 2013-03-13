Ext.define('Webgis.view.CaAmbitoEta', {
    extend: 'Ext.form.CheckboxGroup',
    alias : 'widget.caambitoeta',

//    layout: {
//        type: 'table',
//        // The total column count must be specified here
//        columns: 4
//    },

    baseCls: 'pippo',

    fieldLabel: 'Classi',

    initComponent: function() {

        this.items = [
            {xtype: 'checkbox', id: 'classi0', boxLabel: 'Totale', name: 'classi', inputValue: 'tot', checked: true},
            {xtype: 'checkbox', id: 'classi1', boxLabel: '0-4', name: 'classi', inputValue: 0},
            {xtype: 'checkbox', id: 'classi2', boxLabel: '5-9', name: 'classi', inputValue: 5},
            {xtype: 'checkbox', id: 'classi3', boxLabel: '10-14', name: 'classi', inputValue: 10},
            {xtype: 'checkbox', id: 'classi4', boxLabel: '15-19', name: 'classi', inputValue: 15},
            {xtype: 'checkbox', id: 'classi5', boxLabel: '20-24', name: 'classi', inputValue: 20},
            {xtype: 'checkbox', id: 'classi6', boxLabel: '25-29', name: 'classi', inputValue: 25},
            {xtype: 'checkbox', id: 'classi7', boxLabel: '30-34', name: 'classi', inputValue: 30},
            {xtype: 'checkbox', id: 'classi8', boxLabel: '35-39', name: 'classi', inputValue: 35},
            {xtype: 'checkbox', id: 'classi9', boxLabel: '40-44', name: 'classi', inputValue: 40},
            {xtype: 'checkbox', id: 'classi10', boxLabel: '45-49', name: 'classi', inputValue: 45},
            {xtype: 'checkbox', id: 'classi11', boxLabel: '50-54', name: 'classi', inputValue: 50},
            {xtype: 'checkbox', id: 'classi12', boxLabel: '55-59', name: 'classi', inputValue: 55},
            {xtype: 'checkbox', id: 'classi13', boxLabel: '60-64', name: 'classi', inputValue: 60},
            {xtype: 'checkbox', id: 'classi14', boxLabel: '65-69', name: 'classi', inputValue: 65},
            {xtype: 'checkbox', id: 'classi15', boxLabel: '70-74', name: 'classi', inputValue: 70},
            {xtype: 'checkbox', id: 'classi16', boxLabel: '75-79', name: 'classi', inputValue: 75},
            {xtype: 'checkbox', id: 'classi17', boxLabel: '80-84', name: 'classi', inputValue: 80},
            {xtype: 'checkbox', id: 'classi18', boxLabel: '85 +', name: 'classi', inputValue: 85}
        ]
        this.callParent(arguments);
    }
});