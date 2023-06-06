from django.contrib import admin
from .models import Technician, Appointment


@admin.register(Technician)
class Technician(admin.ModelAdmin):
    pass


@admin.register(Appointment)
class Appointment(admin.ModelAdmin):
    pass
