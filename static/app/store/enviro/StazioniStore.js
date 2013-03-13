/**
 * Created with PyCharm.
 * User: shamar
 * Date: 12/09/12
 * Time: 12.04
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.store.enviro.StazioniStore', {
    extend: 'Ext.data.Store',

    model: 'Webgis.model.enviro.StazioniModel',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },

    data: [
        {"id":"B2440","name":"FONTANA BIANCA"},
        {"id":"B6130","name":"CORVARA IN BADIA"},
        {"id":"B8570","name":"BRONZOLO"},
        {"id":"B9100","name":"ANTERIVO"},
        {"id":"LAVIO","name":"PERGINE VAL SUGANA"},
        {"id":"POLSA","name":"LAVARONE"},
        {"id":"SMICH","name":"PEIO"},
        {"id":"T0001","name":"PASSO TONALE"},
        {"id":"T0010","name":"MALE'"},
        {"id":"T0014","name":"CLES"},
        {"id":"T0018","name":"MEZZOLOMBARDO"},
        {"id":"T0032","name":"PASSO COSTALUNGA"},
        {"id":"T0064","name":"CIMA PAGANELLA"},
        {"id":"T0083","name":"STRAMENTIZZO (DIGA)"},
        {"id":"T0090","name":"TRENTO (LASTE)"},
        {"id":"T0092","name":"SANT'ORSOLA"},
        {"id":"T0094","name":"MONTE BONDONE"},
        {"id":"T0099","name":"ROVERETO"},
        {"id":"T0102","name":"VALLARSA (DIGA DI SPECCHERI)"},
        {"id":"T0110","name":"BRENTONICO"},
        {"id":"T0129","name":"ALA (CONVENTO)"},
        {"id":"T0139","name":"DAONE (DIGA DI MALGA BISSINA)"},
        {"id":"T0147","name":"PASSO CAMPO CARLO MAGNO"},
        {"id":"T0149","name":"MONTE GROSTE' (RIFUGIO GRAFFER)"},
        {"id":"T0152","name":"TIONE (CENTRALE)"},
        {"id":"T0157","name":"BEZZECCA"},
        {"id":"T0168","name":"FOLGARIA"},
        {"id":"T0179","name":"MONTE BONDONE (GIARDINO BOTANICO)"},
        {"id":"T0189","name":"PASSO BROCON"},
        {"id":"T0193","name":"PASSO TONALE (METEO)"},
        {"id":"T0204","name":"CAVALESE"},
        {"id":"T0210","name":"STORO (LODRONE)"},
        {"id":"T0211","name":"DAONE (MALGA BISSINA)"},
        {"id":"T0327","name":"FORNI SAN GIACOMO"},
        {"id":"T0367","name":"BARDOLINO CALMASINO"},
        {"id":"T0373","name":"DOLCE'"}
    ]
});
