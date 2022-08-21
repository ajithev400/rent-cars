from django.db import models
from accounts.models import Account
# Create your models here.
class Vendor(models.Model):
    vendor_name = models.CharField(max_length=100)
    user = models.ForeignKey(Account, related_name='vendor', on_delete= models.CASCADE, blank=True, null=True)
    GST_number = models.CharField(max_length=100, unique=True, blank=True, null=True)
    email = models.EmailField(max_length=150, unique=True, null=True, blank=True)
    mobile = models.CharField(max_length=10, unique=True)
    image = models.ImageField(upload_to='vendors', blank=True, null= True)

    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.vendor_name

    def has_perm(self,perm,obj=None):
        return self.is_active