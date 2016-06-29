# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0008_player_top_played'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='st_time_created',
            field=models.IntegerField(max_length=255, null=True, blank=True),
        ),
    ]
