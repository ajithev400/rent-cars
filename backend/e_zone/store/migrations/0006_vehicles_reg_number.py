# Generated by Django 4.1 on 2022-09-02 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_alter_vehicles_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehicles',
            name='reg_number',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
