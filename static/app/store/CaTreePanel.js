Ext.define('Webgis.store.CaTreePanel', {
    extend:'Ext.data.TreeStore',
    model: 'Webgis.model.CaTreePanel',

    root:{
        text: "Indicatori Epidemiologici",
        expanded:true,
        children:[{
            text:"Casi incidenti",
            children:[
                {
                    text:"Mammella",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'ci',
                    sede: 'mammella',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                },
                {
                    text:"Colon",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'ci',
                    sede: 'colon',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                },
                {
                    text:"Pelle melanomi",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'ci',
                    sede: 'pelle_melanomi',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                },
                {
                    text:"Polmone",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'ci',
                    sede: 'polmone',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                },{
                    text:"Retto",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'ci',
                    sede: 'retto',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                }
            ]
        },{
            text:"Tasso grezzo",
            children:[
                {
                    text:"Mammella",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'tg',
                    sede: 'mammella',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                },
                {
                    text:"Colon",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'tg',
                    sede: 'colon',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                },
                {
                    text:"Pelle melanomi",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'tg',
                    sede: 'pelle_melanomi',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                },
                {
                    text:"Polmone",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'tg',
                    sede: 'polmone',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                },{
                    text:"Retto",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'tg',
                    sede: 'retto',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                }
            ]
        },{
            text:"Rischio relativo",
            children:[
                {
                    text:"Mammella",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'scr',
                    sede: 'mammella',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                },
                {
                    text:"Colon",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'scr',
                    sede: 'colon',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                },
                {
                    text:"Pelle melanomi",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'scr',
                    sede: 'pelle_melanomi',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                },
                {
                    text:"Polmone",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'scr',
                    sede: 'polmone',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                },{
                    text:"Retto",
                    checked: false,
                    leaf:true,
                    workspace: 'envirodb',
                    layer_name: 'scr',
                    sede: 'retto',
                    anno: '2002',
                    geourl: 'http://canceratlas.fbk.eu/geoserver/ows'
                }
            ]
        }]
    },

proxy:{
        type:'memory',
        reader:{
            type:'json'
        }
    }

});
