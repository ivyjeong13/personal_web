# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0002_auto_20160627_1933'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hero',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True, serialize=False)),
                ('hero_id', models.IntegerField(null=True, blank=True)),
                ('name', models.CharField(null=True, blank=True, max_length=255)),
                ('localized_name', models.CharField(null=True, blank=True, max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True, serialize=False)),
                ('item_id', models.IntegerField(null=True, blank=True)),
                ('name', models.CharField(null=True, blank=True, max_length=255)),
                ('localized_name', models.CharField(null=True, blank=True, max_length=255)),
            ],
        ),
    ]
