from django.contrib import admin

# Register your models here.
from .models import Vendor

class VendorAdmin(admin.ModelAdmin):
    model = Vendor
    list_display = ('vendor_name','GST_number','email', 'mobile','is_verified','is_active','created_at')
    readonly_fields = ('updated_at','created_at')
    ordering = ('created_at', )
    filter_horizontal =()
    list_filter = ()
    fieldsets =()
admin.site.register(Vendor,VendorAdmin)