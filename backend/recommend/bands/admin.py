from django.contrib import admin

from .models import Band

admin.site.register(Band)
admin.site.site_header = "Recommendation Admin"