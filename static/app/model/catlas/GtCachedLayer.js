/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/18/13
 * Time: 12:26 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.model.catlas.GtCachedLayer', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type:'string', mapping: 'hash'},
        {name: 'hash', type:'string'},
        {name: 'gs_url',type: 'string'},
        {name: 'gs_layer',type: 'string'},
        {name: 'gs_workspace',type: 'string'},
        {name: 'timestamp',type: 'date', dateReaderFormat: 'c', dateWriteFormat: 'j F d Y f:i:s'},
        {name: 'gs_layer_name',type: 'string'},
        {name: 'quantile', type: Ext.data.Types.MONOARRAY}
    ]
});