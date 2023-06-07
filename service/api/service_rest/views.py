from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import AutomobileVOEncorder, TechnicianEncoder, AppointmentEncoder
from .models import AutomobileVO, Technician, Appointment


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        if Technician.objects.filter(employee_id=content["employee_id"]).exists():
            return JsonResponse(
                {"message": "employee_id already exists"},
                status=404,
            )
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_show_technician(request, pk):
    try:
        count, _ = Technician.objects.get(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    except Technician.DoesNotExist:
        return JsonResponse(
            {"message": "this technician does not exist"},
            status=404,
        )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "invalid technician id"},
                status=404,
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_show_appointment(request, pk):
    try:
        count, _ = Appointment.objects.get(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "this appointment does not exists"},
            status=404,
        )


@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.cancel_appointment()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "this appointment does not exists"},
            status=404,
        )


@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.finish_appointment()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "this appointment does not exists"},
            status=404,
        )
