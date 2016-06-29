# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0006_player_mmr'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='selected_carry',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='player',
            name='selected_mid',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='player',
            name='selected_offlaner',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='player',
            name='selected_support',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AddField(
            model_name='player',
            name='selected_support2',
            field=models.IntegerField(null=True, blank=True),
        ),
    ]
