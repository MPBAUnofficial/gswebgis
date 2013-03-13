Ext.define('Webgis.view.enviro.EnviGridInformation', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.envigridinformation',
 
    layout: 'fit',
	border: false,
	style: 'background-color: #FFFFFF',
	
    initComponent: function() {
		//Template per visualizzare le informazioni introduttive
        this.tpl = new Ext.XTemplate(
			'<div class="x-envigrid-north">',
				'<p class="x-envigridinformation">EnviGrid Settings</p>',
				'<table>',
					'<tbody>',
						'<tr>',
							'<td >',
								'<div class="x-envigridinformation-type">Recently viewed</div>',
							'</td>',
							'<td>',
								'Tgrd annual, Botrite annual, HI daily (more 15)',
							'</td>',
						'</tr>',
						'<tr>',
							'<td>',
								'<div class="x-envigridinformation-type">Most Popular</div>',
							'</td>',
							'<td>',
								'Fenologia melo daily, Fenologia vite daily (more 23)',
							'</td>',
						'</tr>',
						'<tr>',
							'<td>',
								'<div class="x-envigridinformation-type">Newest data</div>',
							'</td>',
							'<td>',
								'Lobesia, Oidio, Precipitazioni (more 3)',
							'</td>',
						'</tr>',
					'</tbody>',
				'</table>',
			'</div>'
        );
        
        //Metodo utilizzato per aggiornare l'area
		this.tplWriteMode = 'overwrite';
		
		//Associo al template i dati presenti nella configurazione del Webgis
		this.data = [];

        this.callParent(arguments);
    }
});
