Ext.define('Webgis.types.ArrayToString', {
    requires: ['Ext.data.Types']
}, function() {
    Ext.data.Types.ARRAY = {
        convert: function(data) {
            var obj = new Array();
            var toarray = new Array();
            var r;
            for (el in data){
                obj.push(el+"#"+data[el]);
                toarray.push("<b>"+el+":</b> "+data[el]);
            }
            r = {
                raw: data,
                toarray: toarray,
                text: obj.join("|")
            }
            return r;
        },
        sortType: function(v) {
            return v.text;  // When sorting, order by latitude
        },
        type: 'Array'
    };
});