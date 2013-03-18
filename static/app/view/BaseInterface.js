Ext.define('Webgis.view.BaseInterface',{
    extend: 'Ext.panel.Panel',
    alias : 'widget.baseinterface',
    layout: {
		type: 'border'
	},
    initComponent: function() {
//		var mappe = this.createMapsTable();
		this.items = [
			{
                id: 'webgiswest',
				region: 'west',
				collapsible: true,
				collapseMode: 'mini',
				split: true,
				layout: 'fit',
                cls: 'x-baseinterface-west-body',
				hideCollapseTool: true,
				autoScroll:false,
				border: false,
                header: false,
                hidden: true,
                shadow: false,
				style: 'background-color: #FFFFFF',
				animCollapse: true,
				width: 280
			},{
                id: 'webgiseast',
                region: 'east',
                collapsible: true,
                collapseMode: 'mini',
                split: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                cls: 'x-baseinterface-east-body',
                hideCollapseTool: true,
                autoScroll:false,
                border: false,
                header: false,
                hidden: true,
                shadow: false,
                style: 'background-color: #FFFFFF',
                padding: '8 8 8 8',
                animCollapse: false,
                width: 280,
                items: [{
                    id: 'webgiseastpanelbtn',
                    xtype: 'container',
                    flex: 1,
                    border: false,
                    layout: 'card'
                }]
            },{
				height: 60,
                xtype: 'container',
				region: 'north',
				id: 'webgisnorth',
				border: false,
                header: false,
				padding: '0 0 0 0',
                baseCls: 'webgisnorth',
				cls: 'x-baseinterface-north-body',
				shadow: false,
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				defaults: {
					padding: '8 8 8 8'
				},
				style: 'height: 100%;width: 100%',
				items:[{
					xtype: 'container',
                    baseCls: 'x-baseinterface-north-title',
					style: 'padding-left: 15px;padding-right:15px;height: 100%;width: 300px',
                    tpl: new Ext.XTemplate(
                        '<tpl if="long_name">',
                        '<div style="line-height:2em">',
                        '{long_name}',
                        '</div>',
                        '</tpl>'
                    ),
                    data: Webgis.config.config.fields
				}]
			},
            Ext.create('GeoExt.panel.Map',{
                map: Webgis.maps[0],
                id: 'webgiscenter',
                border: false,
                region: 'center'
            })
		]
        this.callParent(arguments);
    },
    createMapsTable: function(){
		var nMappe = Webgis.maps.length;
		var result;
		var nColTabella, componentTabella;
		switch(nMappe){
			case 1:
				nColTabella = 1
				componentTabella = [{
					id: 'mappa-0'

				}]
			case 2:
				nColTabella = 2
				componentTabella = [{
					id: 'mappa-0'
				},{
					id: 'mappa-1'
				}]
			break;
			case 3:
				nColTabella = 3
				componentTabella = [{
					id: 'mappa-0'
				},{
					id: 'mappa-1'
				},{
					id: 'mappa-2'
				}]
			break;
			case 4:
				nColTabella = 2
				componentTabella = [{
					id: 'mappa-0'
				},{
					id: 'mappa-1'
				},{
					id: 'mappa-2'
				},{
					id: 'mappa-3'
				}]
			break;
			default: 
				nColTabella = 1
				componentTabella = [{
					id: 'mappa-0'
				}]
			break;
		}
		
		result = {
			nColTabella: nColTabella,
			componentTabella: componentTabella
		};
		
		return result
	}
});
