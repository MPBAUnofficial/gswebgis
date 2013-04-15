/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/14/13
 * Time: 11:02 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.GtTreePanelIndicator', {
    extend: 'Ext.container.Container',
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
            {
                xtype: 'grid',
                margin: '5 0 5 0',
                border: false,
                hideHeaders: true,

                columns: [
                    { text: 'Nome',  dataIndex: 'name', flex: 1 },
                    {
                        xtype:'actioncolumn',
                        width:30,
                        items: [{
                            icon: '/static/resources/images/asterisk.png',  // Use a URL in the icon config
                            tooltip: 'Configura le variabili'
                        }]
                    }
                ],
                store: this.store,
                flex: 2,
                columnLines: false
            },{
            xtype: 'container',
            border: false,
            flex: 1,
            html: 'Puoi ad esempio guardare il tasso grezzo std per una o piu\' variabili.'
        }]

        this.callParent(arguments);
    }
});
