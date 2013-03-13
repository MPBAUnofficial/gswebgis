Ext.define('Webgis.class.WpsAction' ,{

    constructor: function(config){
        this.initConfig(config);
        return this;
    },
    getUniqueId: function(){
       this.setValue("wps" + new Date().getTime());
    },
    getBBOX: function(){
        var map = Webgis.maps[0],
            extent

        extent = map.getExtent();

        this.setValue(extent.toBBOX());
    }


});