Ext.define('Webgis.types.JsonObject', {
    requires: ['Ext.data.Types']
}, function() {
    Ext.data.Types.JSON = {
        convert: function(data) {
            var obj = new Array();
            var r;
            for (el in data){
                obj.push(el+data[el].name);
            }
            r = {
                raw: data,
                text: obj.join("|")
            }
            return r;
        },
        sortType: function(v) {
            return v.text;
        },
        type: 'Json'
    };
});