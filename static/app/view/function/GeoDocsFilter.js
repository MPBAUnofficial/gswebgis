Ext.define('Webgis.view.function.GeoDocsFilter', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.geodocsfilter',

    autoScroll: true,

    border: false,

    items: [{
        xtype: 'container',
        margin: '0 0 15 0',
        html: '<p class="x-information">Filtra segnalazioni</p>' +
              '<p>Selezionare dall\'elenco sottostante il filtro desiderato, quindi premere applica.</p>'
    },{
        xtype: 'fieldcontainer',
        labelAlign: 'top',
        fieldLabel: '<b>1. Filtra segnalazioni per "argomento"</b>',
        defaultType: 'checkboxfield',
        items: [
            {
                boxLabel  : 'Acqua',
                name      : 'topic',
                inputValue: 'water',
                id        : 'checkbox1'
            }, {
                boxLabel  : 'Coltura',
                inputValue: 'cultivation',
                name      : 'topic',
                id        : 'checkbox2'
            }, {
                boxLabel  : 'Ambiente',
                name      : 'topic',
                inputValue: 'environment',
                id        : 'checkbox3'
            }, {
                boxLabel  : 'Suolo',
                name      : 'topic',
                inputValue: 'soil',
                id        : 'checkbox4'
            }
        ]
    },{
        xtype:'button',
        componentCls: 'x-base-apply-button',
        style: 'width: 95%;',
        olLogical: OpenLayers.Filter.Logical,
        olLogicalOperator: OpenLayers.Filter.Logical.OR,
        olFilter: OpenLayers.Filter.Comparison,
        olFilterOperator: OpenLayers.Filter.Comparison.EQUAL_TO,
        isfilter: true,
        text:"Applica"
    },{
        xtype: 'fieldcontainer',
        labelAlign: 'top',

        fieldLabel: '<b>2. Filtra segnalazioni per "importanza"</b>',
        defaultType: 'checkboxfield',
        items: [
            {
                boxLabel  : 'Poco importante',
                name      : 'degree',
                inputValue: '1',
                id        : 'checkbox6'
            }, {
                boxLabel  : 'Mediamente importante',
                name      : 'degree',
                inputValue: '2',
                id        : 'checkbox7'
            }, {
                boxLabel  : 'Importante',
                name      : 'degree',
                inputValue: '3',
                id        : 'checkbox8'
            }, {
                boxLabel  : 'Molto importante',
                name      : 'degree',
                inputValue: '4',
                id        : 'checkbox9'
            }, {
                boxLabel  : 'Estremamente importante',
                name      : 'degree',
                inputValue: '5',
                checked   : false,
                id        : 'checkbox10'
            }
        ]
    },{
        xtype:'button',
        componentCls: 'x-base-apply-button',
        style: 'width: 95%;',
        olLogical: OpenLayers.Filter.Logical,
        olLogicalOperator: OpenLayers.Filter.Logical.OR,
        olFilter: OpenLayers.Filter.Comparison,
        olFilterOperator: OpenLayers.Filter.Comparison.EQUAL_TO,
        isfilter: true,
        text:"Applica"
    },{
        xtype: 'fieldcontainer',
        labelAlign: 'top',
        fieldLabel: '<b>3. Filtra per nome utente</b>',
        defaultType: 'checkboxfield',
        items: [
            {
                boxLabel  : 'Utente in sessione corrente',
                name      : 'user_id',
                inputValue: userdata.user_id,
                checked   : false
            }
        ]
    },{
        xtype:'button',
        componentCls: 'x-base-apply-button',
        style: 'width: 95% !important; margin-bottom: 10px !important;',
        olLogical: OpenLayers.Filter.Logical,
        olLogicalOperator: OpenLayers.Filter.Logical.OR,
        olFilter: OpenLayers.Filter.Comparison,
        olFilterOperator: OpenLayers.Filter.Comparison.EQUAL_TO,
        isfilter: true,
        text:"Applica"
    }],


    initComponent: function() {


        this.callParent(arguments);
    }

});