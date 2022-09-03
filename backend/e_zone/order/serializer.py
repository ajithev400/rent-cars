from rest_framework import serializers
from .models import Rent
from store.serializers import CarsSerializers

class RentSerializer(serializers.ModelSerializer):
    vehicle = CarsSerializers(read_only=True,)
    class Meta:
        model = Rent
        fields = (
            'customer',
            'vendor',
            'rent_date',
            'return_date',
            'total_rent_date',
            'daily_rent_fee',
            'down_payment',
            'total_payed',
            'vehicle',
        )
