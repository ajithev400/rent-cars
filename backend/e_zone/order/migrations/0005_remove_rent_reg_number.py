# Generated by Django 4.1 on 2022-09-02 09:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0004_rent_reg_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rent',
            name='reg_number',
        ),
    ]
