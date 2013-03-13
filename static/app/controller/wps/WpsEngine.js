/**
 * Created with PyCharm.
 * User: shamar
 * Date: 09/10/12
 * Time: 10.00
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.controller.wps.WpsEngine', {
    extend: 'Ext.app.Controller',

    requires: ['Webgis.class.WpsAction','Webgis.types.ArrayToString'],

    views: [
        'wps.WpsExecuteBtn'
    ],

    stores: [
        'wps.ProcessStatus'
    ],
    models: [
        'wps.WpsModel',
        'wps.ProcessStatus'
    ],

    refs: [
        {
            ref: "fnpanel",
            selector: "#webgiswestfn"
        },
        {
            ref: "statusgrid",
            selector: "wpsgrid"
        },
        {
            ref: "statustext",
            selector: "wpsgrid > toolbar > tbtext"
        }
    ],

    init: function() {

        this.getWpsProcessStatusStore().addListener('load',this.updateText, this);
        this.control({
            '#webgiscenter': {
                afterlayout: {
                    fn:this.onPanelRendered,
                    scope: this,
                    single:true
                }
            },
            'wpswindow': {
                boxready: {
                    fn: this.describeProcess
                }
            },
            'wpsexecute': {
                click: {
                    fn: this.execute,
                    scope: this
                }
            },
            'wpswindow > form > *[handler]':{
                boxready: {
                    fn: function(cp){
                        cp.handler();
                    }
                }
            }
        });

    },
    onPanelRendered: function(){
        var store = this.getWpsProcessStatusStore();
        starter.applyText('Rendering wps engine panel...');

        //Faccio la richiesta per ottenere la lista dei server e creare i catalogbutton
         Ext.Ajax.request({
            url: '/wps/server/list/',
            method: 'GET',
            scope: this,
            success: function(response){
                var r = Ext.decode(response.responseText);
                Ext.each(r,this.setCatalogButton,this)
            },
            failure: function(response){
                console.log(response);
            }
        });


        var fn = this.getFnpanel();
        fn.addNewComponent({
            classe: 'Webgis.view.wps.StatusGrid',
            name_btn: 'Wps',
            options_btn:{pressed: false},
            options_obj: {store: store}
        });
        this.startTask();
    },
    setCatalogButton: function(r){
        var catalogPanel = Ext.getCmp('catalogpanel');
        var store = this.setDataStore(r.identifier);

        catalogPanel.add({
            xtype: 'catalogbutton',
            id: r.identifier,
            text:r.display_name,
            description:r.description,
            iconCls: 'x-catalogpanel-model',
            catalogview: this.setDataView(store)
        });

    },
    setDataStore: function(identifier){
        var store = Ext.create('Webgis.store.wps.ModelStore',{
            storeId: identifier,
            proxy: {
                type: 'rest',
                url: '/wps/process/list/' + identifier + "/",
                reader: {
                    type: 'json'
                }
            }
        });
        store.load();
        return store;
    },
    setDataView: function(store){
        var dataview = Ext.create('Ext.view.View', {
            store: store,
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
                    '<div class="item">',
                        '<h3><b>{title}</b></h3>',
                        '<div>Some description here. Some description here. Some description here.</div>',
                        '<div style="color: gray;"><i>v{version}</i></div>',
                    '</div>',
                '</tpl>'
            ),

            plugins : [
            ],

            itemSelector: 'div.item',
            overItemCls : 'item-hover',
            multiSelect : false,
            autoScroll  : true,
            listeners: {
                itemclick: {
                    fn: function(view,record,el){
                        var store = view.getStore();
                        if(el.id){
                            Ext.get(el.id).frame("#DFE9F6");
                        }

                        view.up('menu').hide();

                        this.createWpsWindow(record.data,store.storeId);
                    },
                    scope: this
                }
            }
        })

        return dataview;
    },
    createWpsWindow: function(dataHeader,serverIdentifer){
        Ext.create('Webgis.view.wps.WpsWindow',{
            dataHeader: dataHeader,
            serverIdentifer: serverIdentifer
        });
    },
    describeProcess: function(view){
        Ext.Ajax.request({
            url: '/wps/process/details/'+view.serverIdentifer+'/'+view.dataHeader.identifier+'/',
            method: 'GET',
            scope: this,
            success: function(response){
                var r = Ext.decode(response.responseText);
                var fields = new Array();
                var loadMask = view.down('container[type=loadmask]');

                for (var i = 0; i < r.inputs.length; i++){
                    fields.push(this.getFieldFromIdentifier(r.inputs[i]));
                }
                var formpanel = Ext.create('Ext.form.Panel',{
                    url: '/wps/process/run/'+view.serverIdentifer+'/'+view.dataHeader.identifier+'/',
                    border: false,
                    header: false,
                    padding: '8 8 8 8',
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 150
                    },
                    items: fields
                });
                view.remove(loadMask);
                view.add(formpanel,this.getWpsWpsExecuteBtnView());
            },
            failure: function(response){
                console.log(response);
            }
        });
    },
    getFieldFromIdentifier: function(record){
        var res;
        var action = new Webgis["class"].WpsAction();
        switch (record.identifier) {
            case 'FORCE_ERROR':

                res = {
                    xtype: 'textfield',
                    name: record.identifier,
                    allowBlank:true,
                    fieldLabel: record.title ? record.title : record.identifier
                };
                break;

            case 'WORKSPACE_OUTPUT':
                res = {
                    xtype: 'hiddenfield',
                    name: record.identifier,
                    handler: action.getUniqueId
                };
                break;

            case 'COVERAGE_OUTPUT':
                res = {
                    xtype: 'hiddenfield',
                    name: record.identifier,
                    handler: action.getUniqueId
                };
                break;

            case 'WORKSPACE_TEMPERATURES_MIN':
                res = {
                    xtype: 'hiddenfield',
                    name: record.identifier
                };
                break;

            case 'COVERAGE_TEMPERATURES_MIN':
                res = {
                    xtype: 'hiddenfield',
                    name: record.identifier
                };
                break;

            case 'WORKSPACE_TEMPERATURES_MAX':
                res = {
                    xtype: 'hiddenfield',
                    name: record.identifier
                };
                break;

            case 'COVERAGE_TEMPERATURES_MAX':
                res = {
                    xtype: 'hiddenfield',
                    name: record.identifier
                };
                break;

            case 'WORKSPACE_TEMPERATURES_AVG':
                res = {
                    xtype: 'hiddenfield',
                    name: record.identifier
                };
                break;

            case 'COVERAGE_TEMPERATURES_AVG':
                res = {
                    xtype: 'hiddenfield',
                    name: record.identifier
                };
                break;

            case 'BBOX':
                res = {
                    xtype: 'textfield',
                    name: record.identifier,
                    allowBlank: false,
                    handler: action.getBBOX,
                    fieldLabel: record.title ? record.title : record.identifier
                };
                break;

            case 'YEAR':
                res = {
                    xtype: 'textfield',
                    name: record.identifier,
                    allowBlank: false,
                    fieldLabel: record.title ? record.title : record.identifier
                };
                break;

            case 'USER':
                res = {
                    xtype: 'textfield',
                    name: record.identifier,
                    fieldLabel: record.title ? record.title : record.identifier,
                    value: 'PincoPallino',
                    disabled: true,
                    submitValue:false
                };
                break;

            case 'WORKSPACE_PHEN':
                res = {
                    xtype: 'hiddenfield',
                    name: record.identifier
                };
                break;

            case 'WORKSPACE_BOT':
                res = {
                    xtype: 'hiddenfield',
                    name: record.identifier
                };
                break;
            default:
                res = {
                    xtype: 'textfield',
                    name: record.identifier,
                    allowBlank:false,
                    fieldLabel: record.title ? record.title : record.identifier
                };
        }
        return res;
    },
    execute: function(btn){
        //Ottengo la window di riferimento dove e' stato renderizzato il btn
        var win = btn.findParentByType("wpswindow");

        //Ottengo lo store
        var store = this.getWpsProcessStatusStore();

        //Ottengo il form di riferimento
        var form = win.down("form").getForm();
        if(form.isValid()){
            form.submit({
                method: "GET",
                scope: this,
                disableCaching: false,
                success: function(basicform){
                    var win = basicform.owner.up("wpswindow");
                    win.close();
                    store.load();
                },
                failure: function(from,action){
                    console.log(action)
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title:'Errore',
                        msg: res.text,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        }
    },
    updateStatusGrid: function(){
        var store = this.getWpsProcessStatusStore();
        store.load();
    },
    startTask: function(){
        var task = Ext.TaskManager.start({
             run: this.updateStatusGrid,
             interval: 50000,
             scope: this
         });
    },
    updateText: function(store,recordset,success){
        if(success){
            var txt = this.getStatustext()
            txt.update("Updated "+Ext.Date.format(new Date(),"Y/m/d H:i:sO"));

        }
    }
});