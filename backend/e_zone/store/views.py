from email import message
from rest_framework import status
from rest_framework import viewsets, filters, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from vendor.models import Vendor
from order.models import Rent
from .permissions import IsOwnerOrReadOnly
from order.serializer import RentSerializer
from car_rent.models import Cars
from car_rent.serializers import CarsSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Cars.objects.all()
    serializer_class = CarsSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]
    lookup_field = 'slug'
    filter_backends = (filters.SearchFilter,)
    search_fields = ['vehicle_name', 'slug', 'brand', 'description','transmission']
    max_paginate_by = 20

    def perform_create(self, serializer):
        vendor = Vendor.objects.get(id=self.request.user.id)
        serializer.save(owner=vendor)
    
