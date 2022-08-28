# Generated by Django 4.1 on 2022-08-28 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_account_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='role',
            field=models.CharField(choices=[('Customer', 'Customer'), ('Vender', 'Vender'), ('Admin', 'Admin')], default='Customer', max_length=50),
        ),
    ]
