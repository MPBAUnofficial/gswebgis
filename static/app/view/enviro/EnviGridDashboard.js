Ext.define('Webgis.view.enviro.EnviGridDashboard', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.envigriddashboard',
 
	border: false,
    preventHeader: true,
    shadow: false,

	style: 'background-color: #FFFFFF',
	
	cls: 'x-envigrid-dashboard',
	
    initComponent: function() {
		
//		Creo il layout tabellare in accordo con il numero di elementi presenti nell'ambito spaziale temporale
		this.layout = {
			type: 'table',
			columns: this.getNumCol()
		}
		
		//Aggiungo le colonne della tabella
		 var itm_head = this.createGridHeader();

		//Aggiungo il body della tabella
        var itm_body = this.createGridBody();

		this.items = itm_head.concat(itm_body);

        this.callParent(arguments);
    },
    getNumCol: function(){
		//Faccio il retrun del numero degli elementi presenti nell'ambito spaziale (colonne) + 1 perche devo considerare anche gli item dell'ambito spaziale
		return Webgis.config.ambito.temporale.length + 1;
	},
	getNumRows: function(){
		//Faccio il retrun del numero degli elementi presenti nell'ambito spaziale (colonne) + 1 perche devo considerare anche gli item dell'ambito spaziale
		var tot_rows = Webgis.config.ambito.spaziale.length + 1;
		var res = Ext.util.Format.round(100/tot_rows,0)	
		return res;
	},
    createGridHeader: function(){
		//Per comodita rinomino localmente le variabili
		var ambito_temporale = Webgis.config.ambito.temporale;
		
		var result = [];

		//Ciclo per tutti gli ambiti temporali (cols) per creare l'header della griglia
		result.push({
			xtype: 'panel',
			border: false,
            height: 40,
			cls: 'x-envigrid-fit-td'
		});
		for (var idtemp in ambito_temporale){
			result.push({
				xtype: 'envigridheader',
				label_ambito: ambito_temporale[idtemp].fields.label
			})
		}

		return result
	},
    createGridBody: function(){
		//Per comodita rinomino localmente le variabili
		var ambito_spaziale = Webgis.config.ambito.spaziale;
		var ambito_climatico = Webgis.config.ambito.climatico;
		var ambito_temporale = Webgis.config.ambito.temporale;
		
		var result = [];

		//Ciclo per tutti gli ambiti spaziali (rows)
		for (var idspaz in ambito_spaziale){
			result.push({
				xtype: 'envigridrowsname',
				label_ambito: ambito_spaziale[idspaz].fields.label
			})
			//Ciclo per tutti gli ambiti temporali (cols)
			for (var idtemp in ambito_temporale){
				result.push({
					xtype: 'envigriditem',
					ambito_spaziale: ambito_spaziale[idspaz],
					ambito_temporale: ambito_temporale[idtemp],
					ambito_climatico: ambito_climatico
				})
			}
			
		}
		
		return result;
	}
});
