Ext.define('Webgis.types.Array', {
    requires: ['Ext.data.Types']
}, function() {
    Ext.data.Types.MONOARRAY = {
        convert: function(data) {
            return data;
        },
        sortType: function(v) {
            return v.join(",");  // When sorting, order by latitude
        },
        type: 'Array'
    };
});