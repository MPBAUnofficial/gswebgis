Ext.define('Webgis.view.function.FuzzySearch', {
    extend: 'Ext.form.ComboBox',
    alias : 'widget.fuzzysearch',

    border: false,

    typeAhead: false,
    hideLabel: true,
    hideTrigger:false,

    frame: true,

    fieldLabel: 'Find on map',

    emptyText: 'Search on map...',
    height: 25,
    width: 300,

    margin: '0 25 0 0',

    cls: 'x-fuzzy-search-root',
    triggerBaseCls: 'x-fuzzy-search-trigger',
    multiSelect: false,


    listConfig: {
        loadingText: 'Searching...',
        emptyText: 'No matching locations found.',
        cls: 'x-fuzzy-search',
        // Custom rendering template for each item
        getInnerTpl: function() {
            return '{deno}';
        }
    },
    initComponent: function() {

        this.callParent(arguments);
    }
});
