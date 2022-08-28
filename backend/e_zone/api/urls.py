from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import BlacklistTokenUpdateView
from users.views import MyTokenObtainPairView,RegisterView,Verify_otpView,RetriveUserView,ProfileViewSet
from store.views import VehicleViewSet
from vendor.views import VendorViewSet
from rest_framework_simplejwt.views import (
    TokenRefreshView,TokenVerifyView
)

urlpatterns = [
    # path('',getRoutes, name='routes'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/blacklist/',BlacklistTokenUpdateView.as_view(), name='blacklist'),

    path('register/',RegisterView.as_view(),name='register'),
    path('verify-otp/',Verify_otpView.as_view(), name='verify-otp'),
    path('getuser/', RetriveUserView.as_view(), name='getuser')
]
router = DefaultRouter()

router.register(r'profile', ProfileViewSet, basename='profile' )
router.register(r'vehicle',VehicleViewSet,basename='vechicle')
router.register(r'vendor',VendorViewSet,basename='vendor')
urlpatterns=urlpatterns+router.urls