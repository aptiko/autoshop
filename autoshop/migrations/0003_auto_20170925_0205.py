# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-25 02:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('autoshop', '0002_auto_20170923_0501'),
    ]

    operations = [
        migrations.AddField(
            model_name='repair',
            name='description',
            field=models.CharField(default='Important repair', max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='repaircomment',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
