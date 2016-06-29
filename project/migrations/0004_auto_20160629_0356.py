# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_hero_item'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='carries',
            field=models.ManyToManyField(blank=True, to='project.Player', related_name='carries_rel_+'),
        ),
        migrations.AddField(
            model_name='player',
            name='mids',
            field=models.ManyToManyField(blank=True, to='project.Player', related_name='mids_rel_+'),
        ),
        migrations.AddField(
            model_name='player',
            name='offlaners',
            field=models.ManyToManyField(blank=True, to='project.Player', related_name='offlaners_rel_+'),
        ),
        migrations.AddField(
            model_name='player',
            name='other_positions',
            field=models.CharField(max_length=255, default=''),
        ),
        migrations.AddField(
            model_name='player',
            name='pref_position',
            field=models.CharField(max_length=255, default=''),
        ),
        migrations.AddField(
            model_name='player',
            name='pref_region',
            field=models.CharField(max_length=255, default=''),
        ),
        migrations.AddField(
            model_name='player',
            name='supports',
            field=models.ManyToManyField(blank=True, to='project.Player', related_name='supports_rel_+'),
        ),
    ]
