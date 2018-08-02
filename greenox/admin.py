from leaflet.admin import LeafletGeoAdmin
from django.contrib import admin

from . import models as greenox_models


admin.site.register(greenox_models.GreenSite, LeafletGeoAdmin)
