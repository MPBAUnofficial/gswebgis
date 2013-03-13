Ext.define('Webgis.view.enviro.MensiliGrid', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.mensiligrid',
	
	requires: ['Ext.data.*','Ext.grid.*','Ext.util.*'],

    flex: 1,

	forceFit: true,

    border: false,
    columnLines: true,
    viewConfig: {
        stripeRows: true
    },

    initComponent: function() {

		this.columns = [
			{
                text: 'ID',
                flex:1,	
                sortable: false,
                dataIndex: 'id'
            },{
                text: "Sept", columns:[{
                    text: 'T',
                    sortable: false,
                    dataIndex: 'm1'
                    },{
                    text: 'P',
                    sortable: false,
                    dataIndex: 'p1'
                }]
            },{
                text: "Oct", columns:[{
                    text: 'T',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'm2'
                },{
                    text: 'P',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'p2'
                }]
            },{
                text: "Nov", columns:[{
                    text: 'T',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'm3'
                },{
                    text: 'P',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'p3'
                }]
            },{
                text: "Dec", columns:[{
                    text: 'T',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'm4'
                },{
                    text: 'P',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'p4'
                }]
            },{
                text: "Jan", columns:[{
                    text: 'T',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'm5'
                },{
                    text: 'P',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'p5'
                }]
            },{
                text: "Feb", columns:[{
                    text: 'T',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'm6'
                },{
                    text: 'P',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'p6'
                }]
            },{
                text: "Mar", columns:[{
                    text: 'T',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'm7'
                },{
                    text: 'P',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'p7'
                }]
            },{
                text: "Apr", columns:[{
                    text: 'T',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'm8'
                },{
                    text: 'P',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'p8'
                }]
            },{
                text: "May", columns:[{
                    text: 'T',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'm9'
                },{
                    text: 'P',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'p9'
                }]
            },{
                text: "Jun", columns:[{
                    text: 'T',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'm10'
                },{
                    text: 'P',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'p10'
                }]
            },{
                text: "June", columns:[{
                    text: 'T',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'm11'
                },{
                    text: 'P',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'p11'
                }]
            },{
                text: "July", columns:[{
                    text: 'T',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'm12'
                },{
                    text: 'P',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'p12'
                }]
            },{
                text: "Aug", columns:[{
                    text: 'T',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'm13'
                },{
                    text: 'P',
                    //~ width: 125,
                    sortable: false,
                    dataIndex: 'p13'
                }]
            }];
		
		this.stripeRows = true;
		
        this.callParent(arguments);
    }

});
