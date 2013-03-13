Ext.define('Webgis.view.FunctionPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.functionpanel',
 
    layout: 'card',
    id: 'webgiswestfn',
	border: false,
	padding: '20 8 8 8',
	style: 'background-color: #FFFFFF;',
	bodyStyle: 'background-color: #FFFFFF;border-top-width: 0px;',
	defaults: {
		border: false,
		autoScroll:true
	},

    group_id: null,
    card_id: null,
	
    initComponent: function() {
		//Leggo le configurazione che sono state segnalate per essere inserite nel westpanel
		var fnWest = Webgis.config.westpanel
		var items = [];
		var btn = [];
		
		//Creo un nome univoco che rappresenti il gruppo di bottoni (per settare il toggleGroup)
		this.group_id = Ext.id();
        this.card_id = 0;
		
		for (var idx in fnWest){
			//Ciclo su tutti gli oggetti presenti in fnWest e gli istanzio
			
			var obj = Ext.create(fnWest[idx].classe,fnWest[idx].options_obj);
			items.push(
				obj
			);
			
			//Creo i bottoni per accedere alle rispettive card
			var options = {
				text: fnWest[idx].name_btn,
				//card_id: idx,
                card_id: this.getNewCardId(),
				scale: 'medium',
				toggleGroup: this.group_id,
				overCls: 'x-functionpanel-button-over',
				pressedCls: 'functionpanel-button-pressed',
				focusCls: 'x-function-button-pressed',
				cls: 'x-functionpanel-button'
			};
			//Se ci sono impostate configurazione particolari faccio un merge con quelle di default definita dall'oggetto FunctionPanel
			Ext.Object.merge(options, fnWest[idx].options_btn);
			btn.push(options);
		}
		
		this.items = items;
		
		this.dockedItems = [{
			xtype: 'toolbar',
			dock: 'top',
			border: false,
			baseCls: 'x-panel-body',
			margin: '0 0 20 0',
			componentCls: 'x-panel-body',
			items: btn
		}]
        this.callParent(arguments);
    },
    getCardId: function(){
        return this.card_id;
    },
    setCardId: function(){
        this.card_id = this.card_id + 1;
    },
    getNewCardId: function(){
        var old = this.card_id;
        this.setCardId();
        return old;
    },
    addNewComponent: function(obj){
        //Ottengo la toolbar
        var tb = this.down("toolbar");
        //Creo il nuovo oggetto da aggiungere
        var newFn = Ext.create(obj.classe,obj.options_obj);

        //Creo i bottoni per accedere alle rispettive card
        var options = {
            text: obj.name_btn,
            card_id: this.getNewCardId(),
            scale: 'medium',
            toggleGroup: this.group_id,
            overCls: 'x-functionpanel-button-over',
            pressedCls: 'functionpanel-button-pressed',
            focusCls: 'x-function-button-pressed',
            cls: 'x-functionpanel-button'
        };
        //Se ci sono impostate configurazione particolari faccio un merge con quelle di default definita dall'oggetto FunctionPanel
        Ext.Object.merge(options, obj.options_btn);

        //Aggiungo i componenti
        this.add(newFn);
        tb.add(options)
    }
});
