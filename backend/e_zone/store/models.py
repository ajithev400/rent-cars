from django.db import models
from accounts.models import Account
from vendor.models import Vendor

class Vehicles(models.Model):
    SEATTYPE =(
        ("Regular","Regular"),
        ("Heated seats","Heated seats"),
    )
    TRANSMISSION = (
        ("Manual Transmission","Manual Transmission"),
        ("Automatic","Automatic")
    )
    vehicle_name = models.CharField(max_length=150, blank=False, null = False)
    reg_number = models.CharField(max_length=20,blank=True,null=True)
    slug = models.SlugField(max_length=100,unique=True)  
    brand = models.CharField(max_length=150, blank=False, null=False)
    model = models.CharField(max_length=150, blank=False, null= False)
    price = models.IntegerField(null=False,blank=False)
    owner = models.ForeignKey(Vendor, related_name='posts', on_delete= models.CASCADE, blank=True, null=True)
    image = models.ImageField(upload_to='vehicles',null=True,blank=True)
    speed = models.CharField(max_length=50, blank=True, null=True)
    seat_type = models.CharField(choices=SEATTYPE,max_length=50,default='Regular')
    transmission = models.CharField(choices=TRANSMISSION,max_length=50, default='Manual Transmission')
    description = models.TextField()
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at','-created_at'] 

    def __str__(self):
        return self.vehicle_name


class ReviewRating(models.Model):
    vehicle = models.ForeignKey(Vehicles, on_delete=models.CASCADE)
    user = models.ForeignKey(Account,on_delete=models.CASCADE)
    subject = models.CharField(max_length=100, blank=True)
    review = models.TextField(max_length=500, blank=True)
    rating = models.FloatField()
    status = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-updated_at','-created_at'] 

    def __str__(self):
        return self.subject
    
    def rating_percentage(self):
        return self.rating * 20
