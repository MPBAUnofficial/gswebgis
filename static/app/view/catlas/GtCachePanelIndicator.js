/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 4/4/13
 * Time: 4:41 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.catlas.GtCachePanelIndicator', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gtcachepanelindicator',

    cls: 'gt-main-panel',

    layout: 'fit',
    border: false,

    title: 'Mappe in sessione',

    /* *
     * Setto le linee tra una riga e l'altra tella griglia
     *
     */
    columnLines: false,

    /* *
     * Setto i bordi arrotondati per il panello
     *
     */
    frame: true,

    margin: '0 0 5 0',

    border: false,
    hideHeaders: true,


    initComponent: function () {
        var tpl =  new Ext.XTemplate(
            '<div style="white-space: normal;">',
            '<p>{gs_layer_name}</p>',
            '<p><i>Estrazione effettuata {timestamp}</i></p>',
            '</div>'
        );


        //~ //Setto le colonne da vedere nella griglia
        this.columns = [
            {text: 'Layer name', flex: 1, dataIndex: 'indicator_desc', xtype: 'templatecolumn', tpl: tpl},
            {
                xtype: 'actioncolumn',
                width: 26,
                tdCls: 'gt-cache-td-actioncolumn',
                baseCls: 'gt-cache',
                iconCls: 'gt-cache-img-actioncolumn',
                items: [
                    {
                        icon: '/static/resources/images/addmap.png',
                        tooltip: 'Aggiungi nella mappa',
                        name: 'gridfunction',
                        scope: this.controllerScope,
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            this.addLayerToMap(record);
                        }
                    },
                    {
                        icon: '/static/resources/images/download.png',
                        tooltip: 'Esporta mappa',
                        name: 'gridfunction',
                        scope: this.controllerScope,
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            this.downloadShpFile(record);
                        }
                    },
                    {
                        icon: '/static/resources/images/csv.png',
                        tooltip: 'Esporta CSV',
                        name: 'gridfunction',
                        scope: this.controllerScope,
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            this.downloadCsv(record);
                        }
                    }
                ]
            }
        ]


        this.callParent(arguments);
    }
});
