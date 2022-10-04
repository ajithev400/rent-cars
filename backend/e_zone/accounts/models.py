from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin

class MyAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, mobile,email, password=None):
        if not email:
            raise ValueError("User must have an email address")
        if not mobile:
            raise ValueError("User must have a mobile Number")
        user = self.model(
            email=self.normalize_email(email),
            mobile=mobile,
            first_name=first_name,
            last_name=last_name,
        )
        user.is_varified = False
        user.role = 'Customer'
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, mobile,email, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            mobile=mobile,
            first_name=first_name,
            last_name=last_name,
        )
        user.role = 'Admin'
        user.is_admin = True
        user.is_varified = True
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user




class Account(AbstractBaseUser,PermissionsMixin):
    ROLES =(
        ("Customer","Customer"),
        ("Vender","Vender"),
        ("Admin","Admin"),
    )
    email = models.EmailField(verbose_name="email", max_length=60, unique=True, blank=False)
    first_name = models.CharField(max_length=60, blank=False)
    last_name = models.CharField(max_length=60, blank=False)
    username = models.CharField(max_length=60, unique=False, blank=True)
    gender = models.CharField(max_length=10,blank=False,choices=[("MALE", "MALE"), ("FEMALE", "FEMALE")])
    mobile = models.CharField(max_length=13, blank=False, unique=True)
    date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now_add=True)
    role = models.CharField(choices=ROLES, max_length= 50, default="Customer")
    is_admin = models.BooleanField(default=False)
    is_varified = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["mobile", "first_name", "last_name"]

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        ordering = ['-last_login','-date_joined']