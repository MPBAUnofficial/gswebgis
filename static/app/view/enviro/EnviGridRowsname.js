Ext.define('Webgis.view.enviro.EnviGridRowsname', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.envigridrowsname',

	frame: true,
	border: true,

	layout: 'fit',
	
	width: 100,
	//~ height: 100,
	
	cls: 'x-envigrid-fit-rowsname',


	
    initComponent: function() {
		
//		var el = Ext.create('Ext.draw.Component', {
//			viewBox:false ,
//			border: false,
//			//~ width: 40,
//			height: 150,
//			cls: 'x-envigrid-fit-td-headerelement',
//			autoSize: true,
//			items: [{
//				type: 'text',
//				text: this.label_ambito,
//				fill: '#000',
//				y: 50,
//				rotate: {
//					degrees: 270
//				}
//			}]
//		});
//		this.items = el

        this.html = this.label_ambito;
        this.styleHtmlCls = 'x-envigrid-fit-td-headerelement-rotate';
        this.styleHtmlContent = true;



        this.callParent(arguments);
    }
});
