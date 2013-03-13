Ext.define('Webgis.view.CaSae', {
    extend: 'Ext.button.Button',
    alias : 'widget.casae',

    scale: 'large',

    xtype: 'button',

    //style: 'z-index: 500002;',

    enableToggle: false,

    text: 'Correzione SAE',

    initComponent: function() {


        this.callParent(arguments);
    }
});