Ext.define('Webgis.model.wps.ProcessStatus', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.SequentialIdGenerator'],
    idgen: 'sequential',
    fields: [
        {name: 'status', type: 'string'},
        {name: 'polling_url', type: 'string'},
        {name: 'server',type: 'string'},
        {name: 'name',type: 'string'},
        {name: 'started_at',type: 'date'},
        {name: 'stopped_at',type: 'date'},
        {name: 'inputs',type: Ext.data.Types.ARRAY},
        {name: 'outputs',type: Ext.data.Types.ARRAY}
    ]
});