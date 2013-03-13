/**
 * Created with PyCharm.
 * User: shamar
 * Date: 14/09/12
 * Time: 16.39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webgis.model.enviro.MensiliModelPgrd', {
    extend: 'Ext.data.Model',
    fields: ['id',
        {name: 'p1',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        },
        {name: 'p2',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        },
        {name: 'p3',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        },
        {name: 'p4',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        },
        {name: 'p5',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        },
        {name: 'p6',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        },
        {name: 'p7',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        },
        {name: 'p8',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        },
        {name: 'p9',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        },
        {name: 'p10',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        },
        {name: 'p11',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        },
        {name: 'p12',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        },
        {name: 'p13',
            type: 'float',
            convert: function(value, record) {
                return Ext.util.Format.round(value,2);
            }
        }]
});