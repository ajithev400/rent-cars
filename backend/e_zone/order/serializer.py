from rest_framework import serializers
from .models import Rent,Payment
from store.serializers import CarsSerializers

class RentSerializer(serializers.ModelSerializer):
    # vehicle = CarsSerializers(read_only=True,)
    class Meta:
        model = Rent
        fields = (
            'id',
            'customer',
            'reservation_id',
            'rent_date',
            'return_date',
            'total_rent_date',
            'daily_rent_fee',
            'total_payed',
            'vehicle',
        )
    # def create(self,validated_data):

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'