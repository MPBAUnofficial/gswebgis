from django.db import models
from webgis.envigrid.models import *
from webgis.envigrid.style import *
from django.utils.http import urlquote


class AmbitoSpaziale(models.Model):
    FORMATO_CODICE = (
        (u'v', u'Vettoriale'),
        (u'r', u'Raster'),
    )
    FORMATO_GRAFICO = (
        (u'Webgis.view.enviro.BaseChart', u'Grafico base enviro'),
        (u'Webgis.view.enviro.NoChart', u'Nessuno'),
    )
    label = models.CharField(max_length=50, help_text="Nome visualizzato in interfaccia")
    codice = models.CharField(max_length=20, help_text="Codice utilizzato per identificare univocamente l'ambito",
                              unique='TRUE')
    shape = models.CharField(max_length=50, help_text="Nome dello shapefile da utilizzare per questo ambito")
    grafico = models.CharField(max_length=100, help_text="Il tipo di grafico da utilizzare per questo ambito",
                               choices=FORMATO_GRAFICO)
    formato_layer = models.CharField(max_length=20,
                                     help_text="Formato del layer di riferimento utilizzato per per questo ambito",
                                     choices=FORMATO_CODICE)
    formato_data = models.CharField(max_length=10, blank="True", null="True",
                                    help_text="In caso di tipo vettoriale deve essere di tipo 'd'")
    ranking = models.IntegerField()

    class Meta:
        ordering = ["ranking"]

    def __unicode__(self):
        return '%s (%s)' % (self.label, self.codice)


class AmbitoTemporale(models.Model):
    label = models.CharField(max_length=50, help_text="Nome visualizzato in interfaccia")
    codice = models.CharField(max_length=20, help_text="Codice utilizzato per identificare univocamente l'ambito",
                              unique='TRUE')
    formato_data = models.CharField(max_length=20, help_text="Formato della data utilizzato")
    ranking = models.IntegerField()

    class Meta:
        ordering = ["ranking"]

    def __unicode__(self):
        return '%s (%s)' % (self.label, self.codice)


class AmbitoClimatico(models.Model):
    label = models.CharField(max_length=50)
    codice = models.CharField(max_length=20, help_text="Codice utilizzato per identificare univocamente l'ambito",
                              unique='TRUE')
    temperature_multiple = models.BooleanField(help_text="True se e' un ambito climatico futuro")
    nome_cartella_temperature = models.CharField(blank='true', null='true', max_length=50)
    nome_temperature_wps = models.CharField(blank='true', null='true', max_length=50)
    ranking = models.IntegerField()

    class Meta:
        ordering = ["ranking"]

    def __unicode__(self):
        return '%s (%s)' % (self.label, self.codice)


class AmbitoVariabile(models.Model):
    label = models.CharField(max_length=50)
    codice = models.CharField(max_length=50, help_text="Codice utilizzato per identificare univocamente l'ambito",
                              unique='TRUE')
    codice_style = models.CharField(max_length=50, help_text="Codice utilizzato per identificare univocamente lo style")
    icon = models.ImageField('Icona associata a questa variabile', upload_to='envigridicons', blank='True')
    url_geoserver_alternativo = models.TextField("Url preview risorsa esterna", blank='True', null='True')
    url_geoserver_base = models.TextField(blank='True', null='True')
    colour = models.TextField(blank='True', null='True')
    values = models.TextField(blank='True', null='TRUE')
    ranking = models.IntegerField()

    class Meta:
        ordering = ["ranking"]

    def __unicode__(self):
        return '%s (%s)' % (self.label, self.codice)


class CatalogoDati(models.Model):
    ambito_spaziale = models.ForeignKey(AmbitoSpaziale)
    ambito_temporale = models.ForeignKey(AmbitoTemporale)
    ambito_climatico = models.ForeignKey(AmbitoClimatico)
    ambito_variabile = models.ForeignKey(AmbitoVariabile)
    step_iniziale = models.CharField(max_length=100)
    step_finale = models.CharField(max_length=100)
    step = models.CharField(max_length=100)
    grafico = models.CharField(max_length=50,blank='True',null='True')
    layer_workspace = models.CharField(max_length=150, blank='True', null='True')

    def _get_full_codice(self):
        return '%s_%s_%s_%s' % (self.ambito_temporale.codice, self.ambito_climatico.codice, self.ambito_spaziale.codice,
                                self.ambito_variabile.codice)

    full_codice = property(_get_full_codice)

    def _get_full_label(self):
        return '%s su %s per %s' % (
            self.ambito_variabile.label, self.ambito_temporale.label, self.ambito_spaziale.label)

    full_label = property(_get_full_label)

    def _get_full_style(self):
        # if self.ambito_spaziale.formato_layer == "v":
            # style = create_xml(self.full_codice, "~~DATA~~", self.ambito_variabile.colour.split("|"),
            #                    self.ambito_variabile.values.split("|"))
        # else:
            #style = '%s_%s' % (self.ambito_variabile.codice, self.ambito_spaziale.formato_layer)
        style = '%s_%s_%s' % (self.ambito_temporale.codice,self.ambito_variabile.codice_style, self.ambito_spaziale.formato_layer)
            #style = self.ambito_variabile.codice_style
        return style

    full_style = property(_get_full_style)

    def _get_ambito_variabile_icon(self):
        if self.ambito_variabile.icon != "":
            icon = self.ambito_variabile.icon.url
        elif self.ambito_variabile.url_geoserver_alternativo != "":
            icon = self.ambito_variabile.url_geoserver_alternativo
        elif self.ambito_spaziale.formato_layer == "v":
            #style = urlquote(self.full_style)
            icon = '%s?HEIGHT=72&WIDTH=72&LAYERS=%s:%s&STYLES=ammcom&SRS=EPSG:32632&FORMAT=image/png&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&BBOX=612484.75,5059669.0575215,728617.312,5156975.4424785' % (
                self.geoserver_url, self.layer_workspace, self.full_codice)
        else:
            icon = '%s?HEIGHT=72&WIDTH=72&LAYERS=%s:%s&STYLES=%s&SRS=EPSG:32632&FORMAT=image/png&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&BBOX=612484.75,5059669.0575215,728617.312,5156975.4424785' % (
                self.geoserver_url, self.layer_workspace, self.full_codice, self.full_style)
        return icon

    icon_url = property(_get_ambito_variabile_icon)

    def _get_geoserver_url(self):
        if self.ambito_variabile.url_geoserver_base != "":
            geoserver = self.ambito_variabile.url_geoserver_base
        else:
            geoserver = "http://enviro.fbk.eu/geoserver/climate/ows"
        return '%s' % (geoserver)

    geoserver_url = property(_get_geoserver_url)

    def _get_full_colour(self):
        return '%s' % (self.ambito_variabile.colour)

    full_colour = property(_get_full_colour)

    def _get_full_values(self):
        return '%s' % (self.ambito_variabile.values)

    full_values = property(_get_full_values)

    def __unicode__(self):
        return '%s_%s_%s_%s' % (
            self.ambito_temporale, self.ambito_climatico, self.ambito_spaziale, self.ambito_variabile)

