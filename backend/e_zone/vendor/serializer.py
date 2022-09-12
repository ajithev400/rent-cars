from rest_framework import serializers

from users.serializers import UserSerializer
from .models import Vendor

class VendorSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)

    class Meta:
        model = Vendor
        # fields = ('vendor_name','GST_number','email', 'owner', 'mobile', 'image', 'is_verified', 'is_active')
        fields = '__all__'
        # lookup_field = 'vendor_name'
        # extra_kwargs = {
        #     'url':{'lookup_field':'vendor_name'}
        # }
    
