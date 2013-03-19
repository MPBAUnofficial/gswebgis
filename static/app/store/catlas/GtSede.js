/**
 * Created with PyCharm.
 * User: droghetti
 * Date: 3/18/13
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.store.catlas.GtSede', {
    extend: 'Ext.data.Store',

    model: 'Webgis.model.catlas.GtSede',

    autoLoad: true,

//    proxy: {
//        type: 'ajax',
//        url: '/api/layer/',
//        reader: {
//            type: 'json',
//        }
//    },

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },

    sorters: [
        {
            property : 'label',
            direction: 'ASC'
        }
    ],

    data: [
        {"id": 1, "label": "Labbro"},
        {"id": 2, "label": "VADS (Vie aerodigestive superiori)"},
        {"id": 8, "label": "Ghiandole salivari"},
        {"id": 16, "label": "Esofago"},
        {"id": 17, "label": "Stomaco"},
        {"id": 18, "label": "Intestino tenue"},
        {"id": 19, "label": "Colon"},
        {"id": 20, "label": "Retto"},
        {"id": 23, "label": "Fegato"},
        {"id": 24, "label": "Vie biliari"},
        {"id": 26, "label": "Pancreas"},
        {"id": 27, "label": "Mal definite e metastasi"},
        {"id": 28, "label": "Cavità nasali"},
        {"id": 31, "label": "Polmone"},
        {"id": 33, "label": "Altri organi toracici"},
        {"id": 36, "label": "Osso"},
        {"id": 38, "label": "Pelle, melanomi"},
        {"id": 39, "label": "Pelle, non melanomi"},
        {"id": 40, "label": "Mesotelioma"},
        {"id": 41, "label": "Sarcoma di Kaposi"},
        {"id": 42, "label": "Tessuti molli"},
        {"id": 45, "label": "Mammella"},
        {"id": 46, "label": "Altri genitali femminili"},
        {"id": 48, "label": "Utero, cervice"},
        {"id": 49, "label": "Utero, corpo"},
        {"id": 50, "label": "Utero, NAS"},
        {"id": 51, "label": "Ovaio"},
        {"id": 53, "label": "Placenta"},
        {"id": 54, "label": "Pene"},
        {"id": 55, "label": "Prostata"},
        {"id": 56, "label": "Testicolo"},
        {"id": 57, "label": "Altri genitali maschili"},
        {"id": 58, "label": "Rene, vie urinarie"},
        {"id": 61, "label": "Vescica"},
        {"id": 63, "label": "Occhio"},
        {"id": 64, "label": "Encefalo e altro SNC"},
        {"id": 67, "label": "Tiroide"},
        {"id": 68, "label": "Altre ghiandole endocrine"},
        {"id": 75, "label": "Linfoma di Hodgkin"},
        {"id": 76, "label": "Linfoma non Hodgkin"},
        {"id": 80, "label": "Mieloma"},
        {"id": 82, "label": "Leucemie"}
    ]
});
