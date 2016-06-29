# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0005_auto_20160629_0402'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='mmr',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
