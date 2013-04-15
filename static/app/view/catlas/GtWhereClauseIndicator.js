/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/14/13
 * Time: 11:08 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.GtWhereClauseIndicator', {
    extend: 'Ext.form.Panel',
    alias : 'widget.gtwhereclauseindicator',

    autoHeight: true,
    bodyPadding: 5,
    layout: {
        type: 'anchor',
        reserveScrollbar: true // There will be a gap even when there's no scrollbar
    },

    border: false,

    indicatorId: null,
    indicatorName: null,

    margin: '10 0 10 0',
    dockedItems: [{
        text: 'Invia',
        dock: 'bottom',
        componentCls: 'x-base-return-button',
        xtype: 'button',
        type: 'submit'
    },{
        text: 'Reset selezioni effettuate',
        dock: 'bottom',
        type: 'reset',
        componentCls: 'x-base-return-button',
        xtype: 'button',
        handler: function() {
            var f = this.up("form");
            var g = f.down("grid");

            f.getForm().reset();
            g.getSelectionModel().deselectAll();
        }
    },{
        text: 'Indietro (torna al catalogo)',
        dock: 'bottom',
        type: 'undu',
        componentCls: 'x-base-return-button',
        xtype: 'button'
    }],

    initComponent: function() {

        this.callParent(arguments);
    }
});
