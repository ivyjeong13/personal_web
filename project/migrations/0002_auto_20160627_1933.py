# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='password',
        ),
        migrations.RemoveField(
            model_name='player',
            name='username',
        ),
        migrations.AddField(
            model_name='player',
            name='location',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='player',
            name='picture',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='player',
            name='real_name',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='player',
            name='steam_name',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='player',
            name='user',
            field=models.ForeignKey(blank=True, null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
