# Generated by Django 4.1 on 2022-10-05 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('car_rent', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cars',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]