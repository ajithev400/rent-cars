# Generated by Django 4.1 on 2022-09-01 04:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0003_alter_vendor_email'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='vendor',
            options={'ordering': ['-updated_at', '-created_at']},
        ),
    ]
