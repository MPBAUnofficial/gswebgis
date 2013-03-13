Ext.define('Webgis.view.function.LayerSwitcher', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.layerswitcher',
	
	requires: [
		'Webgis.model.Layer',
		'Webgis.store.Layers',
		'Ext.grid.column.Action'
	],
	
    layout: 'fit',
	border: false,
	
	/* *
	 * Se falso il TreePanel LayerSwitcher non rimane in ascolto su aggiunta, rimozione, 
	 * cambio del layer nel layerstore. 
	 * 
	 */
	dynamic: true,
	
	/* *
	 * Il layer store che contiene i layers da visualizzare nella TreePanel,
	 * se non viene indicato viene preso dal parametro map.
	 * 
	 */
	store: [],
	
	/* *
	 * La mappa che si vuole associare a questo TreePanel.
	 * RICHIESTO
	 * 
	 */
	map:null,
	
	/* *
	 * Setto le linee tra una riga e l'altra tella griglia
	 * 
	 */
	columnLines: true,

	/* *
	 * Setto i bordi arrotondati per il panello
	 * 
	 */
	frame: true,
	
    initComponent: function() {
		//~ //Setto le colonne da vedere nella griglia
		this.columns=[
			{text: 'Layer name',flex: 1, dataIndex: 'name'},
			{
				text: 'Opacity',
				dataIndex: 'opacity',
				width: 50,
				align: 'right',
				editor: {
					xtype: 'numberfield',
					allowBlank: false,
					minValue: 0,
					maxValue: 1,
					step: 0.1,
					allowDecimals: true
				}
            },{
            xtype:'actioncolumn',
            width:22,
            items: [{
                icon: '/static/resources/images/delete.png',
                tooltip: 'Delete',
                name: 'gridfunction',
                
                handler: function(grid, rowIndex, colIndex) {
					var record = grid.getStore().getAt(rowIndex);
					var map = record.data.map
					var layer = map.getLayersBy('id',record.data.id)
					map.removeLayer(layer[0]);
                }
            }]
        }
		]
		
		this.plugins = [
			Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit: 1
			})
		]
		
		//Creo il Webgis.store.Layers per questo TreePanel e ne faccio il load per caricare i dati presenti nella mappa
		var store = new Webgis.store.Layers({
			data: this.map.getLayersBy('displayInLayerSwitcher',true),
			listeners: {
				'update':function(store,record,op){
					rec = record
					if(op==Ext.data.Model.EDIT){
						//Assumo che l'id del layer generato da OpenLayer sia sempre univoco e quindi rappresenti sempre un solo layer
						var layer = rec.data.map.getLayersBy('id',rec.getId())[0];
						layer.setOpacity(rec.data.opacity);
						record.commit();
					}
				}
			}
		})
		this.store = store;
		
		//Setto i listernes per registrare gli eventi sulla mappa (solo se la configurazione dynamic e' true)
		if (this.dynamic){
			this.map.store = this.store;
			this.map.events.on({
				'addlayer': this.addRow,
				'removelayer': this.removeRow,
				scope: this
			});
		}
        this.callParent(arguments);
    },
	removeRow:function(object){
		var map = object.object
		var layer = object.layer
		var store = map.store
		var idx = store.find('id',layer.id)
		store.removeAt(idx);
	},
    addRow:function(object){
		var map = object.object
		var store = map.store
		var layer = object.layer
		//~ layer.layerIndex = map.getLayerIndex(layer);
		//Verifico se e' impostato come displayInLayerSwitcher
		if(layer.displayInLayerSwitcher){
			
			var record = Ext.create('Webgis.model.Layer',layer);
			store.insert(0,record);
		}
	},
	  
    onRenderItem: function(){
		var dh = Ext.core.DomHelper; //Per creare il div specifico di ogni mappa
		
		//Ciclo su ogni layerStore presente nella configurazione del MapPanel (cosi posso gestire la legenda per piu di una mappa)
		for (var idy in this.layerStore){
			var ls = this.layerStore[idy];
			//Creo specifiche per creare il div
			var spec = {
				tag:'div',
				html:'Map Legend '+ idy,
				"class": 'x-maplegend-title',
				id: 'x-maplegend-map'+this.maps[idy].mapdjangoid //Trovo l'id univoco della mappa con lo stesso indice utilizzato dal layerstore	
			}
			dh.append(
				this.body.id,
				spec
			);
			
			//Ciclo su ogni layer presente nel layerStore (con configurazione di una sola mappa nel webgis ciclo una unica volta!)
			for (var idz in ls){
				this.addLegend(ls[idz]);
			}
		}
	},
    update: function(object){
		var l = object.layer;
		var url = this.getLegendUrl(l);
		var nome_layer = capitaliseFirstLetter(l.name);
		
		//DomHelper per aggiungere il div della legenda di questo layer
		var dh = Ext.core.DomHelper;

		//Creo id univoco;
		var unique_id = l.id + 'mapLegend';
		var spec = {
			tag:'div',
			id: unique_id + 'div',
			children:[{
				tag:'div',
				html:nome_layer	
			}]				
		}
		
		dh.overwrite(
			unique_id,
			spec
		);

		var tpl = dh.createTemplate({tag: 'img',src: '{text}'});
		for(var idxa in url){
			tpl.append(unique_id+'div',url[idxa]);
		}
	},
	addLayer: function(object){
		var l = object.layer;
		var map = object.object;
		
		var url = this.getLegendUrl(l);
		var nome_layer = capitaliseFirstLetter(l.name);
		
		//DomHelper per aggiungere il div della legenda di questo layer
		var dh = Ext.core.DomHelper;

		//Creo id univoco;
		var unique_id = l.id + 'mapLegend';
		var spec = {
			id: unique_id, 
			tag: 'div',
			"class": 'x-maplegend',
			children:[{
				tag:'div',
				id: unique_id + 'div',
				children:[{
					tag:'div',
					html:nome_layer	
				}]				
			}]
		}
		
		dh.append(
			'x-maplegend-map'+map.mapdjangoid,
			spec
		);

		var tpl = dh.createTemplate({tag: 'img',src: '{text}'});
		for(var idxa in url){
			tpl.append(unique_id+'div',url[idxa]);
		}
	}
		
});
