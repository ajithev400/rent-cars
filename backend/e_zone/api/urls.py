from django.urls import path
from rest_framework.routers import DefaultRouter

from car_rent.views import CarDocumentViewSet
from .views import BlacklistTokenUpdateView
from users.views import getRoutes, MyTokenObtainPairView,RegisterView,Verify_otpView,RetriveUserView,ProfileViewSet,UserViewSet
from store.views import VehicleViewSet, approve_new_cars
from vendor.views import VendorViewSet
from order.views import OrderViewSet
from car_rent import views
from order.views import start_payment,handle_payment_success
from rest_framework_simplejwt.views import (
    TokenRefreshView,TokenVerifyView
)

urlpatterns = [
    path('routes/',getRoutes, name='routes'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/blacklist/',BlacklistTokenUpdateView.as_view(), name='blacklist'),

    path('register/',RegisterView.as_view(),name='register'),
    path('verify-otp/',Verify_otpView.as_view(), name='verify-otp'),
    path('getuser/', RetriveUserView.as_view(), name='getuser'),

    # cars
    # path("cars/image/upload/", views.carUploadImage, name="car-upload-image"),
    # path("new/cars/upload/", views.newCarUploadImage, name="new-car-upload-image"),
    path("cars/", views.getCars, name="cars-list"),
    path("cars/vendor/<str:pk>/", views.getCarsbyOwnerId, name="cars-list"),
    # path("car/create/", views.createCar, name="create-car"),
    # path("car/<str:pk>/", views.getCarById, name="get-car-by-id"),
    # path("car/update/<str:pk>/", views.updateCar, name="car-update"),
    # carListByLocation
    path(
        "mainpage/<str:pk>/car-list/to-rent/",
        views.getCarListByLocationToRent,
        name="get-carlist-by-location-to-rent",
    ),
    path(
        "mainpage/<str:pk>/car-list/in-use/",
        views.getCarListByLocationInUse,
        name="get-carlist-by-location-in-use",
    ),
    path(
        "mainpage/<str:pk>/car-list/to-do/",
        views.getCarListByLocationToDo,
        name="get-carlist-by-location-to-do",
    ),
    path(
        "mainpage/<str:pk>/car-list/reservations/",
        views.getCarListByLocationReservations,
        name="get-carlist-by-location-reservations",
    ),
    path(
        "mainpage/<str:pk>/car-list/new-reservation/",
        views.getCarListByLocationNewReservations,
        name="get-carlist-by-location-new-reservation",
    ),
    # carListByLocation - filters
    path(
        "mainpage/<str:pk>/car-list/fiter-reservations/",
        views.getCarListFilterReservation,
        name="get-carlist-by-location-fiter-reservations",
    ),
    path(
        "mainpage/<str:pk>/car-list/fiter-rents/",
        views.getCarListFilterRents,
        name="get-carlist-by-location-fiter-rents",
    ),
    path(
        "mainpage/<str:pk>/car-list/fiter-all/",
        views.getCarListByLocationToDo,
        name="get-carlist-by-location-fiter-all",
    ),
    path(
        "list-of-reservations/cars/",
        views.getReservationList,
        name="get-reservation-list-fiter-all",
    ),
    # carReservation
    path(
        "filter/reservation/", views.filterReservations, name="filter-reservations"
    ),
    path(
        "reservation/car/create/",
        views.createReservationCar,
        name="create-reservation-car",
    ),
    path(
        "reservation/list/car/<str:pk>/<str:loc>/",
        views.listReservationCar,
        name="list-reservation-car",
    ),
    path(
        "reservation/list/user/car/<str:pk>/<str:loc>/",
        views.listUserReservationCar,
        name="list-user-reservation-car",
    ),
    path(
        "reservation/delete/<str:pk>/",
        views.deleteReservation,
        name="reservation-delete",
    ),
    path(
        "car/single/reservation/<str:pk>/",
        views.getReservationById,
        name="get-reservation-by-id",
    ),
    path(
        "reservation/update/<str:pk>/",
        views.updateReservation,
        name="update-reservation",
    ),
    # carRent
    path("rent/car/create/", views.createRentCar, name="create-rent-car"),
    path("rents/list/car/<str:pk>/", views.listRentsCar, name="list-rents-car"),
    path("rent/edit/<str:pk>/", views.editCarRent, name="edit-rent"),
    # car pick-up
    path(
        "<str:pk>/rent-details/",
        views.getRentDetailsByCarId,
        name="get-rent-details-by-car-id",
    ),
    path("rent/update/<str:pk>/", views.carUpdateRent, name="car-update-rent"),
    path("reservation/payment/",start_payment, name = 'reservation-pay'),
    path("reservation/payment/success/",handle_payment_success, name="handle-payment-success"),
    path("vehicle/admin/approve-car/",approve_new_cars, name='approve_new_cars')
    
]
router = DefaultRouter()

# router.register(r'list-cars',views.ListCars, basename='list-cars')
router.register(r'user',UserViewSet,basename='user' )
router.register(r'profile', ProfileViewSet, basename='profile' )
router.register(r'vehicle',VehicleViewSet,basename='vechicle')
router.register(r'vendor',VendorViewSet,basename='vendor')
router.register(r'order',OrderViewSet,basename='Order')
router.register(r'car-documents',CarDocumentViewSet,basename='car_document')
urlpatterns=urlpatterns+router.urls