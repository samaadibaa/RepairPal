# Generated by Django 4.0.3 on 2023-06-06 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_alter_appointment_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(default='created', max_length=25, null=True),
        ),
        migrations.DeleteModel(
            name='Status',
        ),
    ]
