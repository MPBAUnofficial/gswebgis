Ext.define('Webgis.model.GeotreeCatalog', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string', mapping:'name'},
        {name: 'creation_time', type:'date', dateFormat:'c'},
        {name: 'numcode', type: 'int'},
        {name: 'remotehost'},
        {name: 'remoteport'},
        {name: 'remotedb'},
        {name: 'remoteuser'},
        {name: 'remotepass'},
        {name: 'tableschema'},
        {name: 'code_column'},
        {name: 'time_column'},
        {name: 'leaf', type: 'boolean'},
        {name: 'has_metadata', type: 'boolean'},
        {name: 'public', type: 'boolean'}
    ]
});