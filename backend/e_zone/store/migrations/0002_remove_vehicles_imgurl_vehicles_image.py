# Generated by Django 4.1 on 2022-08-16 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vehicles',
            name='imgUrl',
        ),
        migrations.AddField(
            model_name='vehicles',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='vehicles'),
        ),
    ]
