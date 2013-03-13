Ext.define('Webgis.class.SldCreator' ,{
    config: {
        starterId: 'bodyloading',
        textId: 'textloading',
        text: 'Loading starter...',
        isVisible: true
    },

    constructor: function(config){
        this.initConfig(config);
        return this;
    },

    applyText: function(text){
        if(!Ext.isString(text) || text.length === 0){
            alert('Error: Text must be a valid non-empty string');
        } else {
            Ext.get(this.textId).update(text);
            //return text;
        }
    },

    applyIsVisible: function(isVisible){
        if(this.isVisible === isVisible){
            alert('Error: Starter is already not visible');
        } else {
            if (isVisible) {
                Ext.get(this.starterId).fadeIn();
            } else {
                Ext.get(this.starterId).fadeOut();
                Ext.get(this.starterId).setVisible(isVisible);
            }

            return isVisible
        }
    }
});