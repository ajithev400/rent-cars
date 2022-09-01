from rest_framework import serializers

from .models import Vehicles

class CarsSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vehicles
        fields = (
            'id',
            'vehicle_name',
            'slug',
            # 'owner',
            'brand',
            'model',
            'price',
            'image',
            'speed',
            'seat_type',
            'transmission',
            'description',
            'is_available',
        )
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'}
        }
