# Generated by Django 4.1 on 2022-09-06 06:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0007_vehiclecurrentstatus'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reviewrating',
            old_name='user',
            new_name='owner',
        ),
        migrations.RenameField(
            model_name='vehiclecurrentstatus',
            old_name='user',
            new_name='owner',
        ),
    ]
