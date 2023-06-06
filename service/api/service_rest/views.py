from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import AutomobileVOEncorder, TechnicianEncoder, AppointmentEncoder
from .models import AutomobileVO, Technician, Appointment


@require_http_methods(["GET"])
def api_list_automobile_vo(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncorder,
        )
