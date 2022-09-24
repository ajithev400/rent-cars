# Generated by Django 4.1 on 2022-09-02 05:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('store', '0006_vehicles_reg_number'),
        ('vendor', '0004_alter_vendor_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reg_number', models.CharField(max_length=20)),
                ('rent_date', models.DateField()),
                ('return_date', models.DateField()),
                ('total_rent_date', models.IntegerField(default=1)),
                ('daily_rent_fee', models.IntegerField()),
                ('down_payment', models.IntegerField()),
                ('total_payed', models.IntegerField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('vehicle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.vehicles')),
                ('vendor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vendor.vendor')),
            ],
        ),
    ]