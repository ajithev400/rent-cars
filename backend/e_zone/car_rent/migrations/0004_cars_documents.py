# Generated by Django 4.1 on 2022-09-20 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('car_rent', '0003_alter_cars_rents_creator_alter_cars_rents_deposit_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cars',
            name='documents',
            field=models.FileField(blank=True, null=True, upload_to='vehicles/documents/'),
        ),
    ]