Ext.define('Webgis.view.catalog.DataView', {
    extend: 'Ext.view.View',
    alias : 'widget.catalogdataview',
 
	store: null,
	
	//Template per questa dataview
	tpl: new Ext.XTemplate(
		'<tpl for=".">',
			'<div class="item">',
				'<tpl if="preview==\'\'">',
					'<div><img src="{geoserver_url}?HEIGHT=72&WIDTH=82&LAYERS={geoserver_workspace}:{name_layer}&STYLES={style}&SRS=EPSG%3A32632&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&&BBOX=612484.75,5059669.0575215,728617.312,5156975.4424785" /></div>',
				'</tpl>',
				'<tpl if="preview!=\'\'">',
					'<div><img src="{preview}" /></div>',
				'</tpl>',
				'<h3>{text}</h3>',
			'</div>',
		'</tpl>'
	),
	
	itemSelector: 'div.item',
	overItemCls : 'item-hover',
	multiSelect : false,
	autoScroll  : true,
	
    initComponent: function() {
		
		
        this.callParent(arguments);
    }
});
