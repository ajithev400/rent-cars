# Generated by Django 4.1 on 2022-09-20 06:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('car_rent', '0002_cars_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cars_rents',
            name='creator',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='cars_rents',
            name='deposit',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='cars_rents',
            name='deposit_currency',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='cars_rents',
            name='id_cars',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='carRents', to='car_rent.cars'),
        ),
        migrations.AlterField(
            model_name='cars_rents',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='locationRents', to='car_rent.locations'),
        ),
        migrations.AlterField(
            model_name='cars_rents',
            name='total_price',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='cars_rents',
            name='total_price_currency',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='cars_rents',
            name='total_price_is_paid',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
