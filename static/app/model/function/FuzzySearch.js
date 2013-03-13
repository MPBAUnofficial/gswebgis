Ext.define("Webgis.model.function.FuzzySearch", {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        url : '/webgis/f_search/',
        reader: {
            type: 'json'
//            root: 'location',
//            totalProperty: 'totalCount'
        }
    },


    fields: [
        {name: 'gid'},
        {name: 'deno'},
        {name: 'x'},
        {name: 'y'}
    ]
});
