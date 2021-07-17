from django.contrib import admin

from .models import Item

admin.site.register(Item)
admin.site.site_header = "Recommendation Admin"