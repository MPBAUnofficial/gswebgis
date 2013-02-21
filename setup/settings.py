from django.conf import settings as django_settings

"""
    This let to disable the WebGis plugin in the project main settings.py
    Default to false
"""
DISABLE_WEBGIS_PLUGIN = getattr(django_settings, 
                                'WEBGIS_DISABLE_CMSPLUGIN', False)
