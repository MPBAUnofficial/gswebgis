Ext.define('Webgis.controller.function.FuzzySearch', {
    extend: 'Ext.app.Controller',

    requires: [
        'Webgis.view.function.FuzzySearch',
        'Webgis.store.function.FuzzySearch'
    ],
//    stores: [
//        'function.FuzzySearch'
//    ],
//    models:[
//        'function.FuzzySearch'
//    ],

    init: function() {
        this.control({
            '#webgisnorth': {
                afterlayout: {
                    fn:this.onPanelRendered,
                    scope: this,
                    single:true
                }
            },
            'fuzzysearch':{
                select: {
                    fn: this.goToLocation,
                    scope: this
                }
            }
        });

    },
    onPanelRendered: function(ct){
        ct.add(Ext.create('Webgis.view.function.FuzzySearch',{
                store: Ext.create('Webgis.store.function.FuzzySearch')
            })
        );
    },
    goToLocation: function(combo,rec){
        var map = Webgis.maps[0];
        var rec = rec[0];
        map.setCenter(new OpenLayers.LonLat(rec.data.x,rec.data.y),7);
    }
});
