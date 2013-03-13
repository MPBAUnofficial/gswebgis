//DA NON USARE BISOGNA PERFEZIONARE LA CLASSE
Ext.define('Webgis.view.CaAmbitoSede', {
    extend: 'Ext.tree.Panel',
    alias : 'widget.caambitosede',

    layout: 'fit',
    border: false,

    header: false,
    hideHeaders: false,

    initComponent: function() {

        this.store = Ext.create('Webgis.store.CaTreePanel');
//
//        this.listeners = {
//            checkchange:{
//                fn: 'onCheckChange',
//                scope: this
//            }
//        }
        this.callParent(arguments);
    }
});