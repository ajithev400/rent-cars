from distutils.command.upload import upload
from django.db import models

from accounts.models import Account

# Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(Account, related_name='profile', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=10, blank=False, null=True,choices=[
        ("MALE", "MALE"),
        ("FEMALE", "FEMALE")
    ],)
    phone = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)
    profile_picture = models.ImageField(upload_to="user/profile", blank=True, null = True)

    def __str__(self):
        return self.first_name

class Address(models.Model):
    user = models.ForeignKey(Account,on_delete=models.CASCADE,null=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)
    address1 = models.CharField(max_length=100)
    address2 = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=50)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    pincode = models.IntegerField()
    default = models.BooleanField(default=False)

    def __str__(self):
        return self.first_name
    
    def full_address(self):
        return f"{self.address1}, {self.address2}"