from rest_framework import serializers

from .models import Vehicles
from vendor.serializer import VendorSerializer
class CarsSerializers(serializers.HyperlinkedModelSerializer):

    owner = VendorSerializer(read_only=True,)
    class Meta:
        model = Vehicles
        fields = (
            'id',
            'vehicle_name',
            'slug',
            'reg_number',
            'brand',
            'model',
            'price',
            'image',
            'speed',
            'seat_type',
            'transmission',
            'description',
            'is_available',
            'owner',
        )
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }
