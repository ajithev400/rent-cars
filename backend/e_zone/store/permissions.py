from urllib import request
from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permissions to only owner of an object to edit it..
    """
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        print(request.user.is_staff)
        # print("owner:",obj.owner == request.user)
        return obj.owner == request.user