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
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Cars.objects.filter(is_active=True)
    serializer_class = CarsSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]
    lookup_field = 'slug'
    filter_backends = (filters.SearchFilter,)
    search_fields = ['vehicle_name', 'slug', 'brand', 'description','transmission']
    max_paginate_by = 20

    def perform_create(self, serializer):
        vendor = Vendor.objects.get(owner=self.request.user)
        serializer.save(owner=vendor,is_available=True)

@api_view(["POST", "GET", "PATCH"])
@permission_classes([IsAdminUser])
def approve_new_cars(request):
    data = request.data
    if request.method == 'POST':
        car_id = data['car_id']
        car = Cars.objects.get(id=car_id)
        serializer = CarsSerializer(car,many=False)
        return Response(serializer.data)

    if request.method == 'GET':
        
        car = Cars.objects.filter(is_active=False)
        if car is not None:
            serializer = CarsSerializer(car, many=True)

            return Response(serializer.data)
        else:
            return Response({"message":"new Cars not available !"})
        

    
    if request.method == 'PATCH':
        pk = data['car_id']
        try:
            car = Cars.objects.get(id=pk)
            car.is_active=data['is_active']
            car.is_available=True
            car.save()
            serializer = CarsSerializer(car)
        except:
            return Response({"message":"car Not found"},status=status.HTTP_404_NOT_FOUND)
        context = {
            'message':'Updated',
            'data' : serializer.data
        }
        return Response(context,status=status.HTTP_202_ACCEPTED)