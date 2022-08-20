from django.urls import path

from .import views
from rest_framework.routers import DefaultRouter
from store.views import VehicleViewSet
from vendor.views import VendorViewSet
from rest_framework_simplejwt.views import (
    TokenRefreshView,TokenVerifyView
)
\
urlpatterns = [
    # path('',views.getRoutes, name='routes'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('register/',views.RegisterView.as_view(),name='register'),
    path('verify-otp/',views.Verify_otpView.as_view(), name='verify-otp'),
    path('getuser/', views.RetriveUserView.as_view(), name='getuser')


]



router = DefaultRouter()

router.register(r'vehicle',VehicleViewSet,basename='vechicle')
router.register(r'vendor',VendorViewSet,basename='vendor')
urlpatterns=urlpatterns+router.urls