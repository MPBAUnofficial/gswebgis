Ext.define('Webgis.view.wps.StatusGrid', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.wpsgrid',

    requires: [
        'Ext.grid.column.Action',
        'Ext.ux.RowExpander'
    ],

    layout: 'fit',
    border: true,


    /* *
     * Setto le linee tra una riga e l'altra tella griglia
     *
     */
    columnLines: false,

    /* *
     * Setto i bordi arrotondati per il panello
     *
     */
    frame: false,

    title: 'Process status',

    hideHeaders: true,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
            xtype:'tbtext',
            text: 'Not synchronized'
        }]
    }],

    tools: [{
        type:'refresh',
        tooltip: 'Refresh data',
        handler: function(event, toolEl, panel){
            panel.up("grid").getStore().load();
       }
    }],

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : new Ext.XTemplate(
            '<div class="wps-identifier">Identifier: <i>{name}</i></div>',
            '<tpl if="stopped_at === null">',
            '<tpl else>',
            '<div class="wps-identifier">Started at: {started_at}</div>',
            '<div class="wps-identifier">Stopped at: {stopped_at}</div>',
            '</tpl>',
            '<div class="wps-list">Model inputs<ul>',
            '<tpl for="inputs.toarray">',
                '<li>{.}</li>', // within the loop, the **`{.}`** variable is set to the property value
            '</tpl>',
            '</ul></div>'
//            {
//                formatChange: function(v){
//                    var color = v >= 0 ? 'green' : 'red';
//                    return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
//                }
//            }
        )
    }],

    initComponent: function() {
        //~ //Setto le colonne da vedere nella griglia
        this.columns=[
            {
                xtype:'templatecolumn',
                tpl: new Ext.XTemplate(
                    '<b>{name:this.formatName}</b> @ {server} server',
                    '<br/>',
                    '<tpl if="stopped_at === null">',
                    'Started {[Ext.Date.format(values.started_at,"Y-m-d H:i:s")]}',
                    '<tpl else>',
                    'Execution time ~{[this.formatDate(values.started_at,values.stopped_at)]}',
                    '</tpl>'
                    ,{
                        formatName: function(name){
                            var res = name.split(".");
                            return res.pop();
                        },
                        formatDate: function(dstart,dstop){
                            // time difference in ms
                            var timeDiff = dstop - dstart;

                            // strip the miliseconds
                            timeDiff /= 1000;

                            // get seconds
                            var seconds = Math.round(timeDiff % 60);

                            // remove seconds from the date
                            timeDiff /= Math.round(60);

                            // get minutes
                            var minutes = Math.round(timeDiff % 60);

                            // remove minutes from the date
                            timeDiff /= Math.round(60);

                            // get hours
                            var hours = Math.round(timeDiff % 24);

                            // remove hours from the date
                            timeDiff /= Math.round(24);

                            // get days
                            var days = Math.round(timeDiff % 1);

                            if(days > 0){
                                return Ext.String.format('{0}D, {1}H, {2}M, {3} seconds',days,hours,minutes,seconds);
                            }
                            if(hours > 0){
                                return Ext.String.format('{0}H, {1} min, {2} seconds',hours,minutes,seconds);
                            }
                            if(minutes > 0){
                                return Ext.String.format('{0} min, {1} seconds',minutes,seconds);
                            }

                            return Ext.String.format('{0} seconds',seconds);
                        }
                    }
                ),
                flex:1
            },
            {
                xtype:'templatecolumn',
                componentCls: 'wps-status-icon',
                tdCls: 'wps-status-grid-cell',
                tpl: new Ext.XTemplate(
                    '<div class="wps-status-icon-{status}"></div>'
                ),
                width: 30
            }
        ]

        this.loading = new Ext.LoadMask(this, {msg:"Please wait..."});

        this.callParent(arguments);
    }

});
