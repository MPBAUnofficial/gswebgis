Ext.define('Webgis.controller.enviro.EnviClimaDashboard', {
    extend: 'Ext.app.Controller',

    views: [
        'enviro.EnviClimaDashboard',
        'enviro.EnviClimaStazioni',
        'enviro.EnviClimaPanel'
    ],

    stores: [
        'enviro.StazioniStore',
        'enviro.StagionaliPgrd',
        'enviro.Stagionali',
        'enviro.Mensili',
        'enviro.MensiliPgrd',
        'enviro.Winkler'
    ],
    models: [
        'enviro.StazioniModel',
        'enviro.StagionaliModel',
        'enviro.MensiliModel',
        'enviro.WinklerModel'
    ],

    refs: [{
        ref: "climadashboard",
        selector: "enviclimadash"
    },{
        ref: "climacenter",
        selector: 'enviclimadash > container[region="center"]'
    }],

    init: function() {

        this.control({
            '#webgiscenter': {
                afterlayout: {
                    fn:this.onPanelRendered,
                    scope: this,
                    single:true
                }
            },
            '#enviclimadash':{
                click: {
                    fn: this.onClick,
                    scope: this
                }
            },
            'enviclimapanel button[type="stagionali"]':{
                click: {
                    fn: this.viewGraficoStagionale,
                    scope: this
                }
            },
            'enviclimapanel button[type="winkler"]':{
                click: {
                    fn: this.viewGraficoWinkler,
                    scope: this
                }
            },
            'enviclimapanel button[type="tabella"]':{
                click: {
                    fn: this.viewTabella,
                    scope: this
                }
            },
            'enviclimastazioni': {
                itemclick: {
                    fn: this.updateChart,
                    scope: this
                }
            }
        });


    },
    onPanelRendered: function(){
        starter.applyText('Rendering envigrid dashboard...');
        //Creo il bottone sulla barra north per richiamare in futuro la griglia
        var wn = Ext.getCmp('webgisnorth');
        wn.add({
            xtype: 'button',
            scale: 'medium',
            componentCls: 'x-envigrid-button',
            style: 'z-index: 500002;margin: 5px;',
            id: 'enviclimadash',
            text: 'EnviClima Dashboard'
        })


    },
    onClick: function(){
        var stazioniGrid = Ext.create('Webgis.view.enviro.EnviClimaStazioni',{
           store: this.getEnviroStazioniStoreStore()
        });
        var buttonPanel = Ext.create('Webgis.view.enviro.EnviClimaPanel');

        Ext.create('Webgis.view.enviro.EnviClimaDashboard',{
            climaPanel: buttonPanel,
            stazioniGrid: stazioniGrid
        })
    },
    viewGraficoStagionale: function(){
        var tgrdStore = this.getEnviroStagionaliStore();
        var tgrdGrafico = Ext.create("Webgis.view.enviro.StagionaliChart",{
            store: tgrdStore,
            axesTitle: "Average temperatures"
        })
        var pgrdStore = this.getEnviroStagionaliPgrdStore();
        var pgrdGrafico = Ext.create('Webgis.view.enviro.StagionaliChart',{
            store: pgrdStore,
            axesTitle: "Accumulated rainfall"
        })

        this.updateClimaCenter([tgrdGrafico,pgrdGrafico]);
    },
    viewGraficoWinkler: function(){
        var tgrdStore = this.getEnviroWinklerStore();
        var tgrdGrafico = Ext.create("Webgis.view.enviro.WinklerChart",{
            store: tgrdStore
        })
        this.updateClimaCenter(tgrdGrafico);
    },
    viewTabella: function(){
        var store = this.getEnviroMensiliStore();
        var grid = Ext.create("Webgis.view.enviro.MensiliGrid",{
            store: store
        })
        this.updateClimaCenter(grid);
    },
    updateClimaCenter: function(newcp){
        cn = this.getClimacenter()

        //Cancello tutti i componenti (eccetto la barra dei btn!)
        cn.items.each(function(i){
            if(!(i instanceof Webgis.view.enviro.EnviClimaPanel)){
                i.destroy();
            }
        })

        cn.add(newcp);
    },
    updateChart: function(view,record){
        var myMask = new Ext.LoadMask(this.getClimacenter(), {msg:"Please wait..."});
        myMask.show();
        Ext.Ajax.request({
            url: '/enviro/computestat',
            method: 'GET',
            params: {
                stazione_id: record.data.id,
                ambito_climatico: Webgis.selezioneEnviGrid.ambito_climatico.fields.nome_cartella_temperature
            },
            success: function(response, e){
                var r = Ext.decode(response.responseText);
                this.getEnviroStagionaliStore().loadData(r.data.stagionit);
                this.getEnviroStagionaliPgrdStore().loadData(r.data.stagionip);
                this.getEnviroMensiliStore().loadData(r.data.mesi);
                this.getEnviroWinklerStore().loadData(r.data.winklert);
                st = this.getEnviroMensiliStore();
                myMask.destroy();
            },
            failure: function(){
                myMask.destroy();
                Ext.MessageBox.alert('Error', 'Could not complete the operation due to technical problems.');
            },
            scope: this
        });
    }
});