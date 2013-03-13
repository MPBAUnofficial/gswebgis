Ext.define('Webgis.view.function.GeoDocs', {
    extend: 'Ext.form.Panel',
    alias : 'widget.geodocs',

    border: false,
    frame: true,

    width: 250,

    title: 'Aggiungi una segnalazione',

    layout: 'anchor',
    defaults: {
        anchor: '95%'
    },

    MAXUPLOAD: 5,

    olMap: Webgis.maps[0],

    defaultType: 'textfield',

    autoScroll: true,

    items: [{
        name: 'csrfmiddlewaretoken',
        xtype: 'hiddenfield',
        value:  Ext.util.Cookies.get('csrftoken'),
        allowBlank: false
    },{
        xtype: 'displayfield',
        hideLabel: true,
        name: 'home',
        margin: '0 0 15 0',
        value: 'Per inviare una segnalazione é sufficiente completare i seguenti campi. Per una migliore georeferenziazione e\' necessario selezionare un punto dalla mappa oltre ad completare il campo indirizzo.'
    },{
        fieldLabel: 'Importanza',
        xtype: 'combobox',
        store: Ext.create('Ext.data.Store',{
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"1", "name":"Poco importante"},
                {"abbr":"2", "name":"Mediamente importante"},
                {"abbr":"3", "name":"Importante"},
                {"abbr":"4", "name":"Molto importante"},
                {"abbr":"5", "name":"Estremamente importante"}
            ]
        }),
        labelAlign: "top",
        queryMode: 'local',
        displayField: 'name',
        valueField: 'abbr',
        name: 'degree',
        allowBlank: false
    },{
        fieldLabel: 'Topic',
        xtype: 'combobox',
        store: Ext.create('Ext.data.Store',{
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"water", "name":"Acqua"},
                {"abbr":"cultivation", "name":"Cultura"},
                {"abbr":"environment", "name":"Ambiente"},
                {"abbr":"soil", "name":"Suolo"}
            ]
        }),
        labelAlign: "top",
        queryMode: 'local',
        displayField: 'name',
        valueField: 'abbr',
        name: 'topic',
        allowBlank: false
    },{
        fieldLabel: 'Indirizzo',
        labelAlign: "top",
        name: 'address',
        allowBlank: false
    },{
        fieldLabel: 'Lon/Lat segnalazione',
        labelAlign: "top",
        id: 'geodocs-lonlat',
        name: 'punto',
        disabled: false,
        emptyText: "Selezionare un punto sulla mappa...",
        allowBlank: false
    },{
        fieldLabel: 'lon',
        labelAlign: "top",
        id: 'geodocs-lon',
        xtype: 'hiddenfield',
        name: 'lon',
        allowBlank: false
    },{
        fieldLabel: 'lat',
        labelAlign: "top",
        id: 'geodocs-lat',
        xtype: 'hiddenfield',
        name: 'lat',
        allowBlank: false
    },{
        fieldLabel: 'images-TOTAL_FORMS',
        name: 'images-TOTAL_FORMS',
        xtype: 'hiddenfield',
        value: 1,
        allowBlank: false
    },{
        fieldLabel: 'images-INITIAL_FORMS',
        name: 'images-INITIAL_FORMS',
        xtype: 'hiddenfield',
        value: 0,
        allowBlank: false
    },{
        fieldLabel: 'images-MAX_NUM_FORMS',
        name: 'images-MAX_NUM_FORMS',
        xtype: 'hiddenfield',
        value: "",
        allowBlank: false
    },{
        fieldLabel: 'Immagine',
        name: 'images-0-image',
        labelAlign: "top",
        xtype: 'filefield',
        allowBlank: false
    },{
        name: 'images-1-image',
        labelAlign: "top",
        hidden: true,
        hideLabel: true,
        xtype: 'filefield',
        allowBlank: true
    },{
        name: 'images-2-image',
        labelAlign: "top",
        hidden: true,
        hideLabel: true,
        xtype: 'filefield',
        allowBlank: true
    },{
        name: 'images-3-image',
        labelAlign: "top",
        hidden: true,
        hideLabel: true,
        xtype: 'filefield',
        allowBlank: true
    },{
        name: 'images-4-image',
        labelAlign: "top",
        hidden: true,
        hideLabel: true,
        xtype: 'filefield',
        allowBlank: true
    },{
        text: 'Aggiungi fotografie',
        idx: 1,
        handler: function() {
            var name = Ext.String.format('filefield[name=images-{0}-image]', this.idx);
            var form = this.up("form");
            var tot = this.prev("hiddenfield[name=images-TOTAL_FORMS]");
            var field = this.prev(name);

            field.setVisible(true);
            this.idx++;
            if(this.idx == form.MAXUPLOAD){
                this.setDisabled(true);
            }
            tot.setValue(this.idx);
        },
        xtype: 'button'
    },{
        fieldLabel: 'docs-TOTAL_FORMS',
        name: 'docs-TOTAL_FORMS',
        xtype: 'hiddenfield',
        value: 0,
        allowBlank: false
    },{
        fieldLabel: 'docs-INITIAL_FORMS',
        name: 'docs-INITIAL_FORMS',
        xtype: 'hiddenfield',
        value: 0,
        allowBlank: false
    },{
        fieldLabel: 'docs-MAX_NUM_FORM',
        name: 'docs-MAX_NUM_FORM',
        xtype: 'hiddenfield',
        value: "",
        allowBlank: false
    },{
        fieldLabel: 'Documenti da allegare',
        name: 'docs-0-doc',
        xtype: 'filefield',
        hidden: true,
        labelAlign: "top",
        value: "",
        allowBlank: true
    },{
        name: 'docs-1-doc',
        xtype: 'filefield',
        hidden: true,
        hideLabel:true,
        labelAlign: "top",
        value: "",
        allowBlank: true
    },{
        name: 'docs-2-doc',
        xtype: 'filefield',
        hidden: true,
        hideLabel:true,
        labelAlign: "top",
        value: "",
        allowBlank: true
    },{
        name: 'docs-3-doc',
        xtype: 'filefield',
        hidden: true,
        hideLabel:true,
        labelAlign: "top",
        value: "",
        allowBlank: true
    },{
        name: 'docs-4-doc',
        xtype: 'filefield',
        hidden: true,
        hideLabel:true,
        labelAlign: "top",
        value: "",
        allowBlank: true
    },{
        text: 'Aggiungi documenti',
        idx: 0,
        handler: function() {
            var name = Ext.String.format('filefield[name=docs-{0}-doc]', this.idx);
            var form = this.up("form");
            var tot = this.prev("hiddenfield[name=docs-TOTAL_FORMS]");
            var field = this.prev(name);

            field.setVisible(true);
            this.idx++;
            if(this.idx == form.MAXUPLOAD){
                this.setDisabled(true);
            }
            tot.setValue(this.idx);
        },
        xtype: 'button'
    }],

    dockedItems: [{
        text: 'Invia',
        dock: 'bottom',
        componentCls: 'x-base-return-button',
        xtype: 'button',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: '/geodocs/new/',
                    scope: this,
                    waitMsg: 'Invio segnalazione in corso...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Segnalazione avvenuta', 'La Sua segnalazione e\' stata correttamente inserita. <br/> Grazie.');
                        this.up('form').resetAll();
                    },
                    failure: function(fp, o) {
                        Ext.Msg.alert('Errore', 'Siamo spiacenti ma in seguito ad un errore imprevisto non e\' stato possibile aggiugnere la Sua segnalazione');
                        this.up('form').resetAll();
                    }
                });
            }
        }
    },{
        text: "Seleziona punto",
        xtype: "button",
        dock: 'bottom',
        getmouse: true,
        componentCls: 'x-base-return-button',
        enableToggle: true
    }],
	
    initComponent: function() {
        this.markerslayer = new OpenLayers.Layer.Markers("Markers 2",{displayInLayerSwitcher:false});
        var size = new OpenLayers.Size(15,24);
        var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
        this.icon = new OpenLayers.Icon("/static/resources/images/icons/getmouseposition25.png", size, offset);

        this.control = new OpenLayers.Control.Click({
            handlerOptions: {
                "single": true,
                "ref": this
            },
            fn: this.updateInfoPanel
        })
        this.olMap.addControl(this.control);

        this.callParent(arguments);
    },
    updateInfoPanel: function(e){
        var latlon = this.handlerOptions.ref.olMap.getLonLatFromPixel(e.xy);
        var latlon4326 = latlon.clone().transform("EPSG:32632","EPSG:4326")

        var latcp = Ext.getCmp("geodocs-lat");
        var loncp = Ext.getCmp("geodocs-lon");
        var latloncp = Ext.getCmp("geodocs-lonlat");

        latcp.setValue(latlon4326.lat)
        loncp.setValue(latlon4326.lon)
        latloncp.setValue("POINT ("+latlon4326.lat+","+latlon4326.lon+")");
        this.handlerOptions.ref.markerslayer.addMarker(new OpenLayers.Marker(latlon, this.handlerOptions.ref.icon))
    },
    resetAll: function(){
        var form = this;;
        for(var i = 0; i < form.MAXUPLOAD; i++){
            var img = form.down(Ext.String.format('filefield[name=images-{0}-image]', i));
            var doc =  form.down(Ext.String.format('filefield[name=docs-{0}-doc]', i));
            img.setVisible(false);
            doc.setVisible(false);
        }
        form.down(Ext.String.format('filefield[name=images-{0}-image]', 0)).setVisible(true);
        form.down('hiddenfield[name=docs-TOTAL_FORMS]').setValue(0);
        form.down('hiddenfield[name=images-TOTAL_FORMS]').setValue(1);
    }
		
});
