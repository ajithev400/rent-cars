# Generated by Django 4.1 on 2022-09-15 04:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0008_remove_rent_vendor_rent_email_rent_first_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rent',
            name='total_payed',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]