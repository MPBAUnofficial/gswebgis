Ext.define('Webgis.view.LayerSwitcherPanel', {
    extend: 'Ext.panel.Panel',
	
	requires: [
		'Webgis.model.Layer',
		'Webgis.store.Layers',
		'Ext.grid.column.Action',
		'Webgis.view.function.LayerSwitcher'
	],
	
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
	border: false,
	
	maps: Webgis.maps,
	
    initComponent: function() {
		//Setto un LayerSwitcher Grid per ogni mappa
		
		var mappanel = [];
		
		for (var idx in this.maps){
			if(idx==0){
				var a = '0'
				var b = '1'
			} else {
				var a = '1'
				var b = '0'
			}
			if(this.maps.length==1){
				var a = '0';
				var b = '0';
			}
			mappanel.push({
//                header: {
//                    xtype: 'container',
//                    html: 'Layer attivi',
//                    border: false,
//                    baseCls: 'x-maplegend-title'
//                },
				title: 'Layer attivi',
				xtype: 'layerswitcher',
				flex: 1,
//				margin: '0 0 5 0',
				map: this.maps[idx]
//				viewConfig: {
//					plugins: {
//						ptype: 'gridviewdragdrop',
//						dragGroup: 'GridDDGroup'+a,
//						dropGroup: 'GridDDGroup'+b
//					},
//					listeners: {
//						drop: function(element, dataObj, overModel, dropPosition) {
//							var map = Webgis.maps[0]
//
//							var lDroped = map.getLayersBy('id',dataObj.records[0].getId())[0]
//							var lOver = map.getLayersBy('id',overModel.getId())[0]
//
//							var lDropedIdx = map.getLayerIndex(lDroped);
//							var lOverIdx = map.getLayerIndex(lOver);
//							if (dropPosition == 'after'){
//								var newIdx = lOverIdx;
//							} else {
//								var newIdx = lOverIdx;
//							}
//							var nuovoIdx = lDropedIdx - lOver
//							//~ console.log(map.getLayerIndex(lDroped)+" vs "+map.getLayerIndex(lOver)+" nuovoidx "+newIdx)
//
//							map.setLayerIndex(lDroped,newIdx)
//
//						}
//					}
//				}
			})
		}
		this.items = mappanel
		
        this.callParent(arguments);
    }	
});
