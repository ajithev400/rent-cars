from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework import status, permissions,viewsets
from rest_framework.views import APIView
from .models import *
from .serializers import *
from datetime import datetime
from datetime import timedelta
from django.utils import timezone
import pytz
# Create your views here.

# LOCATIONS
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getLocations(request):
    locations = Locations.objects.filter(is_active=True).order_by("name")
    serializer = LocationsSerializer(locations, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def createLocation(request):
    data = request.data
    creator_str = str(data["creator"])
    try:
        location = Locations.objects.create(
            name=data["name"],
            creator=creator_str,
            supp_unique_var=data["supp_unique_var"],
        )

        serializer = LocationsSerializer(location, many=False)
        return Response(serializer.data)
    except:
        message = {"detail": "The given name already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getLocationById(request, pk):
    user = Locations.objects.get(id=pk)
    serializer = LocationsSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateLocation(request, pk):
    location = Locations.objects.get(id=pk)

    data = request.data
    location.name = data["name"]
    location.name = data["shortName"]
    location.is_active = data["isActive"]

    location.save()

    serializer = LocationsSerializer(location, many=False)

    return Response(serializer.data)


@api_view(["POST"])
def uploadImage(request):
    data = request.data
    location_id = data["location_id"]
    location = Locations.objects.get(id=location_id)
    location.image = request.FILES.get("image")

    location.save()

    serializer = LocationsSerializer(location, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def newLocationUploadImage(request):
    data = request.data
    supp_unique = data["suppUniqueVar"]

    locationWithImage = Locations.objects.get(supp_unique_var=supp_unique)
    locationWithImage.image = request.FILES.get("image")
    locationWithImage.save()

    serializer = LocationsSerializer(locationWithImage, many=False)
    return Response(serializer.data)


# CARS

# class ListCars(ViewSet.ListView):
#     queryset = Cars.objects.all()
#     serializers_class = CarsRentsSerializer()

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCars(request):
    cars = Cars.objects.all().order_by("name")
    serializer = CarsSerializer(cars, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCarsbyOwnerId(request,pk):
    
    try:
        vendor = Vendor.objects.get(id=pk)
    except:
        
        return Response({"message":"Vendor not exist"},status=status.HTTP_400_BAD_REQUEST)
    
    cars = Cars.objects.filter(owner=vendor).order_by("name")
    serializer = CarsSerializer(cars, many=True)
    return Response(serializer.data)


# @api_view(["POST"])
# # @permission_classes([IsAdminUser])
# def createCar(request):
#     data = request.data
#     user = request.user
#     obj_location = Locations.objects.get(id=data["location"])

#     try:
#         car = Cars.objects.create(
#             name=data["name"],
            
#             code_registration=data["codeRegistration"],
#             main_location=obj_location,
#             owner= user,
#             creator=data["creator"],
#             location=data["location"],
#             to_the_location=data["location"],
#         )

#         serializer = CarsSerializer(car, many=False)
#         return Response(serializer.data)

#     except:
#         message = {"detail": "The registration code provided already exists"}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["POST"])
# def carUploadImage(request):
#     data = request.data
#     car_id = data["car_id"]
#     car = Cars.objects.get(id=car_id)

#     car.image = request.FILES.get("image")
#     car.save()

#     serializer = CarsSerializer(car, many=False)
#     return Response(serializer.data)


# @api_view(["POST"])
# def newCarUploadImage(request):
#     data = request.data
#     codeRegistration = data["codeRegistration"]
#     car = Cars.objects.get(code_registration=codeRegistration)

#     car.image = request.FILES.get("image")

#     car.save()

#     serializer = CarsSerializer(car, many=False)
#     return Response(serializer.data)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def getCarById(request, pk):
#     car = Cars.objects.get(id=pk)
#     serializer = CarsSerializerWithMainLocation(car, many=False)
#     return Response(serializer.data)


# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])
# def updateCar(request, pk):
#     data = request.data
#     obj_location = Locations.objects.get(id=data["selectLocation"])
#     car = Cars.objects.get(id=pk)

#     car_ARC = Cars_ARC.objects.create(
#         id_car=car.id,
#         id_location=car.main_location.id,
#         name=car.name,
#         code_registration=car.code_registration,
#         creator_ARC=data["creator"],
#         type=data["type"],
#         on_the_way=car.on_the_way,
#         location=car.location,
#         to_the_location=car.to_the_location,
#         come_back=car.come_back,
#     )

#     try:
#         car.name = data["name"]
#         car.name = data["shortName"]
#         car.main_location = obj_location
#         car.code_registration = data["codeRegistration"]
#         car.is_active = data["isActive"]

#         car.save()

#         serializer = CarsSerializer(car, many=False)

#         return Response(serializer.data)

#     except:
#         message = {"detail": "The registration code provided already exists"}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


# CARLIST BY LOCATION


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCarListByLocationToRent(request, pk):
    carList = Cars.objects.filter(
        location=pk, is_active=True, on_the_way=False
    ).order_by("name")
    serializer = CarsSerializer(carList, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCarListByLocationInUse(request, pk):
    carRent = Cars_Rents.objects.filter(location=pk, is_active=True).order_by("date_to")

    carSerializerRents = CarsRentsSerializer(carRent, many=True)

    return Response(carSerializerRents.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCarListByLocationToDo(request, pk):

    today_plus = timezone.now() + timedelta(hours=12)
    today_minus = timezone.now() - timedelta(hours=12)

    carResArchive = Cars_Reservation.objects.filter(
        date_from__lt=today_minus, is_active=True
    )

    for i in carResArchive:
        i.is_active = False
        i.type_change = "delete automatically"
        i.date_of_change = timezone.now()
        i.save()

    carRes = Cars_Reservation.objects.filter(
        location=pk, date_from__lt=today_plus, date_from__gt=today_minus, is_active=True
    ).order_by("date_from")

    carRent = Cars_Rents.objects.filter(
        location=pk, date_to__lt=today_plus, is_active=True
    ).order_by("date_to")

    carSerializerReservation = CarsReservationSerializer(carRes, many=True)
    carSerializerRents = CarsRentsSerializer(carRent, many=True)

    combine_serializers = carSerializerRents.data + carSerializerReservation.data

    return Response(combine_serializers)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCarListFilterReservation(request, pk):
    today = timezone.now() + timedelta(hours=12)
    today_minus = timezone.now() - timedelta(hours=12)
    today_plus = timezone.now() + timedelta(hours=12)
    carRes = Cars_Reservation.objects.filter(
        location=pk, date_from__lt=today_plus, date_from__gt=today_minus, is_active=True
    ).order_by("date_from")

    serializer = CarsReservationSerializer(carRes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCarListFilterRents(request, pk):
    today = timezone.now() + timedelta(hours=12)
    carRent = Cars_Rents.objects.filter(
        location=pk, date_to__lt=today, is_active=True
    ).order_by("date_to")

    serializer = CarsRentsSerializer(carRent, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCarListByLocationReservations(request, pk):
    today = timezone.now()
    carList = Cars.objects.filter(
        carReservations__location=pk,
        carReservations__date_from__gt=today,
        carReservations__is_active=True,
    ).order_by("name")

    unique_cars_list = []
    for car in carList:
        if car not in unique_cars_list:
            unique_cars_list.append(car)

    serializer = CarsSerializer(unique_cars_list, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCarListByLocationNewReservations(request, pk):

    carList = Cars.objects.filter(location=pk).order_by("name")

    serializer = CarsSerializer(carList, many=True)

    return Response(serializer.data)


# CAR RESERVATION
def time_converter(time):
    s = time
    hours, minutes, seconds = (["0", "0"] + s.split(":"))[-3:]
    hours = int(hours)
    minutes = int(minutes)
    seconds = float(seconds)
    miliseconds = int(3600000 * hours + 60000 * minutes + 1000 * seconds)
    return miliseconds

def convertDate(str):
    date = str

    year = ""
    mounth = ""
    day = ""
    hour = ""
    minutes = ""
    a = 0
    b = 0
    for i in date:
        if i == "-" and b == 0:
            year = date[0:a]
            if date[a + 2] == "-":
                mounth = date[5 : a + 2]
            else:
                mounth = date[5 : a + 3]
            b = 1
        if i == "-" and b == 1:
            if date[a + 2] == " ":
                day = date[a + 1 : a + 2]
            else:
                day = date[a + 1 : a + 3]
        if i == " ":
            if date[a + 2] == ":":
                hour = date[a + 1 : a + 2]
            else:
                hour = date[a + 1 : a + 3]
        if i == ":":
            minutes = date[a + 1 :]
        a += 1
    return datetime(
        int(year), int(mounth), int(day), int(hour), int(minutes), tzinfo=pytz.UTC
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createReservationCar(request):
    data = request.data
    
    date_obj_start = convertDate(data["dateFrom"])
    date_obj_end = convertDate(data["dateTo"])

    obj_car = Cars.objects.get(id=data["idCars"])
    obj_location = Locations.objects.get(id=data["location"])

    obj_reservations = Cars_Reservation.objects.filter(
        id_cars=data["idCars"], is_active=True
    )
    obj_rents = Cars_Rents.objects.filter(id_cars=data["idCars"], is_active=True)

    if data["location"] == obj_car.location:
        extension = timedelta(milliseconds=int(data["timeReservation"]))
    else:
        extension = timedelta(
            milliseconds=int(data["timeReservation"]) + int(data["transferTime"])
        )

    for res in obj_reservations:
        if date_obj_start > (res.date_from - extension) and date_obj_start < (
            res.date_to + extension
        ):
            return Response("date range exists for dataStart")
        if date_obj_end > (res.date_from - extension) and date_obj_end < (
            res.date_to + extension
        ):
            return Response("date range exists for dataEnd")
        if date_obj_start < (res.date_from - extension) and date_obj_end > (
            res.date_to + extension
        ):
            return Response("included date range")

    for ren in obj_rents:
        if date_obj_start > (ren.date_from - extension) and date_obj_start < (
            ren.date_to + extension
        ):
            return Response("lease date range exists for dataStart")
        if date_obj_end > (ren.date_from - extension) and date_obj_end < (
            ren.date_to + extension
        ):
            return Response("lease date range exists for dataEnd")
        if date_obj_start < (ren.date_from - extension) and date_obj_end > (
            ren.date_to + extension
        ):
            return Response("included date range for the lease")

    try:
        car_reservation = Cars_Reservation.objects.create(
            id_cars=obj_car,
            client_name=data["name"],
            client= request.user,
            client_document_type=data["documentType"],
            client_document_identification=data["IdNumber"],
            client_phone=data["phone"],
            client_email=data["email"],
            date_from=date_obj_start,
            date_to=date_obj_end,
            note=data["note"],
            location=obj_location,
            creator=data["creator"],
        )

        data  = {
            "reservation_id":car_reservation.id
        }
        print(car_reservation.id,'ReservationId')
        return Response(data,status=status.HTTP_201_CREATED)

    except:
        message = {"detail": "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def listReservationCar(request, pk, loc):

    if loc == "0":
        carListReservation = Cars_Reservation.objects.filter(id_cars=pk, is_active=True)
    else:
        carListReservation = Cars_Reservation.objects.filter(
            id_cars=pk, is_active=True, location=loc
        )

    carListReservationGroupBy = carListReservation.order_by("date_from")
    serializer = CarsReservationSerializer(carListReservationGroupBy, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def listUserReservationCar(request, pk, loc):
    client = Account.objects.get(id=pk)
    if loc == "0":
        carListReservation = Cars_Reservation.objects.filter(client=client, is_active=True)
    else:
        carListReservation = Cars_Reservation.objects.filter(
            creator=pk, is_active=True, location=loc
        )
    carListReservationGroupBy = carListReservation.order_by("date_from")
    serializer = CarsReservationSerializer(carListReservationGroupBy, many=True)
    return Response(serializer.data)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteReservation(request, pk):
    data = request.data
    reservationForDeletion = Cars_Reservation.objects.get(id=pk)

    reservationForDeletion.is_active = False
    reservationForDeletion.date_of_change = timezone.now()
    reservationForDeletion.creator_change = data["creator"]
    reservationForDeletion.type_change = data["type_change"]
    reservationForDeletion.id_arc = data["id"]

    reservationForDeletion.save()
    return Response("Reservation was deleted")


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getReservationById(request, pk):
    
    try:
        reservation = Cars_Reservation.objects.get(id=pk)

        serializer = CarsReservationSerializer(reservation, many=False)
        return Response(serializer.data)
    except:
        return Response({"Message":"Reservation doesn't exist !"},status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def updateReservation(request, pk):

    data = request.data
    reservation = Cars_Reservation.objects.get(id=pk)

    obj_car = Cars.objects.get(id=reservation.id_cars.id)
    date_obj_start = convertDate(data["dateFrom"])
    date_obj_end = convertDate(data["dateTo"])

    obj_reservations = Cars_Reservation.objects.filter(
        id_cars=reservation.id_cars, is_active=True
    ).exclude(id=pk)

    obj_rents = Cars_Rents.objects.filter(id_cars=reservation.id_cars, is_active=True)
    obj_location = Locations.objects.get(id=data["location"])

    for res in obj_reservations:
        if data["location"] == res.location:
            extension = timedelta(milliseconds=data["timeReservation"])
        else:
            extension = timedelta(
                milliseconds=data["timeReservation"] + int(data["transferTime"])
            )

        if date_obj_start > (res.date_from - extension) and date_obj_start < (
            res.date_to + extension
        ):
            return Response("date range exists for dataStart")
        if date_obj_end > (res.date_from - extension) and date_obj_end < (
            res.date_to + extension
        ):
            return Response("date range exists for dataEnd")
        if date_obj_start < (res.date_from - extension) and date_obj_end > (
            res.date_to + extension
        ):
            return Response("included date range")

    for ren in obj_rents:
        if data["location"] == ren.location:
            extension = timedelta(milliseconds=data["timeReservation"])
        else:
            extension = timedelta(
                milliseconds=data["timeReservation"] + int(data["transferTime"])
            )

        if date_obj_start > (ren.date_from - extension) and date_obj_start < (
            ren.date_to + extension
        ):
            return Response(" lease date range exists for dataStart")
        if date_obj_end > (ren.date_from - extension) and date_obj_end < (
            ren.date_to + extension
        ):
            return Response("lease date range exists for dataEnd")
        if date_obj_start < (ren.date_from - extension) and date_obj_end > (
            ren.date_to + extension
        ):
            return Response("included date range for the lease")

    try:
        reservation.is_active = False
        reservation.date_of_change = timezone.now()
        reservation.creator_change = data["creator"]
        reservation.type_change = data["type"]
        reservation.id_arc = data["id"]
        reservation.save()
    except:
        message = {"detail": "Something went wrong with the Udated data"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    try:
        car_reservation = Cars_Reservation.objects.create(
            id_cars=obj_car,
            client_name=data["name"],
            client_document_type=data["documentType"],
            client_document_identification=data["IdNumber"],
            client_phone=data["phone"],
            client_email=data["email"],
            date_from=date_obj_start,
            date_to=date_obj_end,
            note=data["note"],
            location=obj_location,
            creator=data["creator"],
            id_arc=data["id"],
            type_change="create by update",
        )
    except:
        reservation.is_active = True
        reservation.save()
        message = {"detail": "Something went wrong while Update data"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    return Response("successful")


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def filterReservations(request):
    data = request.data
    print("DATAAAAA:",data)
    start_date = convertDate(data["date_from"])
    end_date = convertDate(data["date_to"])
    
    time = time_converter(data["transfer_time"])
    extension = timedelta(milliseconds=time)

    cars_with_available_terms_list = []
    cars_not_available_list = []
    cars_rent_list = []
    unique_list = []
    unique_list2 = []
    car_without_reservations = []
    final_list = []

    obj_cars = Cars.objects.filter(is_active=True)
    obj_res = Cars_Reservation.objects.filter(is_active=True)
    obj_rents = Cars_Rents.objects.filter(is_active=True)

    for car in obj_cars:
        for res in obj_res:
            if car.id == res.id_cars.id:
                if (
                    (res.date_from - extension) > start_date
                    and (res.date_from - extension) > end_date
                ) or (
                    (res.date_to + extension) < start_date
                    and (res.date_to + extension) < end_date
                ):
                    cars_with_available_terms_list.append(car)
                else:
                    cars_not_available_list.append(car)

    for car in obj_cars:
        for rent in obj_rents:
            if car.id == rent.id_cars.id:
                if (rent.date_to + extension) > start_date:
                    cars_rent_list.append(car)

    for i in cars_with_available_terms_list:
        if i not in unique_list:
            unique_list.append(i)

    for i in cars_not_available_list:
        if i not in unique_list2:
            unique_list2.append(i)

    combine_unique_lists = unique_list + unique_list2

    for i in obj_cars:
        if i not in combine_unique_lists:
            car_without_reservations.append(i)

    unique_available_cars_list = unique_list + car_without_reservations

    for i in unique_available_cars_list:
        if i not in cars_rent_list:
            final_list.append(i)

    serializer = CarsSerializer(final_list, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getReservationList(request):
    carReservationList = Cars_Reservation.objects.filter(is_active=True).order_by(
        "date_from"
    )

    carSerializerReservations = CarsReservationSerializer(carReservationList, many=True)

    return Response(carSerializerReservations.data)


# CAR RENT


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createRentCar(request):
    data = request.data
    print("RENT DATA :::::",data)
    date_obj_start = timezone.now()
    date_obj_end = convertDate(data["date_to"])

    obj_car = Cars.objects.get(id=data["id_car"])
    obj_location = Locations.objects.get(id=data["location"])

    if data["resToRent"] == "resToRent":
        obj_reservations = Cars_Reservation.objects.filter(
            id_cars=data["id_car"], is_active=True
        ).exclude(id=data["id_res"])
        obj_reservation = Cars_Reservation.objects.get(id=data["id_res"])
    else:
        obj_reservations = Cars_Reservation.objects.filter(
            id_cars=data["id_car"], is_active=True
        )

    obj_rents = Cars_Rents.objects.filter(id_cars=data["id_car"], is_active=True)
    print("car_resObj",obj_reservations)
    for i in obj_reservations:
        if data["location"] == i.location:
            extension = timedelta(milliseconds=int(data["setCarRent"]))
        else:
            extension = timedelta(
                milliseconds=int(data["setCarRent"]) + int(data["transferTime"])
            )

        if date_obj_start > (i.date_from - extension) and date_obj_start < (
            i.date_to + extension
        ):
            return Response("date range exists for date Start")
        if date_obj_end > (i.date_from - extension) and date_obj_end < (
            i.date_to + extension
        ):
            return Response("a date range exists for dataEnd")
        if date_obj_start < (i.date_from - extension) and date_obj_end > (
            i.date_to + extension
        ):
            return Response("included date range")

    for ren in obj_rents:
        if data["location"] == ren.location:
            extension = timedelta(milliseconds=int(data["setCarRent"]))
        else:
            extension = timedelta(
                milliseconds=int(data["setCarRent"]) + int(data["transferTime"])
            )

        if date_obj_start > (ren.date_to + extension):
            return Response("the car was not picked up from the customer")
        if date_obj_start > (ren.date_from - extension) and date_obj_start < (
            ren.date_to + extension
        ):
            return Response("lease date range exists for dataStart")
        if date_obj_end > (ren.date_from - extension) and date_obj_end < (
            ren.date_to + extension
        ):
            return Response("a lease date range exists for dataEnd")
        if date_obj_start < (ren.date_from - extension) and date_obj_end > (
            ren.date_to + extension
        ):
            return Response("included date range for the lease")

    try:
        if data["resToRent"] == "resToRent":
            obj_reservation.is_active = False
            obj_reservation.save()

        car_rent = Cars_Rents.objects.create(
            id_cars=data["id_car"],
            client_name=data["client_name"],
            client = request.user,
            client_document_type=data["client_document_type"],
            client_document_identification=data["client_document_identification"],
            client_phone=data["client_phone"],
            client_email=data["client_email"],
            date_to=date_obj_end,
            deposit=data["deposit"],
            deposit_currency=data["deposit_currency"],
            deposit_is_active=data["deposit_is_active"],
            total_price=data["total_price"],
            total_price_currency=data["total_price_currency"],
            total_price_is_paid=data["total_price_is_paid"],
            creator=data["creator"],
            location=obj_location,
            note=data["note"],
        )

        car_ARC = Cars_ARC.objects.create(
            id_car=obj_car.id,
            id_location=obj_car.main_location.id,
            name=obj_car.name,
            code_registration=obj_car.code_registration,
            creator_ARC=data["creator"],
            type="rent car",
            on_the_way=obj_car.on_the_way,
            location=obj_car.location,
            to_the_location=obj_car.to_the_location,
            come_back=obj_car.come_back,
        )

        obj_car.on_the_way = True
        obj_car.to_the_location = data["location"]
        obj_car.come_back = data["come_back"]
        obj_car.save()

        return Response("Car was rent")

    except:
        message = {"Message": "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def editCarRent(request, pk):
    data = request.data
    today = timezone.now()
    date_obj_end = convertDate(data["dateTo"])
    obj_location = Locations.objects.get(id=data["location"])
    rent = Cars_Rents.objects.get(id=data["rentId"])
    extension = timedelta(milliseconds=data["duration"])

    reservation = Cars_Reservation.objects.filter(
        id_cars=data["carId"], is_active=True, date_from__gt=today
    )

    for i in reservation:
        if (date_obj_end) > (i.date_from):
            return Response("date range exists for dataEnd")
        if (date_obj_end + extension) > (i.date_from):
            return Response("date range exists for dataEnd + 1h")

    if rent.total_price_is_paid:
        obj_note = (
            "Info z systemu: zapłacone "
            + rent.total_price
            + " "
            + rent.total_price_currency
            + "\n"
            + data["note"]
        )
    else:
        obj_note = data["note"]

    try:
        rent.date_to = date_obj_end
        rent.total_price = str(int(rent.total_price) + int(data["totalPrice"]))
        rent.total_price_is_paid = False
        rent.note = obj_note
        rent.location = obj_location
        rent.save()
    except:
        message = {"detail": "Something went wrong with the Udated data"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    return Response("Successful")


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def listRentsCar(request, pk):
    today = timezone.now()
    carListRents = Cars_Rents.objects.filter(id_cars=pk, is_active=True)
    carListRentsGroupBy = carListRents.order_by("date_from")

    serializer = CarsRentsSerializer(carListRentsGroupBy, many=True)

    return Response(serializer.data)


# CAR PICK UP


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getRentDetailsByCarId(request, pk):
    carRent = Cars_Rents.objects.get(id_cars=pk, is_active=True)

    serializer = CarsRentsSerializer(carRent, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def carUpdateRent(request, pk):
    carRent = Cars_Rents.objects.get(id=pk, is_active=True)
    car = Cars.objects.get(id=carRent.id_cars.id)

    try:
        carRent.is_active = False
        carRent.save()

        car.on_the_way = False
        car.come_back = False
        car.location = carRent.location.id
        car.save()

        return Response("Success")

    except:
        message = {"detail": "server error"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

class CarDocumentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CarDocumetSerializer
    queryset = CarsDocument.objects.all()

    def perform_create(self, serializer):
        car_id = self.request.data.get("car_id")
        vendor = Vendor.objects.get(owner=self.request.user)
        car = Cars.objects.get(id=car_id)
        serializer.save(owner=self.request.user,vendor_id=vendor,cars=car)

    def retrieve(self, request, pk=None):
        queryset = CarsDocument.objects.all()
        doc = get_object_or_404(queryset,cars=pk)
        serializer = CarDocumetSerializer(doc)
        return Response(serializer.data)