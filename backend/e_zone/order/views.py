from rest_framework import viewsets,permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from accounts.models import Account
from store.models import Vehicles
from .models import Rent,Payment
from .serializer import RentSerializer,OrderSerializer
from car_rent.models import Cars_Reservation,Cars
from rest_framework.decorators import permission_classes
import json
import razorpay
from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes
from django.core.mail import send_mail
from django.conf import settings
# from users.permissions import IsOwnerOrReadOnly


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # def perform_create(self, request, serializer,pk = None):

    #     # vehicle = Vehicles.get_object_or_404(id=pk)
    #     # daily_rent_fee = vehicle.price
    #     # serializer.save(customer=self.request.user,vehicle=vehicle,daily_rent_fee=daily_rent_fee)
    #     serializer.save(customer=self.request.user)
    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

    def list(self,request):
        user = request.user
        if user.is_superuser:
            
            queryset = Rent.objects.all()
        else:
            queryset = Rent.objects.filter(customer=user)
        
        serializer = self.get_serializer(queryset,many=True)
        result_set = serializer.data

        return Response(result_set)

    def get_queryset(self):
        queryset = Rent.objects.all()
        id= self.request.query_params.get("id",None)
        if id is not None:
            queryset = queryset.filter(id=id)
            return queryset



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_payment(request):
    amount = request.data['amount']
    name = request.data['name']
    car_id = request.data['car_id']
    reservation_id = request.data['res_id']
    client = razorpay.Client(auth=(settings.RAZOR_KEY_ID,settings.RAZOR_KEY_SECRET))

    # create razorpay order
    # the amount will come in 'paise' that means if we pass 50 amount will become
    # 0.5 rupees that means 50 paise so we have to convert it in rupees. So, we will 
    # mumtiply it by 100 so it will be 50 rupees.
    payment = client.order.create({"amount": amount * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})
                                   
    # we are saving an order with isPaid=False because we've just initialized the order
    # we haven't received the money we will handle the payment succes in next 
    # function
    vehicle = Cars.objects.get(id = car_id)
    user = request.user
    reservation = Cars_Reservation.objects.get(id=reservation_id)

    order = Rent.objects.create(vehicle=vehicle,
                                customer=user,  
                                first_name = name,  
                                total_payed=amount, 
                                order_number=payment['id'],
                                daily_rent_fee=vehicle.price,
                                rent_date = request.data['date_from'],
                                return_date = request.data['date_to'],
                                reservation_id = reservation,
                               )
    serializer = RentSerializer(order)

    data = {
        'payment': payment,
        'order' : serializer.data
    }
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def handle_payment_success(request):

    reservation_id = request.data['res_id']
    print(reservation_id)
    res = json.load(request.data['response'])
    print(res,'response id heeee')

    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""

    # res.keys() will give us list of keys in res
    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
        elif key == 'razorpay_signature':
            raz_signature = res[key]
    
    # get order by payment_id which we've created earlier with isPaid=False
    order = Rent.objects.get(order_number=ord_id)
    # we will pass this whole data in razorpay client to verify the payment
    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }

    client = razorpay.Client(auth=(settings.RAZORPAY_ID,settings.RAZORPAY_KEY))

    # checking if the transaction is valid or not by passing above data dictionary in 
    # razorpay client if it is "valid" then check will return None
    check = client.utility.verify_payment_signature(data)
    if check is None:
       
        return Response({'error': 'Something went wrong'})
    
    reservation = Cars_Reservation.objects.get(id = reservation_id)
    reservation.is_payed = True
    reservation.save()