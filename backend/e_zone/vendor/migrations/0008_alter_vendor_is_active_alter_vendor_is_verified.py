# Generated by Django 4.1 on 2022-09-27 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0007_alter_vendor_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vendor',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]
