import site
from django.contrib import admin

from .models import *

admin.site.register(Cars)
admin.site.register(Locations)
admin.site.register(Cars_ARC)
admin.site.register(Cars_Rents)
admin.site.register(Cars_Reservation)