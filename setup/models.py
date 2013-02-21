from django.db import models
from django.contrib.sites.models import Site
from django.conf import settings
from cms.models import CMSPlugin
from pg_fuzzysearch.models import PgFuzzySearchManager
from filer.fields.image import FilerImageField

from django.utils.translation import ugettext_lazy as _


class Config(models.Model):
    site = models.OneToOneField(Site,default=settings.SITE_ID)

    long_name = models.CharField(
                                  _('project name'),
                                  max_length=200,
                                  default=_('Webgis for analisi by Mpba')
                                ) 
 
    short_name = models.CharField(
                                   _('code name (abbreviation)'),
                                   max_length=40
                                 ) 
           
    project_logo = FilerImageField(
                                    verbose_name = _('project logo'), 
                                    blank = 'TRUE',
                                    null = 'TRUE',
                                    related_name = "project_logo"
                                  )  

    logo_visibile = models.BooleanField(
                                         _('show logo in place of name'),
                                         default='FALSE'
                                       ) 

    description = models.CharField( 
                                    _('description'),
                                    max_length=250,
                                    blank='TRUE',
                                  )

    version = models.CharField(
                                _('version'),
                                max_length=20,
                                default='1.0.0'
                              )
 
    copyright = models.CharField \
                           (
                             'copyright',
                             max_length=200,
                             default=_('developed by MPBA GROUP - mpba@fbk.eu')
                           )

    copyright_year = models.IntegerField(_('copyright year'),)

    copyright_logo = FilerImageField(
                                      verbose_name = 'logo copyright', 
                                      blank='TRUE', 
                                      null='TRUE',
                                      related_name = "copyright_logo"
                                    )

    def __unicode__(self):
        return self.site.name

    class Meta:
        verbose_name = _('base configuration') 
        verbose_name_plural = _('base configurations') 



class WebGis(models.Model):
    config = models.ForeignKey(Config, verbose_name=_('configuration'))
    title = models.CharField(_('title'),max_length=100)

    description = models.TextField \
                             (
                               _('description'), 
                               help_text=_("press enter to leave a blank line")
                             )

    image = FilerImageField(verbose_name = _('image'))
                             

    synchronize_maps = models.BooleanField \
                 (
                   _('synchronize maps'), 
                   default='FALSE',
                   help_text=_( 'with two or more maps, it establish if it ' \
                                'is necessary to synchronize those maps ' \
                                'with the base map (id = 1)')
                 ) 

    def __unicode__(self):
        return self.title

    class Meta:
        verbose_name = 'webgis'
        verbose_name_plural = 'webgis'



class MaxExtent(models.Model):
    location_name = models.CharField(
                                      _('location name'), 
                                      max_length=50, 
                                      blank='TRUE',
                                      unique='True'
                                    )

    left = models.FloatField(_('left'))
    bottom = models.FloatField(_('bottom'))
    right = models.FloatField(_('right'))
    top = models.FloatField(_('top'))

    def __unicode__(self):
        return  self.location_name

    class Meta:
        ordering = ['location_name']
        verbose_name = _('max extent')
        verbose_name_plural = _('max extents') 



class Map(models.Model):
    UNIT_CHOICES = (
        (u'm', _(u'Meters')),  
        (u'dd', _(u'Degrees')),  
        (u'ft', _(u'Feet')),  
        (u'inches', _(u'Inches')), 
        (u'km', _(u'Kilometers')), 
        (u'mi', _(u'Miles')),   
        )

    webgis = models.ForeignKey(WebGis)

    max_extent = models.OneToOneField \
                    (
                      MaxExtent,
                      help_text=_('leave it blank if you do not want to ' \
                                  'limit the area of the map to a given area'), 
                      verbose_name=_('max extent')
                    ) 

    projection = models.IntegerField \
                    (
                      _('Projection'),
                      help_text=_('need to be a valid SRS code ( please ' \
                                  'see OGC standard). Es: 32632 for WGS ' \
                                  'UTM 84 - Zone 32 Nord')
                    ) 

    units = models.CharField \
                    (
                      _('units'), 
                      max_length=6,
                      choices=UNIT_CHOICES,
                      help_text=_('select the value that correspond to ' \
                                  'the specified SRS')
                    ) 

    max_resolution = models.CharField \
                    (
                      _('max resolution'), 
                      max_length=20,    
                      default='auto',
                      help_text=_('default is 360deg/256px as level 0 of ' \
                                  'googlemaps. We suggest to leave it "auto"')
                    ) 

    num_zoomlevel = models.IntegerField \
                    (
                      _('value of zoom'), 
                      default=10,
                      help_text=_('usually a value between 10 and 16')
                    )   

    center_level_zoom = models.IntegerField \
                    (
                      _('zoom'),
                      blank='TRUE',
                      null='true',
                      help_text=_('leave it blank if you do not need to ' \
                                  'center in a particular area')
                    ) 

    center_x = models.FloatField('X',blank='true',null='true')
    center_y = models.FloatField('Y',blank='true',null='true')

    def _get_epsg_code(self):
        return 'EPSG:%s' % (self.projection)

    epsgcode = property(_get_epsg_code)

    def __unicode__(self):
        return 'Map %s - EPSG:%s' % (self.id,self.projection)

    class Meta:
        ordering = ['id']
        verbose_name = _('map')
        verbose_name_plural = _('maps') 



class MapBaseLayer(models.Model):
    FORMAT_CHOICES = (
        (u'image/png', _(u'PNG image')),    
        (u'image/jpeg', _(u'JPEG image')),   
    )

    mapfk = models.ForeignKey(Map)

    layer_name = models.CharField \
            ( 
              _('layer name'), 
              max_length=250,
              help_text=_('corresponds to the name of the layer indexed ' \
                          'by the geoserver')
            ) 

    layer_label = models.CharField \
            (
              _('layer label'),
              max_length=250,
              help_text=_('corresponds to the name of the layer that is ' \
                          'displayed for the user')
            )

    layer_tip = models.CharField \
            (
              _('layer tip'), 
              max_length=250,
              blank='TRUE',
              null='TRUE',
              help_text=_('corresponds to the tips that appears when ' \
                          'leaving the mouse stopped over the layer')
            )

    geoserver_workspace = models.CharField \
            (
              _('geoserver workspace'), 
              max_length=250,
              null='TRUE',
              blank='TRUE',
              help_text=_('workspace name')
            ) 

    geoserver_url = models.URLField(_('geoserver url'), max_length=250)

    format = models.CharField \
            (
              _('format'), 
              max_length=20,
              choices=FORMAT_CHOICES,
              default='image/png',
              help_text=_('represents the type of image to be requested ' \
                          'to the GeoServer')
            )

    srs = models.IntegerField \
            (
              _('srs'), 
              blank='TRUE',
              null='TRUE',
              help_text=_('indicates whether the map should be request ' \
                          'with an EPSG code different from the one set ' \
                          'for the map')
            ) 

    transparent = models.BooleanField(_('transparent'), default='TRUE')

    styles = models.CharField \
            (
              _('styles'), 
              max_length=250,
              null='TRUE',
              blank='TRUE',
              help_text=_('indicates whether the map should be request ' \
                          'with a different style from the one set in ' \
                          'geoserver')
            )

    buffer = models.IntegerField \
            (
              _('buffer'), 
              default=0,
              help_text=_('indicates the buffer of tiles that need to ' \
                          'be request from outside the area shown in the ' \
                          'map. Values > 3 are not recommended')
            )  

    is_base_layer = models.BooleanField \
            (
              _('is base layer'), 
              default='FALSE',
              help_text=_('each map must contain at least one ' \
                          'baselayer as background')
            ) 

    single_tile = models.BooleanField(_('single tile'), default='TRUE')

    transition_effect = models.CharField \
            (
              _('transition effect'), 
              max_length=10,
              blank='TRUE',
              null='TRUE',
              help_text=_('set to "effetc" to get a transition effect ' \
                          'like google maps. Recommended only on the base ' \
                          'layer')
            ) 

    display_in_layer_switcher = models.BooleanField \
            (
              _('display in layer switcher'), 
              default='TRUE',
              help_text=_('indicates whether the layer will be visible ' \
                          'in the tree of active thematics')
            )

    tile_size = models.IntegerField \
            (
              _('tile size'), 
              default=512,
              help_text=_('indicates the size of single tiles')
            ) 

    visibility = models.BooleanField(_('visible'), default='TRUE')
    style_url = models.TextField(_('style url'), blank='TRUE',null='NULL')

    def _get_epsg_code(self):
        return 'EPSG:%s' % (self.srs)
    epsgcode = property(_get_epsg_code)

    def __unicode__(self):
        return '%s. %s (%s)' % (self.id,self.layer_label,self.layer_name)

    class Meta:
        verbose_name = _('map base layer')
        verbose_name_plural = _('map base layers')  



class ContextualInfo(models.Model):
    webgis = models.OneToOneField(WebGis)
    title = models.CharField(_('title'), max_length=100)
    context = models.CharField(_('context'), max_length=50)
    body = models.TextField(_('body'))

    def __unicode__(self):
        return self.title

    class Meta:
        verbose_name = _('contextual info') 
        verbose_name_plural = _('contextual info') 



class CatalogoBase(models.Model):
    webgis = models.ForeignKey(WebGis)
    name_layer = models.CharField(_('layer name'), max_length=250)

    geoserver_workspace = models.CharField \
                (
                  _('geoserver workspace'), 
                  max_length=250,
                  blank='True',
                  null='True',
                  help_text=_('indicates the name of the workspace in ' \
                              'which the layer is present. Leave it blank ' \
                              'if it is not necessary to specify the workspace')
                ) 

    geoserver_url = models.URLField \
                (
                  _('geoserver url'), 
                  max_length=250,
                  default='http://enviro.fbk.eu/geoserver/land/wms'
                )

    buffer = models.IntegerField(_('buffer'), default=0)

    text = models.CharField \
                (
                  _('text'), 
                  max_length=100,
                  help_text=_('name to display to the user for this layer')
                ) 

    style = models.CharField(
                              _('style'), 
                              max_length=150,
                              blank='True',
                              null='True'
                            )

    preview = models.TextField(_('preview'), blank='True',null='True')

    def __unicode__(self):
        return self.name_layer

    class Meta:
        verbose_name = _('base catalog')
        verbose_name_plural= _('base catalogs')  



class CatalogoDatiW(models.Model):
    webgis = models.ForeignKey(WebGis)
    name_layer = models.CharField(_('layer name'), max_length=250)

    geoserver_workspace = models.CharField \
                (
                  'geoserver workspace', 
                  max_length=250,
                  blank='True',
                  null='True',
                  help_text=_('indicates the name of the workspace in ' \
                              'which the layer is present. Leave it blank ' \
                              'if it is not necessary to specify the workspace')
                )

    geoserver_url = models.URLField \
                (
                  _('geoserver url'), 
                  max_length=250,
                  default='http://enviro.fbk.eu/geoserver/land/wms' 
                ) 

    buffer = models.IntegerField('buffer', default=0)

    text = models.CharField \
                (
                  _('text'), 
                  max_length=100,
                  help_text=_('name to display to the user for this layer')
                ) 

    style = models.CharField(
                              _('style'), 
                              max_length=150,
                              blank='True',
                              null='True'
                            )

    preview = models.TextField(_('preview'),blank='True',null='True')

    def __unicode__(self):
        return self.name_layer

    class Meta:
        verbose_name = _('dataW catalog') 
        verbose_name_plural = _('dataW catalogs') 



class Locview(models.Model):
	gid = models.IntegerField(primary_key=True)
	deno = models.CharField(max_length=80, blank=True)
	comune = models.CharField(max_length=80, blank=True)
	codice = models.CharField(max_length=80, blank=True)
	x = models.FloatField(null=True, blank=True)
	y = models.FloatField(null=True, blank=True)
	fuzzy = PgFuzzySearchManager("deno")

	def to_dict(self):
		return {'deno':self.deno,
                'x':self.x,
                'y':self.y}
	
	class Meta:
		db_table = u'locview'
        verbose_name = _('locview') 
        verbose_name_plural = _('locviews')



class WebGisPlugin(CMSPlugin):
    webgis = models.ForeignKey(WebGis)
    
    def __unicode__(self):
        return _(u'showing %(name)s webgis') % {'name': self.webgis.title}

