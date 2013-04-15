/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/18/13
 * Time: 12:26 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.model.catlas.GtIndicators', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name',type: 'string'},
        {name: 'widgets', type: Ext.data.Types.JSON}
    ]
});
