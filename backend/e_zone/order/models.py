from django.db import models
from accounts.models import Account
from vendor.models import Vendor
from store.models import Vehicles
# Create your models here.

class Rent(models.Model):
    # reg_number = models.CharField(max_length=20)
    vehicle = models.ForeignKey(Vehicles,on_delete=models.CASCADE)
    customer = models.ForeignKey(Account,on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor,on_delete=models.CASCADE)
    rent_date = models.DateField()
    return_date = models.DateField()
    total_rent_date = models.IntegerField(default=1)
    daily_rent_fee = models.IntegerField()
    down_payment = models.IntegerField()
    total_payed = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,blank=True,null=True)

    # def __str__(self):
    #     return self.

    class Meta:
        ordering = ['-updated_at','-created_at'] 