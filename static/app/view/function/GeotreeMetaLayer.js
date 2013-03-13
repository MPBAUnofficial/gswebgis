Ext.define('Webgis.view.function.GeotreeMetaLayer', {
    extend: 'Ext.window.Window',
    alias : 'widget.geotreemetalayer',

    layout: 'fit',
    border: false,

    width: 600,
    height: 350,

    autoShow: true,

    hidden: false,

    margin: '10 10 10 10',

    cls: 'x-geotree-metadata',

    shadow: false,
//    closeAction: 'hide',
    tpl: new Ext.XTemplate(
        '<div class="x-geotree-metadata-body">',
        '<h2>#{id}. {title}</h2>',
        '<hr/>',
        '<div class="x-geotree-description"><tpl if="description">{description}</tpl></div>',
        '<div><tpl if="category">{category}</tpl></div>',
        '<h3>Informazioni geografiche</h3>',
        '<ul>',
            '<li>SRS: <tpl if="ref_system">{ref_system}</tpl></li>',
            '<li>Extent: <tpl if="extent">{extent}</tpl></li>',
            '<li>Unita\' di misura: <tpl if="measure_unit">{measure_unit}</tpl></li>',
            '<li>Risoluzione: <tpl if="spatial_resolution">{spatial_resolution}</tpl></li>',
        '</ul>',
        '<h3>Informazioni di contatto</h3>',
        '<ul>',
        '<li>Autore: <tpl if="author">{author}</tpl></li>',
        '<li>Fonte: <tpl if="source">{source}</tpl></li>',
        '<li>Disponibilita\': <tpl if="availability">{availability}</tpl></li>',
        '</ul>',
        '<h3>Informazioni sulla creazione</h3>',
        '<ul>',
        '<li>Anno di riferimento: <tpl if="ref_year">{ref_year}</tpl></li>',
        '<li>Anno di creazione: <tpl if="source">{source}</tpl></li>',
        '<li>Formato nativo: <tpl if="native_format">{native_format}</tpl></li>',
        '<li>Storia del tematismo: <tpl if="genealogy">{genealogy}</tpl></li>',
        '</ul>',
        '</div>'
    ),

    title: 'Scheda metadato',
    initComponent: function() {
        this.callParent(arguments);
    }

});
