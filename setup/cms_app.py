from cms.app_base import CMSApp
from cms.apphook_pool import apphook_pool

class WebgisApp(CMSApp):
    name = "Webgis"
    urls = ["webgis.setup.urls"] 

apphook_pool.register(WebgisApp)
