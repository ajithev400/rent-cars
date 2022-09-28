from django.db import models
from accounts.models import Account
from vendor.models import Vendor



SEATTYPE =(
        ("Regular","Regular"),
        ("Heated seats","Heated seats"),
    )
TRANSMISSION = (
    ("Manual Transmission","Manual Transmission"),
    ("Automatic","Automatic")
)

class Locations(models.Model):
    name = models.CharField(max_length=255, unique=True)
    short_name = models.CharField(max_length=100)
    image = models.ImageField(null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    creator = models.CharField(max_length=255)
    supp_unique_var = models.BigIntegerField(unique=True, blank=True, null=True)

    def __str__(self):
        return str(self.short_name)

class Cars(models.Model):
    
    name = models.CharField(max_length=150, blank=False, null = False)
    slug = models.SlugField(max_length=100,unique=True)  
    code_registration = models.CharField(max_length=20,blank=True,null=True)
    documents = models.FileField(upload_to='vehicles/documents/',blank=True, null= True)
    main_location = models.ForeignKey(
        Locations, related_name="tracks", on_delete=models.SET_NULL, null=True
    )
    brand = models.CharField(max_length=150, blank=False, null=False)
    model = models.CharField(max_length=150, blank=False, null= False)
    price = models.IntegerField(null=False,blank=False)
    owner = models.ForeignKey(Vendor, on_delete= models.CASCADE, blank=True, null=True)
    creator = models.CharField(max_length=255)
    image = models.ImageField(upload_to='vehicles',null=True,blank=True)
    speed = models.CharField(max_length=50, blank=True, null=True)
    seat_type = models.CharField(choices=SEATTYPE,max_length=50,default='Regular')
    transmission = models.CharField(choices=TRANSMISSION,max_length=50, default='Manual Transmission')
    description = models.TextField()
    date_of_entry = models.DateTimeField(auto_now_add=True)
    on_the_way = models.BooleanField(default=False)
    location = models.CharField(max_length=255, null=True, blank=True)
    to_the_location = models.CharField(max_length=255, null=True, blank=True)
    come_back = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at','-created_at'] 

    def __str__(self):
        return self.name

class CarsDocument(models.Model):
    car_id = models.CharField(max_length=10)
    document = models.FileField(upload_to='vendor/vehicles/documents')
    cars = models.ForeignKey(Cars,on_delete=models.CASCADE)
    owner = models.ForeignKey(Account,on_delete=models.CASCADE)
    vendor_id = models.ForeignKey(Vendor,on_delete=models.CASCADE)


class Cars_ARC(models.Model):
    id_car = models.CharField(max_length=5)
    id_location = models.CharField(max_length=5)
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=100)
    code_registration = models.CharField(max_length=20)
    creator_ARC = models.CharField(max_length=255)
    change_date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=255)
    on_the_way = models.BooleanField(default=False)
    location = models.CharField(max_length=255, null=True, blank=True)
    to_the_location = models.CharField(max_length=255, null=True, blank=True)
    come_back = models.BooleanField(default=False)


class Cars_Reservation(models.Model):
    id_cars = models.ForeignKey(
        Cars, related_name="carReservations", on_delete=models.SET_NULL, null=True
    )
    client = models.ForeignKey(Account,on_delete=models.CASCADE,blank=True,null=True)
    client_name = models.CharField(max_length=255)
    client_document_type = models.CharField(max_length=50, null=True, blank=True)
    client_document_identification = models.CharField(
        max_length=50, null=True, blank=True
    )
    client_phone = models.CharField(max_length=20, null=True, blank=True)
    client_email = models.EmailField(null=True, blank=True)
    date_from = models.DateTimeField(null=True, blank=True)
    date_to = models.DateTimeField(null=True, blank=True)
    note = models.CharField(max_length=1024, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    location = models.ForeignKey(
        Locations,
        related_name="locationReservations",
        on_delete=models.SET_NULL,
        null=True,
    )
    creator = models.CharField(max_length=255)
    owner = models.ForeignKey(Vendor, on_delete= models.CASCADE, blank=True, null=True)
    date_of_change = models.DateTimeField(blank=True, null=True)
    creator_change = models.CharField(max_length=64, blank=True, null=True)
    type_change = models.CharField(max_length=64, blank=True, null=True)
    id_arc = models.CharField(max_length=64, blank=True, null=True)



class Cars_Rents(models.Model):
    id_cars = models.ForeignKey(
        Cars, related_name="carRents", on_delete=models.SET_NULL, null=True, blank=True
    )
    client = models.ForeignKey(Account,on_delete=models.CASCADE,blank=True,null=True)
    client_name = models.CharField(max_length=255)
    client_document_type = models.CharField(max_length=50, null=True, blank=True)
    client_document_identification = models.CharField(
        max_length=50, null=True, blank=True
    )
    client_phone = models.CharField(max_length=20, null=True, blank=True)
    client_email = models.EmailField(null=True, blank=True)
    date_from = models.DateTimeField(auto_now_add=True)
    date_to = models.DateTimeField(null=True, blank=True)
    deposit = models.CharField(max_length=255,null=True, blank=True)
    deposit_currency = models.CharField(max_length=255,null=True, blank=True)
    deposit_is_active = models.BooleanField(default=False)
    total_price = models.CharField(max_length=255,null=True, blank=True)
    total_price_currency = models.CharField(max_length=255,null=True, blank=True)
    total_price_is_paid = models.BooleanField(default=False,null=True, blank=True)
    creator = models.CharField(max_length=255,null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    location = models.ForeignKey(
        Locations, related_name="locationRents", on_delete=models.SET_NULL, null=True, blank=True
    )
    note = models.CharField(max_length=1024, null=True, blank=True)
