Ext.define('Webgis.view.function.Information', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.information',
 
    layout: 'fit',
	border: false,
	style: 'background-color: #FFFFFF',
	
    initComponent: function() {
		//Template per visualizzare le informazioni introduttive
        this.tpl = new Ext.XTemplate(
			'<p class="x-information">{title}</p>',
			'<hr/>',
			'<p class="x-information-body">',
				'<div class="x-information-body"><div style="margin-top: 5px;margin-left: 10px;">{body}</div></div>',
			'</p>'
        );
        
        //Metodo utilizzato per aggiornare l'area
		this.tplWriteMode = 'overwrite';
		
		//Associo al template i dati presenti nella configurazione del Webgis
		this.data = Webgis.config.information;

        this.callParent(arguments);
    }
});
