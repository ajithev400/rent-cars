from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions,status
from django.contrib.auth import authenticate
from .serializers import UserCreateSerializer
from accounts.models import Account
from accounts.otp import send_otp,verify_otp

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import jwt, datetime

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api',
        'GET /api/token',
        'POST /api/register',
        'POST /api/verify-otp',
        'GET /api/vehicle'
    ]
    return Response(routes)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.first_name +" "+ user.last_name
        token['email'] = user.email
        token['is_superuser'] = user.is_superuser  

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

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