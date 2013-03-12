# Create your views here.
from multiprocessing.dummy import list
from django.http import HttpResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from webgis.envigrid.models import *
from webgis.setup.models import *
#from webgis.envigrid.models import *
from django.template import RequestContext, loader
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from tojson import render_to_json
from gsgisng import settings


#@login_required
def interface(request,webgis_id):
    config = Config.objects.get(site=settings.SITE_ID)
    webgis = get_object_or_404(WebGis,pk=webgis_id)
    maps = webgis.map_set.all()
    webgisinfo = ContextualInfo.objects.filter(webgis=webgis.id)

    #WEBGIS CATALOGO DATI
    catalogodati = CatalogoDatiW.objects.all()
    catalogobase = CatalogoBase.objects.all()

#    #enviro
    ambito_spaziale = AmbitoSpaziale.objects.all()
    ambito_climatico = AmbitoClimatico.objects.all()
    ambito_temporale = AmbitoTemporale.objects.all()
    ambito_variabile = AmbitoVariabile.objects.all()

    results = list(maps) + list([webgis]) + list(webgisinfo) + list(catalogodati) + list(catalogobase) + list([config])
    # results = results + list(ambito_spaziale) + list(ambito_climatico) + list(ambito_temporale) + list(ambito_variabile)

    t = loader.get_template('webgis/webgisinterface.html')
    c = RequestContext(request, {
        'maps': serializers.serialize("json",results,ensure_ascii=True,indent=4,extras=('mapbaselayer_set','introinformationelement_set'),relations=('max_extent'))
    })

    return  HttpResponse(t.render(c))


@render_to_json()
@login_required
def f_search(request):
    query = request.GET['query']
    result = Locview.fuzzy.f_search(query,"deno",2)

    return [obj.to_dict() for obj in result]

PROXY_FORMAT = u'%s%%s' % (settings.SKI_WMS_PROXY_DEST)
PROXY_FORMAT_LOCAL = u'%s%%s' % (settings.SKI_WMS_PROXY_50006)
PROXY_FORMAT_TOMCAT = u'%s%%s' % (settings.SKI_TOMCAT_PROXY_LOCAL)
PROXY_FORMAT_APACHE = u'%s%%s' % (settings.SKI_APACHE_PROXY_LOCAL)

@csrf_exempt
def geoserver(request, path):
    from warnings import warn
    if (not settings.DEBUG):
        warn('This proxy should not be used in a deploy environment. Use your http server instead.')

    import httplib2

    conn = httplib2.Http()

    url_ending = '%s?%s' % (path, request.GET.urlencode())
    url = PROXY_FORMAT % url_ending
    if request.method == 'GET':
        response, content = conn.request(url, request.method)
    elif request.method == 'POST': #in ('POST', 'PUT', .....)
        data = request.body
        response, content = conn.request(url, request.method, data)
    return HttpResponse(content, status=int(response['status']), mimetype=response['content-type'])

@csrf_exempt
@login_required
def geolocal(request, path):
    from warnings import warn
    if (not settings.DEBUG):
        warn('This proxy should not be used in a deploy environment. Use your http server instead.')

    import httplib2

    conn = httplib2.Http()

    url_ending = '%s?%s' % (path, request.GET.urlencode())
    url = PROXY_FORMAT_LOCAL % url_ending
    if request.method == 'GET':
        response, content = conn.request(url, request.method)
    elif request.method == 'POST': #in ('POST', 'PUT', .....)
        data = request.body
        response, content = conn.request(url, request.method, data)
    return HttpResponse(content, status=int(response['status']), mimetype=response['content-type'])

@csrf_exempt
@login_required
def tomcat(request, path):
    from warnings import warn
    if (not settings.DEBUG):
        warn('This proxy should not be used in a deploy environment. Use your http server instead.')

#    import httplib2
#
#    conn = httplib2.Http()
#
#    url_ending = '%s?%s' % (path, request.GET.urlencode())
#    url = PROXY_FORMAT_TOMCAT % url_ending
#    if request.method == 'GET':
#        response, content = conn.request(url, request.method)
#    elif request.method == 'POST': #in ('POST', 'PUT', .....)
#        data = request.body
#        response, content = conn.request(url, request.method, data)

    xml = '<?xml version="1.0" encoding="UTF-8"?> \
<ns:ExecuteResponse xmlns:ns="http://www.opengis.net/wps/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_response.xsd" serviceInstance="http://geocalc.fbk.eu:8080/wps/WebProcessingService?REQUEST=GetCapabilities&amp;SERVICE=WPS" xml:lang="en-US" service="WPS" version="1.0.0"><ns:Process ns:processVersion="2"><ns1:Identifier xmlns:ns1="http://www.opengis.net/ows/1.1">org.n52.wps.server.algorithm.FBK.WFSCropBuffer</ns1:Identifier><ows:Title xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink">WFS-Buffer Crop and Sum</ows:Title></ns:Process><ns:Status creationTime="2013-01-31T11:50:07.585+01:00"><ns:ProcessSucceeded>The service succesfully processed the request.</ns:ProcessSucceeded></ns:Status><ns:ProcessOutputs><ns:Output><ns1:Identifier xmlns:ns1="http://www.opengis.net/ows/1.1">TOTAL_BUFFER_SUM</ns1:Identifier><ows:Title xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink">Total Sum</ows:Title><ns:Data><ns:LiteralData>-1</ns:LiteralData></ns:Data></ns:Output><ns:Output><ns1:Identifier xmlns:ns1="http://www.opengis.net/ows/1.1">GEOJSON_CROP_BUFFER</ns1:Identifier><ows:Title xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink"/><ns:Data><ns:LiteralData/></ns:Data></ns:Output></ns:ProcessOutputs></ns:ExecuteResponse>'

    return HttpResponse(xml, status=200, mimetype='text/xml')

@csrf_exempt
@login_required
def apache(request, path):
    from warnings import warn
    if (not settings.DEBUG):
        warn('This proxy should not be used in a deploy environment. Use your http server instead.')

    import httplib2

    conn = httplib2.Http()

    url_ending = '%s?%s' % (path, request.GET.urlencode())
    url = PROXY_FORMAT_APACHE % url_ending
    if request.method == 'GET':
        response, content = conn.request(url, request.method)
    elif request.method == 'POST': #in ('POST', 'PUT', .....)
        data = request.body
        response, content = conn.request(url, request.method, data)
    return HttpResponse(content, status=int(response['status']), mimetype=response['content-type'])

@csrf_exempt
@login_required
def proxy(request):
    from warnings import warn
    if (not settings.DEBUG):
        warn('This proxy should not be used in a deploy environment. Use your http server instead.')

    import httplib2

    conn = httplib2.Http()

    url = request.GET['url']
    if request.method == 'GET':
        response, content = conn.request(url, request.method)

    return HttpResponse(content, status=int(response['status']), mimetype=response['content-type'])