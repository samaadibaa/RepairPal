from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment


class AutomobileVOEncorder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "sold",
        "import_href",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date",
        "time",
        "reason",
        "vin",
        "customer",
        "status",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }
