Ext.define('Webgis.view.Webgl3dCanvas', {
    extend: 'Ext.window.Window',
    alias : 'widget.webgl3dcanvas',
	
	id: 'webgl3dcanvas',
	
	closable: false,
	preventHeader: true,
	baseCls: 'x-panel',
	resizable: false,
	hidden: true,
	border: false,
	
    initComponent: function() {
		var wc = Ext.getCmp('webgiscenter');
		
		//SETUP dimensioni e posizioni
		this.width = wc.getWidth();
		this.height = wc.getHeight();
	
		this.x = 285;
		this.y = 60;
		
		//SETUP del layout
		this.layout = 'border'
		
		this.items = [
		//{
			//flex: 1,
		//	width: '100%',
		//	border: false,
		//	region: 'north',
		//	items: this.north
		//},
		{
			border: false,
			layout: 'fit',
			region: 'center',
			tpl: new Ext.Template('<div id="overlay"></div>',
						'<canvas id="wt3d_canvas" width="{w}" height="{h}" style="border: 1px solid black">',
							'Your browser does not support HTML5 Canvas!',
						'</canvas>'),
		    data: {
				w: this.width,
				h: this.height
			}
		}];
		
        this.callParent(arguments);
    }
});
