# Generated by Django 5.1.5 on 2025-01-29 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0005_usuario_is_staff_alter_usuario_correo'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='last_login',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
