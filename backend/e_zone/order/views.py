from rest_framework import viewsets,permissions
from .models import Rent
from .serializer import RentSerializer
from users.permissions import IsOwnerOrReadOnly
class RentViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        
        serializer.save(customer=self.request.user)