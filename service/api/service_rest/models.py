from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200, unique=True)
    sold = models.BooleanField()
    import_href = models.CharField(max_length=200, unique=True)


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True)


class Appointment(models.Model):
    date = models.DateField()
    time = models.TimeField()
    reason = models.CharField(max_length=200)
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)

    status = models.CharField(max_length=25, default="created", null=True)

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def cancel_appointment(self):
        self.status = "canceled"
        self.save()

    def finish_appointment(self):
        self.status = "finished"
        self.save()
