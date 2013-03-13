/**
 * Created with PyCharm.
 * User: shamar
 * Date: 12/09/12
 * Time: 12.42
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.enviro.EnviClimaStazioni', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.enviclimastazioni',

    region: 'west',
    width: 220,

    border: false,

    header: false,

    columns: [
        { text: 'Code',  dataIndex: 'id', width: 50 , menuDisabled: true },
        { text: 'Name', dataIndex: 'name', flex: 1, menuDisabled: true }
    ],

    initComponent: function() {


        this.callParent(arguments);
    }
});
