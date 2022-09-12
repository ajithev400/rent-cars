from django.db import models
from accounts.models import Account
from vendor.models import Vendor
from store.models import Vehicles
# Create your models here.

STATUS = (
    ("New", "New"),
    ("Placed", "Placed"),
    ("Piked", "Piked"),
    ("Return", "Return"),
    ("Canceled", "Canceled"),
)


class Payment(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    payment_id = models.CharField(max_length=100)
    payment_method = models.CharField(max_length=100)
    amount_paid = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.Payment_id


class Rent(models.Model):
    # reg_number = models.CharField(max_length=20)
    vehicle = models.ForeignKey(Vehicles,on_delete=models.CASCADE,blank=True,null=True)
    customer = models.ForeignKey(Account,on_delete=models.CASCADE,blank=True,null=True)
    order_number = models.CharField(max_length=50,blank=True,null=True)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE,blank=True,null=True)
    first_name = models.CharField(max_length=50,blank=True,null=True)
    last_name = models.CharField(max_length=50,blank=True,null=True)
    phone_number = models.CharField(max_length=15,blank=True,null=True)
    email = models.EmailField(max_length=50,blank=True,null=True)
    rent_date = models.DateField()
    return_date = models.DateField()
    total_rent_date = models.IntegerField(default=1,blank=True,null=True)
    daily_rent_fee = models.IntegerField()
    total_payed = models.IntegerField(blank=True,null=True)
    status = models.CharField(choices=STATUS, max_length=20, default="New")
    is_ordered = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,blank=True,null=True)

    # def __str__(self):
    #     return self.

    class Meta:
        ordering = ['-updated_at','-created_at'] 