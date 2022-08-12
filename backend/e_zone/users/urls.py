from django.urls import path
from .import views
from rest_framework.routers import DefaultRouter
from store.views import VehicleViewSet
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
\
urlpatterns = [
    path('',views.getRoutes, name='routes'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('register/',views.RegisterView.as_view(),name='register'),
    path('verify-otp/',views.Verify_otpView.as_view(), name='verify-otp'),

    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

]



router = DefaultRouter()

router.register(r'vehicle',VehicleViewSet,basename='vechicle')
urlpatterns=urlpatterns+router.urls