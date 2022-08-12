from django.contrib import admin
from .models import Vehicles
# Register your models here.

class VehicleAdmin(admin.ModelAdmin):
    list_display = (
        'vehicle_name',
        'slug',
        'brand',
        'model',
        'price',
        'imgUrl',
        'speed',
        'seat_type',
        'transmission',
        'description',
        'is_available',
        'created_at',
        'updated_at'
    )
    prepopulated_fields = {"slug": ("vehicle_name",)}

admin.site.register(Vehicles, VehicleAdmin)