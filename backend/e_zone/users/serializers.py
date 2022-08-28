from rest_framework import serializers
from accounts.models import Account
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from .models import Profile

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('email','first_name','last_name','mobile','password')

    def validate(self,data):
        user = Account(**data)
        password = data.get('password')
        try:
            validate_password(password,user)
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError(
                {'password':serializer_errors['non_field_errors']}
            )
        return data
    
    def create(self,validated_data):
        user=Account.objects.create_user(
            email= validated_data['email'],
            first_name = validated_data['first_name'],
            last_name= validated_data['last_name'],
            mobile = validated_data['mobile'],
            password = validated_data['password'], 
        )
        

        profile = Profile.objects.create(
            user = user,
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            phone = validated_data['mobile'],
        )
        
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            'first_name',
            'last_name',
            'mobile',
            'email',
            'role'
        )

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('first_name', 'last_name', 'gender', 'phone', 'email', 'profile_picture')