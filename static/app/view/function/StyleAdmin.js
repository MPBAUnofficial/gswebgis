Ext.define('Webgis.view.function.StyleAdmin', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.styleadmin',


    layout: 'fit',
    border: false,

    /* *
     * Setto i bordi arrotondati per il panello
     *
     */
    frame: true,

    cls: 'x-style-admin',

    initComponent: function() {
        //~ //Setto le colonne da vedere nella griglia
        this.columns=[
            {
                xtype: 'templatecolumn',
                text: 'Stili disponibili',
                tpl: '<div class="x-boundlist-item"><img style="margin-right: 10px;" src="/static/resources/images/{feature_type}.png"/>{label}</div>',
                flex: 1
            },{
                width: 20,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Elimina il tematismo',
                align: 'center',
                cls: 'x-treepanel-metedata',
                icon: '/static/resources/images/icons/delete.png',
                handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                    record.destroy({
                        scope: grid,
                        success: function() {
                            var st = this.getStore();
                            st.load(0);
                        },
                        failure: function(){
                            var st = this.getStore();
                            st.load(0);
                        }
                    });
                },
                // Only leaf level tasks may be edited
                isDisabled: function(view, rowIdx, colIdx, item, record) {
                    var res;
                    if(!record.get('public')){
                        res = false;
                    } else {
                        res = true;
                    }
                    return res;
                }
            }
        ]

        this.callParent(arguments);
    }
});