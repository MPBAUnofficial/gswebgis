from webgis.envigrid.models import *
from django.http import HttpResponse
from django.core import serializers
from statistiche_tgrd import Statistiche as tgrdstat
from statistiche_pgrd import Statistiche as pgrdstat
from style import create_xml
import os, json


def getcatalog(request):
	get = request.GET
	
	catalog = CatalogoDati.objects.filter(ambito_spaziale=get['ambito_spaziale_id'],ambito_temporale=get['ambito_temporale_id'],ambito_climatico=get['ambito_climatico_id'])
	
	results = serializers.serialize("json",catalog,ensure_ascii=True,indent=4,extras=('full_codice','full_label','icon_url','full_style','full_colour','full_values','geoserver_url'))

	return  HttpResponse(results)
	
def style(request):
	get = request.GET
	
	values = get['values'].split('|')
	colour = get['colour'].split('|')
	
	xml = create_xml(get['layer_name'],get['col_name'],colour, values)
	
	return HttpResponse(xml)

def computestat(request):
    	STAZIONE_ID = request.GET['stazione_id']
	AMBITO = request.GET['ambito_climatico']
	
	STAT_DB_ROOT = os.path.join(os.path.dirname(os.path.realpath(__file__)),'statdb')
	

	if(AMBITO == "30gen_2021_2050"):
		ANNOMIN = 2021
		ANNOMAX = 2022
	else:
		ANNOMIN = 2073
		ANNOMAX = 2074

	st = tgrdstat(os.path.join(STAT_DB_ROOT,"temperature",AMBITO))
	sp = pgrdstat(os.path.join(STAT_DB_ROOT,"precipitation",AMBITO))
	stagionalit,mensilit,winklert = st.compute_statistics(STAZIONE_ID,ANNOMIN,ANNOMAX);
	stagionalip,mensilip = sp.compute_statistics(STAZIONE_ID,ANNOMIN,ANNOMAX);


	liste_winkler_t=[]
	gen_sorted=sorted(winklert.iterkeys())
	for gen in gen_sorted:
		liste_winkler_t.append([gen]+winklert[gen])
	liste_mesi_t=[]
	gen_sorted=sorted(mensilit.iterkeys())
	for gen in gen_sorted:
		liste_mesi_t.append([gen]+mensilit[gen])
	liste_stagioni_t=[]
	gen_sorted=sorted(stagionalit.iterkeys())
	for gen in gen_sorted:
		liste_stagioni_t.append([gen]+stagionalit[gen])
	liste_mesi_p=[]
	gen_sorted=sorted(mensilip.iterkeys())
	for gen in gen_sorted:
		liste_mesi_p.append([gen]+mensilip[gen])
	liste_stagioni_p=[]
	gen_sorted=sorted(stagionalip.iterkeys())
	for gen in gen_sorted:
		liste_stagioni_p.append([gen]+stagionalip[gen])

	liste_mesi = []
	for i,val in enumerate(liste_mesi_t):
		liste_mesi.append(val + liste_mesi_p[i][1:])
	

	results={"success":True, "data":{"stagionit":liste_stagioni_t,"winklert":liste_winkler_t,"mesit":liste_mesi_t,"stagionip":liste_stagioni_p,"mesip":liste_mesi_p,"mesi":liste_mesi}}
		
	
	return HttpResponse(json.dumps(results))


def address(request,address):
	import urllib2
	f = urllib2.urlopen(request.GET.get('address', ''))


	return HttpResponse(f.read())