/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/15/13
 * Time: 4:29 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Webgis.view.catlas.PlrComunale', {
    extend: 'Ext.form.Panel',
    alias: 'widget.plrcomunali',

    border: false,
    frame: true,

    width: 250,

    layout: 'anchor',
    defaults: {
        anchor: '95%'
    },

    defaultType: 'textfield',

    autoScroll: true,

    fieldDefaults: {
        msgTarget: 'side',
        autoFitErrors: false
    },

    items: [
        {
            name: 'csrfmiddlewaretoken',
            xtype: 'hiddenfield',
            value: Ext.util.Cookies.get('csrftoken'),
            allowBlank: false
        },
        {
            xtype: 'displayfield',
            hideLabel: true,
            name: 'home',
            margin: '0 0 15 0',
            value: 'Descrizione del tipo di grafico... bla bla bla'
        },{
            xtype: 'grid',
            hideHeaders: true,
            columns: [
                { text: 'Label',  dataIndex: 'label', flex: 1 }
            ],
            store: Ext.create('Webgis.store.catlas.GtComunale'),
            selModel: Ext.create('Ext.selection.CheckboxModel'),
            height: 200,
            autoScroll: true,
            columnLines: true,
            listeners: {
                selectionchange: function(sm,rec,index){
                    var display = this.up("form").down("displayfield[name=label_comu]");
                    var hidden = this.up("form").down("textfield[name=comu]");
                    var idc = new Array();
                    var label = new Array();

                    Ext.Array.each(rec,function(item,idex,allItems){
                        idc.push(item.get("id"));
                        label.push(item.get("label"));
                    }, this);

                    hidden.setValue(idc.join(','));
                    display.update("Hai selezionato: "+label.join(','));
                }
            }
        },{
            xtype: 'displayfield',
            hideLabel: true,
            margin: '5 0 0 0',
            name: 'label_comu',
            value: 'Nessuna sede selezionata'
        },{
            xtype: 'textfield',
            hidden: true,
            name: 'comu',
            allowBlank: false,
            value: null
        },{
            fieldLabel: 'Anno di inizio incidenza',
            xtype: 'combobox',
            store: Ext.create('Ext.data.Store', {
                fields: ['id', 'label'],
                data: [
<<<<<<< HEAD
                    {"id": 1997, "label": "1997"},
                    {"id": 1998, "label": "1998"},
=======
                    {"id": 1997, "label": "2000"},
                    {"id": 1998, "label": "1999"},
>>>>>>> 54f10180665fb14e5ba30f7a9cd3df68a56a7516
                    {"id": 1999, "label": "1999"},
                    {"id": 2000, "label": "1999"},
                    {"id": 2001, "label": "2001"},
                    {"id": 2002, "label": "2002"},
                    {"id": 2003, "label": "2003"},
                    {"id": 2004, "label": "2004"},
                    {"id": 2005, "label": "2005"},
                    {"id": 2006, "label": "2006"}
                ]
            }),
            labelAlign: "top",
            queryMode: 'local',
            displayField: 'label',
            valueField: 'id',
            vtype: 'daterange',
            name: 'annoinizio3',
            id: 'annoinizio3',
            allowBlank: false,
            endDateField: "annofine3"
        },
        {
            fieldLabel: 'Anno di fine incidenza',
            xtype: 'combobox',
            store: Ext.create('Ext.data.Store', {
                fields: ['id', 'label'],
                data: [
                    {"id": 1997, "label": "1997"},
                    {"id": 1998, "label": "1998"},
                    {"id": 1999, "label": "1999"},
                    {"id": 2000, "label": "2000"},
                    {"id": 2001, "label": "2001"},
                    {"id": 2002, "label": "2002"},
                    {"id": 2003, "label": "2003"},
                    {"id": 2004, "label": "2004"},
                    {"id": 2005, "label": "2005"},
                    {"id": 2006, "label": "2006"}
                ]
            }),
            labelAlign: "top",
            queryMode: 'local',
            displayField: 'label',
            valueField: 'id',
            name: 'annofine3',
            id: 'annofine3',
            vtype: 'daterange',
            allowBlank: false,
            startDateField: "annoinizio3"
        },
        {
            fieldLabel: 'Sede',
            xtype: 'combobox',
            editable: false,
            store: Ext.create('Ext.data.Store', {
                fields: ['id', 'label'],
                sorters: [
                    {
                        property : 'label',
                        direction: 'ASC'
                    }
                ],
                data: [
                    {"id": 1, "label": "Labbro"},
                    {"id": 2, "label": "VADS (Vie aerodigestive superiori)"},
                    {"id": 8, "label": "Ghiandole salivari"},
                    {"id": 16, "label": "Esofago"},
                    {"id": 17, "label": "Stomaco"},
                    {"id": 18, "label": "Intestino tenue"},
                    {"id": 19, "label": "Colon"},
                    {"id": 20, "label": "Retto"},
                    {"id": 23, "label": "Fegato"},
                    {"id": 24, "label": "Vie biliari"},
                    {"id": 26, "label": "Pancreas"},
                    {"id": 27, "label": "Mal definite e metastasi"},
                    {"id": 28, "label": "Cavità nasali"},
                    {"id": 31, "label": "Polmone"},
                    {"id": 33, "label": "Altri organi toracici"},
                    {"id": 36, "label": "Osso"},
                    {"id": 38, "label": "Pelle, melanomi"},
                    {"id": 39, "label": "Pelle, non melanomi"},
                    {"id": 40, "label": "Mesotelioma"},
                    {"id": 41, "label": "Sarcoma di Kaposi"},
                    {"id": 42, "label": "Tessuti molli"},
                    {"id": 45, "label": "Mammella"},
                    {"id": 46, "label": "Altri genitali femminili"},
                    {"id": 48, "label": "Utero, cervice"},
                    {"id": 49, "label": "Utero, corpo"},
                    {"id": 50, "label": "Utero, NAS"},
                    {"id": 51, "label": "Ovaio"},
                    {"id": 53, "label": "Placenta"},
                    {"id": 54, "label": "Pene"},
                    {"id": 55, "label": "Prostata"},
                    {"id": 56, "label": "Testicolo"},
                    {"id": 57, "label": "Altri genitali maschili"},
                    {"id": 58, "label": "Rene, vie urinarie"},
                    {"id": 61, "label": "Vescica"},
                    {"id": 63, "label": "Occhio"},
                    {"id": 64, "label": "Encefalo e altro SNC"},
                    {"id": 67, "label": "Tiroide"},
                    {"id": 68, "label": "Altre ghiandole endocrine"},
                    {"id": 75, "label": "Linfoma di Hodgkin"},
                    {"id": 76, "label": "Linfoma non Hodgkin"},
                    {"id": 80, "label": "Mieloma"},
                    {"id": 82, "label": "Leucemie"}
                ]
            }),
            labelAlign: "top",
            queryMode: 'local',
            displayField: 'label',
            valueField: 'id',
            name: 'sede',
            allowBlank: false
        }
    ],

    dockedItems: [
        {
            text: 'Invia',
            dock: 'bottom',
            componentCls: 'x-base-return-button',
            xtype: 'button',
            handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    var values = this.up('form').getValues();

                    var w = 900;
                    var h = 700;
                    var windowH = Ext.getBody().getViewSize().height;
                    var chartH = Ext.util.Format.round(windowH * 0.8, 0);
                    var chartW = Ext.util.Format.round((chartH * w) / h, 0);

                    var url = Ext.String.format('/plr/execute/ca_graph_comu/{0}/{1}/{2}/{3}/{4}/{5}/{6}/{7}/{8}', 4, values.comu, 8, 7, chartW - 10, chartH - 30, values.annoinizio3, values.annofine3, values.sede);



                    var w = Ext.create('Ext.window.Window', {
                        title: 'Catlas output chart',
                        height: chartH,
                        width: chartW,
                        layout: 'fit',
                        resizable: false
                    }).show();

                    w.body.mask("Creazione grafico in corso...");

                    var image = w.body.createChild({
                        tag: "img",
                        src: url
                    });
                    image.on("load", function() {
                        w.body.unmask();
                        image.fadeIn();
                    });
                }
            }
        },
        {
            xtype: 'container',
            dock: 'top',
            html: 'Tassi grezzi x comune',
            border: false,
            baseCls: 'x-maplegend-title'
        }
    ],

    initComponent: function () {


        Ext.apply(Ext.form.field.VTypes, {
            daterange: function (val, field) {
                if (field.startDateField) {
                    var end = field;
                    var endVal = field.getValue();
                    var start = field.up('form').down('#' + field.startDateField);
                    var startVal = start.getValue();
                    if (startVal > endVal && start) {
                        return false
                    }
                } else if (field.endDateField) {
                    var end = field.up('form').down('#' + field.endDateField);
                    var endVal = end.getValue();
                    var start = field
                    var startVal = field.getValue();
                    if (startVal > endVal && endVal) {
                        return false
                    }
                }
                /*
                 * Always return true since we're only using this vtype to set the
                 * min/max allowed values (these are tested for after the vtype test)
                 */
                return true;
            },

            daterangeText: 'La data di inizio deve essere minore della data di fine.'
        });


        this.callParent(arguments);
    }

});
