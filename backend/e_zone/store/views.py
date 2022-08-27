from rest_framework import viewsets, filters, permissions
from .serializers import CarsSerializers
from .models import Vehicles
from .permissions import IsOwnerOrReadOnly

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicles.objects.all()
    serializer_class = CarsSerializers
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]
    lookup_field = 'slug'
    filter_backends = (filters.SearchFilter,)
    search_fields = ['vehicle_name', 'slug', 'brand', 'description','transmission']
    max_paginate_by = 20

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)