from django.contrib import admin
from .models import Account
from django.contrib.auth.admin import UserAdmin

# Register your models here.


class AccountAdmin(UserAdmin):
    list_display = (
        "email",
        "first_name",
        "last_name",
        "username",
        'role',
        "gender",
        "date_joined",
        "last_login",
        "mobile",
        "is_active",
        "is_varified",
        "is_rejected",
        "is_staff",
        "is_superuser"
    )
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(Account, AccountAdmin)