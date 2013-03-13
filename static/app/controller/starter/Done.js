/**
 * Created with PyCharm.
 * User: shamar
 * Date: 09/10/12
 * Time: 10.19
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with PyCharm.
 * User: shamar
 * Date: 09/10/12
 * Time: 10.00
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.controller.starter.Done', {
    extend: 'Ext.app.Controller',


    init: function() {

        this.control({
            '#webgiscenter': {
                afterlayout: {
                    fn:this.onPanelRendered,
                    scope: this,
                    single:true
                }
            }
        });

    },
    onPanelRendered: function(){
        var task = new Ext.util.DelayedTask(function(){
            starter.applyIsVisible(false)
        });
       task.delay(1000);
    }
});
