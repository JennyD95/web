# Generated by Django 4.1.4 on 2022-12-28 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0003_snakehighcore'),
    ]

    operations = [
        migrations.AddField(
            model_name='snakehighcore',
            name='points',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]