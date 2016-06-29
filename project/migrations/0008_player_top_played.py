# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0007_auto_20160629_0440'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='top_played',
            field=models.CharField(max_length=255, blank=True, null=True),
        ),
    ]
