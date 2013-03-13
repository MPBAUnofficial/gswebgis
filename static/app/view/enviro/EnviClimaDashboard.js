/**
 * Created with PyCharm.
 * User: shamar
 * Date: 12/09/12
 * Time: 10.18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.enviro.EnviClimaDashboard', {
    extend: 'Ext.window.Window',
    alias : 'widget.enviclimadash',

//    requires: ['Webgis.store.enviro.Stagionali','Webgis.store.enviro.Mensili','Webgis.store.enviro.Winkler','Webgis.model.enviro.StagionaliModel','Webgis.model.enviro.MensiliModel','Webgis.model.enviro.WinklerModel','Webgis.view.enviro.StagionaliChart','Webgis.view.enviro.MensiliGrid','Webgis.view.enviro.WinklerChart','Ext.chart.theme.Base','Ext.chart.series.Column'],

    autoShow: true,

    headerPosition: "left",
    title: 'EnviClima Dashboard',

//    ambito_climatico: Webgis.selezioneEnviGrid.ambito_climatico.fields.nome_cartella_temperature,

    layout: "border",

    defaultPanel: {
        xtype: "container",
        border: false,
        html: "<h2>Please double click on a station to view charts. Data source: Emanuele Eccel & Co</h2>",
        flex: 1
    },

    initComponent: function() {
        var margine = 15;
        var m = Ext.get('webgiscenter');
        this.setPosition(m.getX()+margine, m.getY()+margine);
        this.width = (m.getWidth()-(margine*2));
        this.height = (m.getHeight()-(margine*2));

        this.items = [
            this.stazioniGrid,
            {
                region: "center",
                xtype: "container",
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    defaultMargins: {top: 5, right: 5, bottom: 5, left: 5}
                },
                items:[
                    this.climaPanel,
                    this.defaultPanel
                ]
            }]

        this.callParent(arguments);
    }



});
