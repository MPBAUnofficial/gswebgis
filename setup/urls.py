from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = patterns('gswebgis.setup.views',
    url(r'^interface/(?P<webgis_id>\d+)', 'interface'),
    # url(r'^proxy/', 'proxy'),
    url(r'^f_search/','f_search'),
    url(r'^test/','test'),
)
