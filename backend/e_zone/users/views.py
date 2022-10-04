from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions,status,pagination
from rest_framework import viewsets
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Profile
from .serializers import UserCreateSerializer, UserSerializer, ProfileSerializer
from accounts.models import Account
from accounts.otp import send_otp,verify_otp
from .permissions import IsOwnerOrReadOnly
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api',
        'GET /api/token',
        'GET /api/token/vefify',
        'POST /api/register',
        'GET /api/getuser',
        'POST /api/verify-otp',
        'GET /api/vehicle'
    ]
    return Response(routes)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RetriveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request):
        user = request.user
        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_200_OK)
    
    

class RegisterView(APIView):
    def post(self,request):
        data = request.data
        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.create(serializer.validated_data)
        user = UserCreateSerializer(user)
        mobile_number = data.get('mobile')
        send_otp(mobile_number)
        
        return Response(
            {'Success':'User created successfully'},
            status=status.HTTP_201_CREATED
        )

class Verify_otpView(APIView):
    def post(self,request):
        data = request.data
        check_otp = data.get('otp')
        mobile_number = data.get('mobile')        
        check = verify_otp(mobile_number,check_otp)

        if check:
            user = Account.objects.get(mobile = mobile_number)
            user.is_varified = True
            user.save()
            return Response(
                {'Success':'User is verified'},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'Error':'Invalid OTP'},
                status= status.HTTP_400_BAD_REQUEST
            )

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_class = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]

    def retrieve(self,requst, pk):
        user = Account.objects.get(id=pk)
        profile = Profile.objects.get(owner=user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


class UserViewSet(viewsets.ViewSet) :
    permission_classes = [permissions.IsAuthenticated]
    
    # Standard actions that will be handled by a router class.
    def list(self, request) :
        queryset = Account.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk) :
        users = Account.objects.all()
        user = get_object_or_404(users, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def destroy(self, request, pk) :
        try :
            queryset = Account.objects.all()
            user = get_object_or_404(queryset, pk=pk)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, pk) :
        try :
            queryset = Account.objects.all()
            user = get_object_or_404(queryset, pk=pk)
            serializer = UserSerializer(instance=user, data=request.data)
            
            if serializer.is_valid() :
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True,methods=['POST']) 
    def reset_password(self,request,pk):
        user = request.user
        data = request.data
        
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')
        
        if old_password is None:
            return Response({'message':'Old password field is required'})
        if new_password is None:
            return Response({'message':'New password field is required'})
        if confirm_password is None:
            return Response({'detail':'Confirm password field is required'})
        
        if not user.check_password(old_password):
            return Response({"message": "Old password is not correct"})
        
        if confirm_password and new_password is not None:
            if new_password == confirm_password:
                user.set_password(new_password)
                user.save()
                return Response({'message':'Password changed successfully'},status=status.HTTP_200_OK)
            else:
                return Response({"message":"New Password and Conformation doesn't match"})