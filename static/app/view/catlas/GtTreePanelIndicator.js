/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/14/13
 * Time: 11:02 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.GtTreePanelIndicator', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.gttreepanelindicator',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    border: false,
    style: 'background-color: #FFFFFF',

    initComponent: function() {
        //Template per visualizzare le informazioni introduttive

        this.items = [
//            {
//            xtype: 'container',
//            id: 'pippo',
//            border: true,
//            flex: 1,
//            html: 'Futura area selezione indicatore'
//        },
            {
                xtype: 'grid',
                margin: '10 0 10 0',
                hideHeaders: true,
                columns: [
                    { text: 'Label',  dataIndex: 'label', flex: 1 },
                    {
                        xtype:'actioncolumn',
                        width:50,
                        items: [{
//                            icon: 'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                            text: "Settings",
                            tooltip: 'Settings',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);

                            }
                        }]
                    }
                ],
                store: this.store,
                flex: 2,
                columnLines: true
            },{
            xtype: 'container',
            border: false,
            flex: 1,
            html: 'Bla bla bla <br/> Facciamo un po di esempi di utilizzo fighi...'
        }]

        this.callParent(arguments);
    }
});
