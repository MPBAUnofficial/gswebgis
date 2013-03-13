/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 12/20/12
 * Time: 2:50 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.view.function.TreePanelStatistical', {
    extend: 'Ext.tree.Panel',
    alias : 'widget.geotreecatalogstatistical',

    id: 'geotreecatalogstatistical',

    layout: 'fit',
    border: false,

    header: false,
    hideHeaders: true,

    frame: true,

    hideHeader: true,

    rootVisible: false,
    useArrows: true,

    maps: Webgis.maps,

    columns: [{
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: 'Nome',
        flex: 2,
        sortable: false,
        dataIndex: 'text'
    }, {
        text: 'Delete',
        width: 20,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: 'Elimina il dato statistico',
        align: 'center',
        cls: 'x-treepanel-metedata',
        icon: '/static/resources/images/icons/delete.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {

            record.destroy({
                scope: grid,
                success: function() {
//                    console.log('The layer was destroyed!');
                },
                failure: function(){

                    var st = this.up("treepanel").getStore();
                    st.load(0);
//                    console.log('The layer was not destroyed!');
                }
            });
        },

        // Only leaf level tasks may be edited
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            var res;
            if(record.get('leaf') && !record.get('public')){
                res = false;
            } else {
                res = true;
            }
            return res;
        }
    },{
        text: 'Metadata',
        width: 20,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: 'Guarda la scheda Metadati',
        align: 'center',
        cls: 'x-treepanel-metedata',
        icon: '/static/resources/images/icons/info.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
            grid.up('treepanel').viewMetadata(record.get('real_id'));
        },

        // Only leaf level tasks may be edited
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return !record.get('has_metadata')
        }
    }],

    initComponent: function() {
        this.listeners = {
            checkchange:{
                fn: 'onCheckChange',
                scope: this
            }
        }
        this.maps[0].events.on({
            'removelayer': this.updateCheckbox,
            scope: this
        });

        this.callParent(arguments);
    },
    onCheckChange: function(node,ischecked){
//        if(node.isLeaf()){
//            if(ischecked){
////                console.log(node.getData());
////                console.log(node);
//                this.addLayerToMap(this.maps[0],node);
//            } else {
//                this.rmLayerFromMap(this.maps[0],node.getData());
//            }
//        }
    },
    viewMetadata: function(id){
        Ext.Ajax.request({
            url: '/api/metadata/'+id,
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Ext.create('Webgis.view.function.GeotreeMetaLayer',{
                    data: obj.data
                });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    }
});