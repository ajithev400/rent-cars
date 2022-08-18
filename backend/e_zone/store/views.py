from rest_framework import viewsets

from .serializers import CarsSerializers

from .models import Vehicles

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicles.objects.all()
    serializer_class = CarsSerializers
    lookup_field = 'slug'