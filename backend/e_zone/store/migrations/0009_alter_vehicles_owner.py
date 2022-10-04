# Generated by Django 4.1 on 2022-09-20 06:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0007_alter_vendor_owner'),
        ('store', '0008_rename_user_reviewrating_owner_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehicles',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='vendor.vendor'),
        ),
    ]
