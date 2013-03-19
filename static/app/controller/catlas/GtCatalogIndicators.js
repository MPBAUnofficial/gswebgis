/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/14/13
 * Time: 10:25 AM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with PyCharm.
 * User: shamar
 * Date: 09/10/12
 * Time: 10.00
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.controller.catlas.GtCatalogIndicators', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: "fnpanel",
            selector: "#webgiswestfn"
        },
        {
            ref: "sedehiddenfield",
            selector: "gtwhereclausesede > textfield"
        },
        {
            ref: "sededisplayfield",
            selector: "gtwhereclausesede > displayfield"
        }
    ],
    requires: [
        'Webgis.view.catlas.GtMainPanelIndicator',
        'Webgis.view.catlas.GtTreePanelIndicator',
        'Webgis.view.catlas.GtWhereClauseIndicator',
        'Webgis.view.catlas.gtclause.AnnoRt',
        'Webgis.view.catlas.gtclause.Sesso',
        'Webgis.view.catlas.gtclause.ClassiEta',
        'Webgis.view.catlas.gtclause.Sede',
        'Ext.form.field.ComboBox'
    ],

    stores: [
        'catlas.GtIndicators'
    ],

    init: function() {

        this.control({
            '#webgiswestfn': {
                afterlayout: {
                    fn:this.onPanelRendered,
                    scope: this,
                    single:true
                }
            },
            'gtwhereclausesede > grid': {
                selectionchange: {
                    fn: this.updateSedeSelection
                }
            }
        });

    },
    onPanelRendered: function(){
        a=this;
        var fn = this.getFnpanel();
        fn.addNewComponent({
            classe: 'Webgis.view.catlas.GtMainPanelIndicator',
            name_btn: 'Indicatori',
            options_btn:{
                pressed: false
            },
            options_obj: {
                store: this.getCatlasGtIndicatorsStore(),
                border: false
            }
        });
    },
    updateSedeSelection: function(sm,rec,index){
        var hidden = this.getSedehiddenfield();
        var display = this.getSededisplayfield();
        var idc = new Array();
        var label = new Array();

        Ext.Array.each(rec,function(item,idex,allItems){
            idc.push(item.get("id"));
            label.push(item.get("label"));
        }, this);

        hidden.setValue(idc.join(','));
        display.update("Hai selezionato: "+label.join(','));
    }
});