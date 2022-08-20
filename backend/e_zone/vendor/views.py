from rest_framework import viewsets,filters,permissions

from .serializer import VendorSerializer
from .models import Vendor
from .permissions import IsOwnerOrReadOnly

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]
    lookup_field = 'vendor_name'
    filter_backends = (filters.SearchFilter,)
    search_fields = ['vendor_name','email','GST_number']
    