from urllib import request
from rest_framework import viewsets,filters,permissions,status
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializer import VendorSerializer
from .models import Vendor
from .permissions import IsOwnerOrReadOnly
from accounts.models import Account

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]
    # lookup_field = 'vendor_name'
    filter_backends = (filters.SearchFilter,)
    search_fields = ['vendor_name','email','GST_number']
    
    def perform_create(self, serializer):
        user = self.request.user
        user.role = "Vendor"
        user.save()
        serializer.save(owner = self.request.user, 
        email = user.email,       
        is_active = True, 
        is_verified = False)


    # @action(detail=True,methods=['POST']) 
    # def to_vendor(self,request,pk):
    #     user = request.user
        
    #     user = Account.objects.get(user)

    #     if user.role != "Customer":
    #         return Response({'message':'Somthing Went wrong!'})
    #     user.role = "Vender"

    #     return Response({'message':'Role changed successfully'})
        
        