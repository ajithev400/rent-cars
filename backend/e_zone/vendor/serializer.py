from rest_framework import serializers
from .models import Vendor

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ('vendor_name','GST_number','email', 'mobile', 'image')
        # fields = '__all__'
        lookup_field = 'vendor_name'
        extra_kwargs = {
            'url':{'lookup_field':'vendor_name'}
        }
    
