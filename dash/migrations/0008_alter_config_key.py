# Generated by Django 3.2 on 2022-11-19 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dash', '0007_alter_history_ec'),
    ]

    operations = [
        migrations.AlterField(
            model_name='config',
            name='key',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]