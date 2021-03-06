# Generated by Django 3.1.4 on 2021-02-21 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='主键')),
                ('name', models.CharField(max_length=200, verbose_name='用户名')),
                ('pw', models.CharField(max_length=200, verbose_name='密码')),
                ('create_date', models.DateField(auto_now_add=True, verbose_name='创建日期')),
            ],
            options={
                'ordering': ['-create_date'],
            },
        ),
    ]
