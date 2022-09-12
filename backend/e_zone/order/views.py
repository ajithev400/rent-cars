from rest_framework import viewsets,permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from store.models import Vehicles
from .models import Rent
from .serializer import RentSerializer
# from users.permissions import IsOwnerOrReadOnly


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # def perform_create(self, request, serializer,pk = None):

    #     # vehicle = Vehicles.get_object_or_404(id=pk)
    #     # daily_rent_fee = vehicle.price
    #     # serializer.save(customer=self.request.user,vehicle=vehicle,daily_rent_fee=daily_rent_fee)
    #     serializer.save(customer=self.request.user)
    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

    def list(self,request):
        user = request.user
        if user.is_superuser:
            
            queryset = Rent.objects.all()
        else:
            queryset = Rent.objects.filter(customer=user)
        
        serializer = self.get_serializer(queryset,many=True)
        result_set = serializer.data

        return Response(result_set)

    def get_queryset(self):
        queryset = Rent.objects.all()
        id= self.request.query_params.get("id",None)
        if id is not None:
            queryset = queryset.filter(id=id)
            return queryset