from django.conf.urls import patterns, url

urlpatterns = patterns('gswebgis.envigrid.views',
    url(r'^getcatalog$','getcatalog'),
    url(r'^computestat$','computestat'),
    url(r'^ttt','address'),
)