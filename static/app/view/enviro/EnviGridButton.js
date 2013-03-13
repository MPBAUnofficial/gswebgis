Ext.define('Webgis.view.enviro.EnviGridButton', {
    extend: 'Ext.button.Button',
    alias : 'widget.envigridbutton',
	
	ambito_climatico: null,
	ambito_temporale: null,
	ambito_spaziale: null,
	
	
    initComponent: function() {
		this.text = this.ambito_climatico.fields.label
		
        this.callParent(arguments);
    },

    getAmbitoText: function(){
		return this.ambito_spaziale.fields.label + " x " + this.ambito_temporale.fields.label + "<br/>" + this.ambito_climatico.fields.label;
	}
});
