from django.db import models
from django.core.validators import RegexValidator


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)
    import_href = models.CharField(max_length=200, unique=True)

    def to_dict(self):
        return {
            'id': self.id,
            'vin': self.vin,
            'sold': self.sold,
            'import_href': self.import_href,
        }


class Salesperson(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, default="")
    employee_id = models.CharField(max_length=6, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "employee_id": self.employee_id,
        }


class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, null=True)
    address = models.CharField(max_length=200)
    phone_regex = RegexValidator(
        regex=r'^\d{3}-\d{3} \d{4}$',
        message="Phone number must be in the format: '111-111 1111'"
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=12)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'address': self.address,
            'phone_number': self.phone_number,
        }



class Sale(models.Model):
    price = models.CharField(max_length=100)

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        on_delete=models.CASCADE,
    )

    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sale",
        on_delete=models.CASCADE,
    )

    customer = models.ForeignKey(
        Customer,
        related_name="sale",
        on_delete=models.CASCADE,
    )
