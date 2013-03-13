Ext.define('Webgis.view.FunctionButtonPanel', {
    extend: 'Ext.container.Container',
    alias : 'widget.functionbtnpanel',

        layout: {
        type: 'table',
        // The total column count must be specified here
        columns: 2,
        tableAttrs: {
            style: {
                width: '100%'
            }
        },
        tdAttrs:{
            style: {
                width: '50%'
            }
        }
    },

    defaults: {
        // applied to each contained panel
        bodyStyle: 'padding:20px'
    },

    id: 'webgiseastfn',
    border: false,
    defaults: {
        border: false
    },

    initComponent: function() {
        this.callParent(arguments);
    }
});