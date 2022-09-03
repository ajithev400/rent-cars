# Generated by Django 4.1 on 2022-09-01 04:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0004_alter_vendor_options'),
        ('store', '0004_rename_varient_reviewrating_vehicle'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehicles',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='vendor.vendor'),
        ),
    ]
