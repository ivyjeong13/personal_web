# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0009_player_st_time_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='pref_heroes',
            field=models.CharField(null=True, max_length=255, blank=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='st_time_created',
            field=models.IntegerField(null=True, blank=True),
        ),
    ]
