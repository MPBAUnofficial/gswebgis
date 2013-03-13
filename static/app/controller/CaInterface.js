Ext.define('Webgis.controller.CaInterface', {
    extend: 'Ext.app.Controller',

    require: [],

    views: [
        'CaAmbitoGeo',
        'CaAmbitoSex',
        'CaAmbitoEta',
        'CaAmbitoSede',
        'CaSae'
    ],

    refs: [{
        // A component query
        selector: '#webgisnorth > panel > caambitogeo',
        ref: 'geo'
    },{
        // A component query
        selector: '#webgisnorth > panel > caambitosex',
        ref: 'sex'
    },{
        // A component query
        selector: '#webgisnorth > panel > caambitoeta',
        ref: 'eta'
    },{
        // A component query
        selector: '#webgiswestfn > caambitosede',
        ref: 'sede'
    }],

    stores: [
//        'CaTreePanel'
    ],
    models: [
//        'CaTreePanel'
    ],

    maps: null,

    init: function() {

        this.maps = Webgis.maps;
        this.control({
            '#webgiscenter': {
                afterlayout: {
                    fn:this.onPanelRendered,
                    scope: this,
                    single:true
                }
            },
            'caambitogeo':{
                change: {
                    fn: this.onClick,
                    scope: this
                }
            },
            'caambitosex':{
            change: {
                fn: this.onClick,
                    scope: this
            }
            },
            'caambitoeta':{
                change: {
                    fn: this.onClick,
                    scope: this
                }
            },
            'caambitosede':{
                checkchange: {
                    fn: this.onCheckChange,
                    scope: this
                }
            },
            'casae':{
                click: {
                    fn: this.addSae,
                    scope: this
                }
            }
        });


    },
    onPanelRendered: function(){

        //Creo il bottone sulla barra north per richiamare in futuro la griglia
        var wn = Ext.getCmp('webgisnorth');
        var ww = Ext.getCmp('webgiswestfn');

        var wwtb = ww.down('toolbar');
//        wn.add(
//            this.getCaAmbitoGeoView(),
//            this.getCaAmbitoSexView(),
//            this.getCaAmbitoEtaView(),
//            {
//                xtype: 'container',
//                baseCls: 'pippo',
//                items: [this.getCaSaeView()]
//            }
//
//        )
        wn.add({
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items:[
                this.getCaAmbitoGeoView(),
                this.getCaAmbitoSexView(),
                this.getCaAmbitoEtaView(),
                this.getCaSaeView()
            ]
        })

        //DA NON USARE BISOGNA PERFEZIONARE LA CLASSE
        wwtb.add({
            text: 'CA-TN',
            card_id: ww.getNewCardId(),
            scale: 'medium',
            toggleGroup: ww.group_id,
            overCls: 'x-functionpanel-button-over',
            pressedCls: 'functionpanel-button-pressed',
            focusCls: 'x-function-button-pressed',
            cls: 'x-functionpanel-button'
        })
        ww.add(
            //Ext.create('Webgis.view.CaAmbitoSede')
            this.getCaAmbitoSedeView()
        )

    },
    onClick: function(field,nv,oldv){
        var sede = this.getSede().getChecked();
        if (sede.length > 0){
            for(var i = 0; i < sede.length; i++){
                this.updateLayer(this.maps[0],sede[i].getData())
            }

        }
    },
    onCheckChange: function(node,ischecked){
        if(node.isLeaf()){
            if(ischecked){
                this.addIndiToMap(this.maps[0],node.getData());
            } else {
                this.rmIndiFromMap(this.maps[0],node.getData());
            }
        }
    },
    getAllChecked: function(){
        geo = this.getGeo();
        eta = this.getEta();
        sex = this.getSex();
        return {
            geo: geo.getChecked()[0],
            eta: eta.getChecked(),
            sex: sex.getChecked()[0]
        }
    },
    updateLayer: function(m,nd){
        var ambitiSelezionati = this.getAllChecked();
        var layer_style = this.getLayerStyle(nd,ambitiSelezionati);
        var unique_id = this.getUniqueId(nd);
        l = m.getLayersBy('uniqueid',unique_id);
        l[0].mergeNewParams({
            STYLES: layer_style
        })
    },
    addSae: function(m,nd){
        var r = [];
        var m = this.maps[0];
        var sede = this.getSede().getChecked();
        geo = this.getGeo().getChecked()[0];
        if (sede.length > 0){
            for(var i = 0; i < sede.length; i++){
                var n = sede[i].getData()
                var unique_id = this.getUniqueId(n);
                l = m.getLayersBy('uniqueid',unique_id);
                r.push(n.layer_name,'sae',geo.getSubmitValue(), n.sede, n.anno);
                l[0].mergeNewParams({
                    LAYERS: r.join("_")
                })
            }

        }
    },
    addIndiToMap: function(m,nd){
        //m mappa, nd nodedata

        //Var locale con il label e il codice del layer
        var ambitiSelezionati = this.getAllChecked();
        var layer_name = this.getLayerName(nd,ambitiSelezionati);
        var layer_label = this.getLayerLabel(nd,ambitiSelezionati);
        var layer_style = this.getLayerStyle(nd,ambitiSelezionati);
        var layer_url = nd.geourl;

        //Var locale con lo stile
        var style = nd.style;


        //Setting dei parametri per il WMS GetMap
        var params = {
            styles: layer_style,
            layers:  layer_name,
            format: 'image/png',
            transparent: true
        }

        //Setting per l'oggetto OpenLayers.Layers
        var options = {
            isBaseLayer: false,
            displayInLayerSwitcher: true,
            visibility: true,
            projection: m.projection,
            singleTile: true,
            opacity: 1
            //~ buffer: layer.fields.buffer,
            //~ tileSize: new OpenLayers.Size(layer.fields.tile_size,layer.fields.tile_size)
        }
        //Creo oggetto layer
        l = new OpenLayers.Layer.WMS(layer_label,
            layer_url,
            params,
            options
        );
        l.addOptions({
            uniqueid: this.getUniqueId(nd)
        })

        //Aggiungo l'oggetto layer alla corrispettiva mappa
        m.addLayer(l);
    },
    rmIndiFromMap: function(m,nodedata){
        l = m.getLayersBy('uniqueid',this.getUniqueId(nodedata));
//      Mi aspetto che sia sempre solo un layer
        l[0].destroy()
    },
    getLayerName: function(n,ambiti){
        //Se il workspace non e' nullo lo imposto nel nome del layer da chiamare
        var r = [];
        r.push(n.layer_name, ambiti.geo.getSubmitValue(), n.sede, n.anno);

        if(n.workspace!=''){
            var res = [n.workspace, r.join("_")].join(":");
        } else {
            var res = r.join("_");
        }
        console.log(res);
        return res;
    },
    getLayerLabel: function(n,ambiti){
        //Se il workspace non e' nullo lo imposto nel nome del layer da chiamare
        var r = [];
        r.push(n.text, 'per', ambiti.geo.boxLabel, 'per', n.sede);

        var res = r.join(" ");

        return res;
    },
    getLayerStyle: function(n,ambiti){
        //Se il workspace non e' nullo lo imposto nel nome del layer da chiamare

        var res = [];

//        for (var i = 0; i < ambiti.eta.length; i++){
//            var r = [];
//            var eta = ambiti.eta[i].getSubmitValue();
//            if(eta == 'tot' & ambiti.sex.getSubmitValue() == 'tot'){
//                r.push('totale_casi');
//                res.push(r.join(""));
//            } else if (eta == 'tot') {
//                r.push('tot',ambiti.sex.getSubmitValue());
//                res.push(r.join("_"));
//            } else {
//                r.push('e',eta,ambiti.sex.getSubmitValue());
//                res.push(r.join(""));
//            }
//        }
//        3 = nomeindi
//        2 = classe
//        1 = livello geo
//        0 = sex
        for (var i = 0; i < ambiti.eta.length; i++){
            var r = [];
            var eta = ambiti.eta[i].getSubmitValue();
            if(eta == 'tot' & ambiti.sex.getSubmitValue() == 'tot'){
                r.push(n.layer_name,'totale_casi',ambiti.geo.getSubmitValue());
                res.push(r.join("_"));
            } else if (eta == 'tot') {
                r.push(n.layer_name,eta,ambiti.sex.getSubmitValue(),ambiti.geo.getSubmitValue());
                res.push(r.join("_"));
            } else {
                r.push(n.layer_name,'e'+eta+ambiti.sex.getSubmitValue(),ambiti.geo.getSubmitValue());
                res.push(r.join("_"));
            }
        }
//        if(sel[2]=='tot' & sel[0]=='tot'){
//            style = sel[3][0].replace('_sae','') + '_totale_casi' + '_' +sel[1];
//        } else if (sel[2]=='tot') {
//            style = sel[3][0].replace('_sae','')  + '_' + sel[2] + '_' + sel[0] + '_' +sel[1];
//        } else {
//            style = sel[3][0].replace('_sae','')  + '_e' + sel[2] + sel[0] + '_' +sel[1];
//        }

        console.log(res.join("+"));
        return res.join("+");
    },
    getUniqueId:function(nodedata){
        return 'caIndi' + nodedata.id;

    }
});