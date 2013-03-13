Ext.define('Webgis.controller.Westpanel', {
    extend: 'Ext.app.Controller',
    
    views: [
		'FunctionPanel'
    ],
    
    init: function() {
		this.control({
            '#webgiswest':{
				afterrender: {
					fn:this.createFunctionPanel,
					single: true
				}
			},
			'functionpanel toolbar button':{
				click: this.updatePanel
			}
        });
    },
    //Funzione che crea un nuovo pannello per le funzioni e lo aggiunge all'area webgiswest
    createFunctionPanel: function(panel){
        starter.applyText('Rendering function panel...');
        //Creo un nuovo pannello con xtype FunctionPanel, predisposto per gestire le funzioni
        var fnpanel = Ext.widget('functionpanel');
        if(panel.isHidden){
            panel.setVisible(true);
        }
        //Aggingo il nuovo pannello all'area di lavoro
        panel.add(fnpanel);
	},
	updatePanel: function(btn){
		//Richiamo il pannello con le funzioni
		var p = btn.up("functionpanel");
		
		//Attivo la card associata al pulsante (parametro card_id del bottone).
		//Faccio il cast in maniera che il numero passato alla funzione setActiveItem sia intero
		p.getLayout().setActiveItem(parseInt(btn.card_id));
	}
});
