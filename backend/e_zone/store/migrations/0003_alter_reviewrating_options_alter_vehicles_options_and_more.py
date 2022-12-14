# Generated by Django 4.1 on 2022-08-19 17:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('store', '0002_remove_vehicles_imgurl_vehicles_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='reviewrating',
            options={'ordering': ['-updated_at', '-created_at']},
        ),
        migrations.AlterModelOptions(
            name='vehicles',
            options={'ordering': ['-updated_at', '-created_at']},
        ),
        migrations.AddField(
            model_name='vehicles',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL),
        ),
    ]
