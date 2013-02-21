from webgis.setup.models import *
from django.contrib import admin

from django.utils.translation import ugettext_lazy as _


class ConfigAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Sito',{'fields':['site']}),
        (None,  {'classes':('wide',),'fields': [('long_name','short_name'),('project_logo','logo_visibile'),'description']},),
        ('Copyright information',{'fields':[('copyright','copyright_year','copyright_logo')]}),
        (_('Version'),{'fields':['version']}),
        ]

class MapBaseLayerAdmin(admin.StackedInline):
    extra = 0
    model = MapBaseLayer
    fieldsets = [
        (None,{'classes':('wide',),'fields':['layer_name','layer_label','layer_tip']},),
        (_('GetMap options'),{'fields':[('geoserver_workspace','geoserver_url','styles'),('format','srs'),'transparent','style_url']},),
        (_('Openlayer options'),{'fields':[('tile_size','transition_effect'),('is_base_layer','display_in_layer_switcher','single_tile','visibility')]},),
    ]

class MapAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,  {'classes':('wide',),'fields': ['webgis','projection','units','max_resolution','num_zoomlevel','max_extent']},),
        (_('Center map'),  {'classes':('wide',),'fields': ['center_level_zoom','center_x','center_y']},),
    ]
    inlines = [MapBaseLayerAdmin]

class MaxExtentAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,  {'classes':('wide',),'fields': ['location_name']},),
        (_('Bounding boxes'),  {
            'fields': [('left','bottom'),('right','top')],
            'description': _('Sets the edges to display in the map <br/>Es left=612167, botom=5059545, right=728567, top=5157345')
        },),
    ]

class ConfigWebGis(admin.ModelAdmin):
    fieldsets = [
        (_('Webgis configuration'),{'fields':['config','title','description','image','synchronize_maps']})
    ]

admin.site.register(Config, ConfigAdmin,)
admin.site.register(Map, MapAdmin,)
admin.site.register(MaxExtent, MaxExtentAdmin,)
admin.site.register(MapBaseLayer,)
admin.site.register(CatalogoBase,)
admin.site.register(CatalogoDatiW,)
admin.site.register(WebGis,ConfigWebGis)
admin.site.register(ContextualInfo,)
