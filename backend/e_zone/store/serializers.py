from rest_framework import serializers

from .models import Vehicles

class CarsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Vehicles
        fields = (
            # 'id',
            'vehicle_name',
            'brand',
            'model',
            'price',
            'image',
            'speed',
            'seat_type',
            'transmission',
            'description',
            'is_available'
        )