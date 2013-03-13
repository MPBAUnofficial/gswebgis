/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 12/20/12
 * Time: 2:19 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.model.GeotreeCatalogStatistical', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'real_id', type: 'int'},
        {name: 'text', type: 'string', mapping:'name'},
        {name: 'creation_time', type:'date', dateFormat:'c'},
        {name: 'numcode', type: 'int'},
        {name: 'tableschema'},
        {name: 'tablename'},
        {name: 'code_column'},
        {name: 'data_column'},
        {name: 'time_column'},
        {name: 'leaf', type: 'boolean'},
        {name: 'has_metadata', type: 'boolean'},
        {name: 'public', type: 'boolean'}
    ]
});
