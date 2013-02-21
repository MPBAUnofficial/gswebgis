from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from models import WebGisPlugin
from webgis.setup import settings

from django.utils.translation import ugettext_lazy as _


class CMSWebGisPlugin( CMSPluginBase ):
    model = WebGisPlugin
    name = _("Webgis")
    render_template = "webgis/plugin.html"

    def render( self, context, instance, placeholder):
        context.update({
            'webgis': instance.webgis,
            'button_text': _("go to the application")
        })
        return context

if not settings.DISABLE_WEBGIS_PLUGIN:
    plugin_pool.register_plugin( CMSWebGisPlugin )
