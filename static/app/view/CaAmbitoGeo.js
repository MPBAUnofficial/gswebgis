Ext.define('Webgis.view.CaAmbitoGeo', {
    extend: 'Ext.form.RadioGroup',
    alias : 'widget.caambitogeo',

//    layout: {
//        type: 'table',
//        // The total column count must be specified here
//        columns: 1
//    },

    baseCls: 'ca-ambiti',

    fieldLabel: 'Ambito',

    initComponent: function() {

        this.columns = 1
        this.items = [
            {xtype: 'radio', boxLabel: 'Comprensorio', id: 'livello0', checked: true, name: 'livello', inputValue: 'comp'},
            {xtype: 'radio', boxLabel: 'Comune', id: 'livello1',  name: 'livello', inputValue: 'comuni'}
        ]
        this.callParent(arguments);
    }
});
