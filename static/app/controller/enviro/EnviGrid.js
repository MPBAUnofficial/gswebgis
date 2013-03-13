Ext.define('Webgis.controller.enviro.EnviGrid', {
    extend: 'Ext.app.Controller',

	views: [
		'enviro.EnviGrid',
		'enviro.EnviGridInformation',
		'enviro.EnviGridDashboard',
		'enviro.EnviGridHeader',
		'enviro.EnviGridRowsname',
		'enviro.EnviGridItem',
		'enviro.EnviGridButton',
		'enviro.TimeSliderSettings'
	],
	
	stores: ['enviro.CatalogStore'],
	models: ['enviro.CatalogModel'],
	
    init: function() {

		this.control({
            '#webgiscenter': {
                afterlayout: {
					fn:this.onPanelRendered,
					scope: this,
					single:true
				}
            },
            'envigridbutton':{
				click: this.selectAmbito
			},
			'layerswitcher':{
				itemclick: {
					fn: this.layerswitcherItemClick,
					scope: this
				}
			},
			'#play':{
				click: this.timesliderPlay
			},
			'#forward':{
				click: this.timesliderForward
			},
			'#backward':{
				click: this.timesliderBackward
			},
			'#settings':{
				click: this.timesliderSettings
			}
//            ,
//			'timeslidersettings button':{
//				click: this.updateDataAttuale
//			}
            ,
			'timeslidersettings button':{
				click: {
                    fn: this.updateDataAttuale,
                    scope: this
                }
			}
        });
        
        
    },
    updateDataAttuale: function(btn){

		Webgis.TimeSlider.layer_attuale.timerms = Ext.getCmp('interval').getValue();
		Webgis.TimeSlider.layer_attuale.data_iniziale = Ext.getCmp('startdt').getValue()
		Webgis.TimeSlider.layer_attuale.data_attuale = Ext.getCmp('startdt').getValue()
		Webgis.TimeSlider.layer_attuale.data_finale = Ext.getCmp('enddt').getValue()

        this.goToSpecificTimeStamp(Webgis.TimeSlider.layer_attuale,Webgis.TimeSlider.layer_attuale.data_attuale);

		btn.up('timeslidersettings').close();
	},
    timesliderSettings: function(){
		Ext.widget('timeslidersettings',{
			data_iniziale_bk: Webgis.TimeSlider.layer_attuale.data_iniziale_bk,
			data_finale_bk: Webgis.TimeSlider.layer_attuale.data_finale_bk,
			data_iniziale: Webgis.TimeSlider.layer_attuale.data_iniziale,
			data_finale: Webgis.TimeSlider.layer_attuale.data_finale,
			formato_data: Webgis.TimeSlider.layer_attuale.formato_data
		})
	},
	timesliderBackward: function(){
		if(Webgis.TimeSlider.layer_attuale.data_attuale <= Webgis.TimeSlider.layer_attuale.data_iniziale){
			Webgis.TimeSlider.layer_attuale.data_attuale = Ext.Date.add(Webgis.TimeSlider.layer_attuale.data_finale,Webgis.TimeSlider.layer_attuale.data_step_type,Webgis.TimeSlider.layer_attuale.data_step);
		}
		this.goToNextTimeStamp(Webgis.TimeSlider.layer_attuale,-1);
	},	
    timesliderForward: function(){
		if(Webgis.TimeSlider.layer_attuale.data_attuale > Webgis.TimeSlider.layer_attuale.data_finale){
			Webgis.TimeSlider.layer_attuale.data_attuale = Webgis.TimeSlider.layer_attuale.data_iniziale;
		}
		this.goToNextTimeStamp(Webgis.TimeSlider.layer_attuale,1);
	},	
    timesliderPlay: function(btn){
		if(!btn.running){
			//Aggiorno impostazioni bottone play/stop
			btn.running = true;
			btn.setIconCls("x-envigrid-stop");
			
			Webgis.EnviGrid.task = new Ext.util.DelayedTask(function(){
				//Controllo se la prossima data non superi la data finale dello step
				if(Webgis.TimeSlider.layer_attuale.data_attuale >= Webgis.TimeSlider.layer_attuale.data_finale){
					Webgis.TimeSlider.layer_attuale.data_attuale = Webgis.TimeSlider.layer_attuale.data_iniziale;
				}
				
	
			    this.goToNextTimeStamp(Webgis.TimeSlider.layer_attuale,1);

				
			},this);
			
			//Setto sull'evento loadend della mappa la funzione
			// che si occupa di mandare avanti il task (se si e' ancora in play)
			Webgis.TimeSlider.layer_attuale.events.on({
				"loadend": this.taskTimer,
				scope: this
			});
			
			//Eseguo per la prima volta il task in modo fare focus sull'evento loadend
			this.taskTimer(Webgis.TimeSlider.layer_attuale.timerms);
			
		} else {
			//Aggiorno impostazioni bottone play/stop
			btn.running = false;
            btn.setIconCls("x-envigrid-play");
			
			//Annullo l'evento che carica la nuova mappa (delay)
			Webgis.EnviGrid.task.cancel();
			
			Webgis.TimeSlider.layer_attuale.events.un({
				"loadend": this.taskTimer,
				scope: this
			});
		}
		
		//Abilito / disabilito i bottoni in accordo con btn.running
		Ext.getCmp('backward').setDisabled(btn.running);
		Ext.getCmp('forward').setDisabled(btn.running);
		Ext.getCmp('settings').setDisabled(btn.running);
	},
	taskTimer: function(){
		Webgis.EnviGrid.task.delay(Webgis.TimeSlider.layer_attuale.timerms);
	},
    layerswitcherItemClick: function(grid, record, item, idx,e){
		//Se il layer selezionato e' temporale E ancora disponibile nello store (non e' stato rimosso) faccio vedere il TimeSlider, altrimenti lo nascondo
		var recordExist = grid.store.getById(record.getId());

		if(record.data.isTimeLayer && recordExist){
			Webgis.TimeSlider.show();
			this.timesliderInit(record);
            this.setChartMode(record,true);
		} else {
			//Controllo se il TimeSlider sta runnando e in caso lo fermo
			if(Ext.getCmp('play').running){
				this.timesliderPlay(Ext.getCmp('play'));
			}
			Webgis.TimeSlider.hide();
            this.setChartMode(record,false);
		}
	},
	timesliderInit: function(record){
		//Richiamo il layer
		var layer = record.data.map.getLayersBy('id',record.data.id)[0];

		Webgis.TimeSlider.items.get('timeslidertitle').update(layer.name);
        this.printPrettyDate(layer,this.getQueryDate(layer.data_attuale,layer.formato_data));
//		Webgis.TimeSlider.items.get('timesliderinfo').update(this.getQueryDate(layer.data_attuale,layer.formato_data))
		Webgis.TimeSlider.layer_attuale = layer;
	},
    setChartMode:function(record,enable){
        if(this.GetFeatureSelect instanceof OpenLayers.Layer.Vector){
            this.GetFeatureSelect.destroy();
            this.getFeatureControl.deactivate();
            this.getFeatureControl.destroy();
        }
        var l = record.data.map.getLayersBy('id',record.data.id)[0];
        if(l){
            if(l.layer_format == 'v' && enable){
                    this.GetFeatureSelect = new OpenLayers.Layer.Vector("EnviGrid selection", {styleMap:
                        new OpenLayers.Style(OpenLayers.Feature.Vector.style["select"]),
                        displayInLayerSwitcher: false
                    });
                    Webgis.maps[0].addLayers([this.GetFeatureSelect]);

                    var l = record.data.map.getLayersBy('id',record.data.id)[0];

                    this.getFeatureControl = new OpenLayers.Control.GetFeature({
                        protocol: OpenLayers.Protocol.WFS.fromWMSLayer(l),
                        box: false,
                        hover: false,
                        multipleKey: "shiftKey",
                        toggleKey: "ctrlKey"
                    });

                    this.getFeatureControl.events.register("featureselected", this, function(e) {
                        this.GetFeatureSelect.removeAllFeatures();
                        this.GetFeatureSelect.addFeatures([e.feature]);
                        var w = 600;
                        var h = 730;
                        var windowH = Ext.getBody().getViewSize().height;

                        var chartH = Ext.util.Format.round(windowH * 0.8,0);
                        var chartW = Ext.util.Format.round((chartH*w) / h,0);

                        var loadid = Ext.id();

                        Ext.create('Ext.window.Window', {
                            title: 'EnviChart',
                            height: chartH,
                            width: chartW,
                            layout: 'fit',
                            tpl: new Ext.XTemplate(
                                '<p><img src="/plr/execute/{grafico}/{id}/{x}/{y}"></p>'
                            ),
                            data:{
                                grafico: l.grafico,
                                id: e.feature.data.gid,
                                y: chartH - 30,
                                x: chartW - 10,
                                loadid: loadid
                            }
                        }).show();
                    });

                    Webgis.maps[0].addControl(this.getFeatureControl);
                    this.getFeatureControl.activate();
            }
//            else {
//                this.GetFeatureSelect.destroy();
//                this.getFeatureControl.deactivate();
//                this.getFeatureControl.destroy();
//            }
        }
    },
	selectAmbito: function(btn){
		//Aggiorno la variable globale con le informazioni attuale dell'ambito utilizzato;
		Webgis.selezioneEnviGrid = {
			ambito_climatico: btn.ambito_climatico,
			ambito_temporale: btn.ambito_temporale,
			ambito_spaziale: btn.ambito_spaziale
		}
		if(Webgis.config.setup.pk == 0){
			
			
			
		} else {
			//Eseguo la richiesta al DB per ottenere il catalogo relativo
			Ext.Ajax.request({
				url: '/enviro/getcatalog',
				method: 'GET',
				params: {
					ambito_climatico_id: btn.ambito_climatico.pk,
					ambito_temporale_id: btn.ambito_temporale.pk,
					ambito_spaziale_id: btn.ambito_spaziale.pk
				},
				success: function(response, e){
					var r = Ext.decode(response.responseText);
					this.elaboroArrayAmbito(r);
				},
				scope: this
			});



		}

        //Aggiorno il tematismo vettoriale se serve
        if(Webgis.selezioneEnviGrid)

		//Aggiorno il nome nel bottone associato alla EnviGrid						
		var btnBarraNord = Ext.getCmp('envigridchangebtn');
		btnBarraNord.setText(btn.getAmbitoText());		

		//Nascondo EnviGrid
		this.hideEnviGrid();
	},
	elaboroArrayAmbito: function(response){
		var res = []
		
		//Verifico se ci sono elementi
		if(response.length > 0){
			//Ciclo su tutti i record
			for (var idx in response){
				res.push({
					pk: response[idx].pk,
					ambito_climatico: response[idx].fields.ambito_climatico,
					ambito_spaziale: response[idx].fields.ambito_spaziale,
					ambito_temporale: response[idx].fields.ambito_temporale,
					ambito_variabile: response[idx].fields.ambito_variabile,
					step: response[idx].fields.step,
					step_finale: response[idx].fields.step_finale,
					step_iniziale: response[idx].fields.step_iniziale,
					full_codice: response[idx].extras.full_codice,
					full_label: response[idx].extras.full_label,
					icon_url: response[idx].extras.icon_url,
					full_style: response[idx].extras.full_style,
                    geoserver_url: response[idx].extras.geoserver_url,
					timerms: 1000,
					layer_workspace: response[idx].fields.layer_workspace,
					full_values: response[idx].extras.full_values,
					full_colour: response[idx].extras.full_colour,
                    grafico: response[idx].fields.grafico
				});
			}
			
			//Fine ciclo aggiorno lo store
			var st = this.getStore('enviro.CatalogStore');
			st.loadData(res);
			
		} else {
			var st = this.getStore('enviro.CatalogStore');
			st.loadData([]);
		}
	},
    onPanelRendered: function(){
        starter.applyText('Rendering envigrid panel...');
		//Creo la finestra con la griglia
		var window = new Webgis.view.enviro.EnviGrid({
			north: {
				xtype: 'envigridinformation'
			},
			center: {
				xtype: 'envigriddashboard'
			},
			listeners: {
				'hide': this.hideEnviGrid
			}
		});
		Webgis.EnviGrid = window;
		
		//Creo il bottone sulla barra north per richiamare in futuro la griglia
		var wn = Ext.getCmp('webgisnorth');
		wn.add({
            xtype: 'container',
            componentCls: 'x-envigrid-button',
            html: '<div>EnviGrid <br/> information</div>'
        },{
				xtype: 'button',
				scale: 'medium',
                componentCls: 'x-envigrid-button',
				style: 'z-index: 500002;margin: 5px;',
				id: 'envigridchangebtn',
				text: 'Select EnviGrid <br/> item',
                handler: function(btn){
                    if(!Webgis.EnviGrid.isVisible()){
                        Webgis.EnviGrid.show();
                        btn.setText("Select EnviGrid <br/> item");
                    }
                }
			})

		//Aggiungo il bottone nel catalogpanel che rappresenta il catalogo delle variabili
		var cview = Ext.create('Ext.view.View', {
				//~ deferInitialRefresh: false,
				store: this.getStore('enviro.CatalogStore'),
				tpl: new Ext.XTemplate(
					'<tpl for=".">',
						'<div class="item">',
							'<tpl if="icon_url==\'\'">',
								'<div>Preview non disponibile</div>',
							'</tpl>',
							'<tpl if="icon_url!=\'\'">',
								'<div><img src="{icon_url}" /></div>',
							'</tpl>',
							'<h3>{full_label}</h3>',
						'</div>',
					'</tpl>'
				),

				plugins : [
					//~ Ext.create('Ext.ux.DataView.Animated', {
						//~ duration  : 550,
						//~ idProperty: 'id'
					//~ })
				],

				itemSelector: 'div.item',
				overItemCls : 'item-hover',
				multiSelect : false,
				autoScroll  : true,
				listeners: {
					itemclick: {
						fn: function(view,record,el){
							if(el.id){
								Ext.get(el.id).frame("#DFE9F6");
							}
							
							view.up('menu').hide();
							this.addLayerToMap(record)
						},
						scope: this
					}
				}
			})
			
		//Aggiungo alla barra nordh il panello TimeSlider per le operazioni nel tempo (play, stop, goto)
		Webgis.TimeSlider = Ext.create('Webgis.view.enviro.TimeSlider');
		wn.add(Webgis.TimeSlider)
		
		//Aggiungo al pannello del Catalogo il bottone delle variabili!
		var catalogPanel = Ext.getCmp('catalogpanel');
		catalogPanel.add({
			xtype: 'catalogbutton',
			text: 'Variable',
			iconCls: 'x-catalogpanel-variable',
			catalogview: cview
		})

		this.showEnviGrid();
	},
	showEnviGrid: function(){
		Webgis.EnviGrid.show();
				
		var wc = Ext.getCmp('webgiscenter');
		wc.addListener('afterlayout',this.syncDimensione,window);
	},
	hideEnviGrid: function(){
		Webgis.EnviGrid.hide();
		
		//Rimuovo il listeners che aggiorna le dimensioni
		var wc = Ext.getCmp('webgiscenter');
		wc.removeListener('afterlayout',this.syncDimensione,Webgis.EnviGrid);
		
		//Aggiorno EnviGridBtn sull'interfaccia
	},
	syncDimensione: function(wc){
		Webgis.EnviGrid.setWidth(wc.getWidth());
		Webgis.EnviGrid.setHeight(wc.getHeight());
        Webgis.EnviGrid.setPosition(wc.getPosition()[0],wc.getPosition()[1],true);
	},
	addLayerToMap: function(record){
		var map = Webgis.maps[0];
		
		
		//Var locale con il label e il codice del layer
		var layer_label = record.data.full_label;
		var layer_workspace = record.data.layer_workspace
		var layer_codice = record.data.full_codice;
		
		//Var locale con lo stile
		var style = record.data.full_style;
		
		//Var locale con le impostazioni del layer;
		var layer_format = Webgis.selezioneEnviGrid.ambito_spaziale.fields.formato_layer;
		
		//Var locale con le informazione del tempo
		var step_iniziale = record.data.step_iniziale;
		var step_finale = record.data.step_finale;
		var step = record.data.step;

		//Unisco i due formati della data (cambiano in base a layer raster / vector)
		var formato_data = Webgis.selezioneEnviGrid.ambito_temporale.fields.formato_data;
        var codice_climatico = Webgis.selezioneEnviGrid.ambito_climatico.fields.codice;
        var label_climatico = Webgis.selezioneEnviGrid.ambito_climatico.fields.label;

		//Costruisco l'oggetto data come specificato dalla configurazione dell'EnviGrid
		var data_iniziale = new Date(step_iniziale);
		var data_finale = new Date(step_finale);
		switch (Webgis.selezioneEnviGrid.ambito_temporale.fields.codice){
			case 'y':
				var data_step_type = Ext.Date.YEAR;
			break;
			case 'm':
				var data_step_type = Ext.Date.MONTH;
			break;
			case 'd':
				var data_step_type = Ext.Date.DAY;
			break;
		}
		
		//Inizializzo la data iniziale (attuale) che verra poi usata nei cicli
		var data_attuale = new Date(step_iniziale);
		
		//Preparo le informazioni per chiamare il layer attuale con la data di default (prima data disponibile partendo dallo step_inziale)
		var query_date_str = this.getQueryDate(data_attuale,formato_data);
		var layer_name = this.getQueryLayer(layer_workspace,layer_codice);
		
		//Setting dei parametri per il WMS GetMap 
		var p = {
			format: 'image/png',
			transparent: true,
            EXCEPTIONS: "application/vnd.ogc.se_inimage"
		}
		//Aggiungo il parametro per il TIME (corretamente a seconda di vector/raster)
		var params = this.setQueryTimeParams(p,layer_format,layer_name,style,query_date_str);

		//Setting per l'oggetto OpenLayers.Layers
		var options = {
			unsupportedBrowsers: [],
			isBaseLayer: false,
            tileOptions: {maxGetUrlLength: 1024},
			style_url: null,
			displayInLayerSwitcher: true,
			visibility: true,
			projection: map.projection,
			data_attuale: data_attuale,
			data_iniziale: data_iniziale,
			data_finale: data_finale,
			data_step_type: data_step_type,
			data_step: step,
			data_iniziale_bk: data_iniziale,
			data_finale_bk: data_finale,
			formato_data: formato_data,
			layer_format: layer_format,
            codice_climatico: codice_climatico,
            label_climatico: label_climatico,
			singleTile: true,
            transitionEffect: "resize",
			isTimeLayer: true,
			styles: style,
            grafico: record.data.grafico,
			values: record.data.full_values,
			colour: record.data.full_colour,
			layer_name: layer_name,
			timerms: 1000,
			opacity: 1
			//~ buffer: layer.fields.buffer,
			//~ tileSize: new OpenLayers.Size(layer.fields.tile_size,layer.fields.tile_size)
		}
		//Creo oggetto layer
		var l = new OpenLayers.Layer.WMS(layer_label,
			record.data.geoserver_url,
			params,
			options
		);
		
		//Aggiungo l'oggetto layer alla corrispettiva mappa
		map.addLayer(l);

        if(layer_format == "v"){


        }

	},
	getQueryLayer: function(layer_workspace,layer_name){
		//Se il workspace non e' nullo lo imposto nel nome del layer da chiamare
		if(layer_workspace!=''){
			var res = [layer_workspace, layer_name].join(":");
		} else {
			var res = layer_name;
		}
		return res;
	},
	getQueryDate: function(date,format){
		 var queryDate = Ext.Date.format(date,format);
		 return Webgis.selezioneEnviGrid.ambito_spaziale.fields.formato_data + queryDate;
	},
	setQueryTimeParams: function(params,layer_format,layer_name,styles,query_date){
		
		if(layer_format == "v"){
//            var styleUp = styles;
//			params.SLD_BODY = styleUp.replace(/~~DATA~~/g,query_date);
            params.TIME = query_date;
            params.STYLES = styles;
            params.LAYERS =  layer_name;

		} else {
			params.TIME = query_date;
			params.STYLES = styles;
			params.LAYERS =  layer_name;
		}

		return params;
	},
	goToNextTimeStamp: function(layer,segno){
		
		//Ottengo la nuova data aggiungeno lo step corrispondente moltiplicato per il segno
		//cosi da poter chiedere la mappa sucessiva segno=1, o quella precedente segno=-1 
		var dAttuale = Ext.Date.add(layer.data_attuale,layer.data_step_type,layer.data_step*segno);
		//Trasformo la data in stringa da inviare come query al geoserver
		var query_date = this.getQueryDate(dAttuale,layer.formato_data);
		//Aggiorno i parametri del layer
		layer.params = this.setQueryTimeParams(layer.params, layer.layer_format,layer.layer_name,layer.styles,query_date);
		//Aggiorno la data_attuale del layer con quella nuova
		layer.data_attuale = dAttuale;
		//Redraw del layer
		layer.redraw();
		
		//Aggiorno la data visualizzata su interfaccia
//		Webgis.TimeSlider.items.get('timesliderinfo').update(query_date);
        this.printPrettyDate(layer,query_date);
	},
    goToSpecificTimeStamp: function(layer,data){
        var query_date = this.getQueryDate(data,layer.formato_data);
        //Aggiorno i parametri del layer
        layer.params = this.setQueryTimeParams(layer.params, layer.layer_format,layer.layer_name,layer.styles,query_date);
        //Aggiorno la data_attuale del layer con quella nuova
        layer.data_attuale = data;
        //Redraw del layer
        layer.redraw();

        //Aggiorno la data visualizzata su interfaccia
//        Webgis.TimeSlider.items.get('timesliderinfo').update(query_date);
        this.printPrettyDate(layer,query_date);
    },
    printPrettyDate: function(layer,date){
        if(layer.codice_climatico != 'p'){
            var date = "[" + layer.label_climatico + "]<br/>" + Ext.Date.format(new Date(date),'m') + "-" + Ext.Date.format(new Date(date),'d')
            Webgis.TimeSlider.items.get('timesliderinfo').update(date);
        } else {
            Webgis.TimeSlider.items.get('timesliderinfo').update(date);
        }

    }
});
