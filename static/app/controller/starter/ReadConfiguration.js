Ext.define('Webgis.controller.starter.ReadConfiguration', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.data.NodeInterface'],

    init: function() {

        starter = new Ext.create('Webgis.class.ChangeStarterStatus',
		{
			text: 'Read configuration...'
		});
		
		this.readConfiguration();
    },
    
    readConfiguration: function(){
		//Creo la struttura nella applicazione Webgis per ospitare le configurazioni
		Webgis.config = {
			setup: null,
			maps: [],
			config: null,
			catalogs: {
				base: [],
				dati: []
			},
			westpanel: [],
			information: null,
			ambito: {
				spaziale: [],
				climatico: [],
				temporale: []
			}
		}
		
		//Popolo la struttura
		Ext.Array.each(webgisconfig,function(item,index,webgisconfigItSelf){
			switch(item.model){
				case 'setup.webgis':
				   Webgis.config.setup = item;
				break;
				case 'setup.map':
					Webgis.config.maps.push(item);
				break;
				case 'setup.config':
					Webgis.config.config = item;
                    //COSTANTI
//                    Webgis.config.GEODOCS_URL = '/geolocal/wfs?';
//                    Webgis.config.GEODOCS_URL_PREVIEW = 'http://enviro.fbk.eu/geoserver/land/wms?';
//                    Webgis.config.TOPONIMI_URL = 'http://inail.fbk.eu/geoserver/wms?';
//                    Webgis.config.TOPONIMI_LAYER_NAME = 'inail:toponimi';
                    Webgis.config.GEODOCS_URL = '/geoserver/wfs?';
                    Webgis.config.GEODOCS_URL_PREVIEW = 'https://inail.fbk.eu/geoserver/wms?';
                    Webgis.config.TOPONIMI_URL = 'https://enviro.fbk.eu/geoserver/land/wms?';
                    Webgis.config.TOPONIMI_LAYER_NAME = 'mpba:top010ent';
				break;
				case 'setup.contextualinfo':
					//ristrutturo meglio l'oggetto informazioni per comodita di utilizzo nell Ext.XTemplate
					var info = {
						title: item.fields.title,
						descrizione: item.fields.descrizione,
						body: item.fields.body
					}
					Webgis.config.information = info;
					
					//Aggiungo l'informazione manualemente nella sezione westpanel (In futuro potrebbe esserci una tabella che rappresenta ogni panello con le funzioni associate)
					//if (item.fields.render_to === 'webgiswest'){
						Webgis.config.westpanel.push({
							classe: 'Webgis.view.function.Information',
							name_btn: 'Info',
							options_btn: {
								pressed: true
							},
							options_obj: {
								alfa: true
							}
						});
					//}
				break;
				case 'envigrid.ambitoclimatico':
					Webgis.config.ambito.climatico.push(item);
				break;
				case 'envigrid.ambitospaziale':
					Webgis.config.ambito.spaziale.push(item);
				break;
				case 'envigrid.ambitotemporale':
					Webgis.config.ambito.temporale.push(item);
				break;
				case 'setup.catalogobase':
					Webgis.config.catalogs.base.push({
						pk: item.pk,
						buffer: item.fields.buffer,
						geoserver_url: item.fields.geoserver_url,
						geoserver_workspace: item.fields.geoserver_workspace,
						name_layer: item.fields.name_layer,
						style: item.fields.style,
						text: item.fields.text,
						preview: item.fields.preview
					});
				break;
				case 'setup.catalogodatiw':
					Webgis.config.catalogs.dati.push({
						pk: item.pk,
						buffer: item.fields.buffer,
						geoserver_url: item.fields.geoserver_url,
						geoserver_workspace: item.fields.geoserver_workspace,
						name_layer: item.fields.name_layer,
						style: item.fields.style,
						text: item.fields.text,
						preview: item.fields.preview
					});
				break;
			}
		});

//        Webgis.config.westpanel.push({
//                classe: 'Webgis.view.LayerSwitcherPanel',
//                name_btn: 'Switch',
//                options_btn:{pressed: false},
//                options_obj: {alfa: true}
//        });


        //TODO: le informazioni del pybab non dovrebbero essere messe qui!
       var md =  Ext.create('Webgis.model.GeotreeCatalogLayer');
       Ext.data.NodeInterface.decorate(md);
       var st = Ext.create('Webgis.store.GeotreeCatalogLayer',{
           model: 'Webgis.model.GeotreeCatalogLayer'
       });

       Webgis.config.westpanel.push({
           classe: 'Webgis.view.function.TreePanelLayer',
           name_btn: 'Mappe',
           options_btn:{pressed: false},
           options_obj: {
               alfa: true,
               store: st
           }
       });

//       var md1 =  Ext.create('Webgis.model.GeotreeCatalogStatistical');
//       Ext.data.NodeInterface.decorate(md1);
//       var st1 = Ext.create('Webgis.store.GeotreeCatalogStatistical',{
//           model: 'Webgis.model.GeotreeCatalogStatistical'
//       });
//
//       Webgis.config.westpanel.push({
//           classe: 'Webgis.view.function.TreePanelStatistical',
//           name_btn: 'Dati',
//           options_btn:{pressed: false},
//           options_obj: {
//               alfa: true,
//               store: st1
//           }
//       });



		//Pulisco la vecchia variabile che ora non serve piu 
		//~ delete webgisconfig
	}
});
