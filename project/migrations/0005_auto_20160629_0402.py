# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0004_auto_20160629_0356'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='location',
            field=models.CharField(blank=True, max_length=255, default='', null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='other_positions',
            field=models.CharField(blank=True, max_length=255, default='', null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='picture',
            field=models.CharField(blank=True, max_length=255, default='', null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='pref_position',
            field=models.CharField(blank=True, max_length=255, default='', null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='pref_region',
            field=models.CharField(blank=True, max_length=255, default='', null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='real_name',
            field=models.CharField(blank=True, max_length=255, default='', null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='steam_name',
            field=models.CharField(blank=True, max_length=255, default='', null=True),
        ),
    ]
