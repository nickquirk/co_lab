# Generated by Django 4.1.4 on 2022-12-14 10:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tracks', '0002_alter_track_fragment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='track',
            name='instrument',
        ),
    ]
