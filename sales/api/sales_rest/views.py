from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from sales_rest.models import Salesperson, Customer, Sale, AutomobileVO
from django.views.decorators.http import require_http_methods
from sales_rest.encoders import SalespersonEncoder, CustomerEncoder, SaleEncoder
import json


@require_http_methods(["GET", "POST", "DELETE"])
def api_sales_person(request, salesperson_id=None):
    if request.method == "GET":
        if salesperson_id is not None:
            return get_salesperson(request, salesperson_id)
        else:
            return get_salespeople(request)
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid JSON format"},
                status=400
            )
        return create_salesperson(request, content)
    elif request.method == "DELETE":
        salesperson = get_object_or_404(Salesperson, id=salesperson_id)
        salesperson.delete()
        return HttpResponse(status=204)

def get_salesperson(request, salesperson_id):
    try:
        salesperson = Salesperson.objects.get(pk=salesperson_id)
        return JsonResponse(
            salesperson.to_dict(),
            encoder=SalespersonEncoder,
        )
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"error": "Salesperson matching query does not exist."},
            status=404
        )

def get_salespeople(request):
    salespeople = Salesperson.objects.all()
    return JsonResponse(
        {"salespeople": [s.to_dict() for s in salespeople]},
        encoder=SalespersonEncoder,
    )

def create_salesperson(request, content):
    salesperson = Salesperson.objects.create(**content)
    return JsonResponse(
        salesperson.to_dict(),
        encoder=SalespersonEncoder,
    )





@require_http_methods(["GET", "POST", "DELETE"])
def api_customer(request, customer_id=None):
    if request.method == "GET":
        if customer_id:
            customer = get_object_or_404(Customer, id=customer_id)
            return JsonResponse(
                {"customer": customer},
                encoder=CustomerEncoder,
            )
        else:
            customers = Customer.objects.all()
            return JsonResponse(
                {"customers": customers},
                encoder=CustomerEncoder,
                safe=False,
            )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except json.JSONDecodeError as e:
            return JsonResponse(
                {"error": "Invalid JSON: " + str(e)},
                status=400
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=200
            )
    elif request.method == "DELETE":
        customer = get_object_or_404(Customer, id=customer_id)
        customer.delete()
        return HttpResponse(status=204)


@require_http_methods(["GET", "DELETE"])
def api_sales(request, pk):
    if request.method == "GET":
        sales_record = Sale.objects.filter(salesman=pk)
        sales_record_list = []
        for sales in sales_record:
            sales_record_list.append({
                "salesperson": sales.salesman.name,
                "customer": sales.customer.name,
                "automobile": sales.automobile.vin,
                "price": sales.price,
            })
        return JsonResponse(
            {"sales_record": sales_record_list},
            encoder=SaleEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse({"message": "Sale record deleted successfully."})
        except Sale.DoesNotExist:
            return JsonResponse({"error": "Sale record not found."}, status=404)


@require_http_methods(["GET", "POST"])
def api_list_sales(request, auto_vo_id=None):
    if request.method == "GET":
        if auto_vo_id is not None:
            sales = Sale.objects.filter(automobile_id=auto_vo_id).select_related('salesperson', 'customer', 'automobile')
        else:
            sales = Sale.objects.all().select_related('salesperson', 'customer', 'automobile')

        sales_data = []
        for sale in sales:
            sales_data.append({
                "salesperson": sale.salesperson.to_dict(),
                "customer": sale.customer.to_dict(),
                "automobile": sale.automobile.to_dict(),
                "price": sale.price,
            })

        return JsonResponse(
            {"sales": sales_data},
            encoder=SaleEncoder,
        )

    elif request.method == "POST":
        try:
            content = json.loads(request.body)

            salesman_id = content.get("salesperson")
            customer_id = content.get("customer")
            automobile_id = content.get("automobile")

            salesman = Salesperson.objects.get(id=salesman_id)
            customer = Customer.objects.get(id=customer_id)
            automobile = AutomobileVO.objects.get(id=automobile_id)

            new_sale = Sale.objects.create(
                salesperson=salesman,
                customer=customer,
                automobile=automobile,
                price=content.get("price"),
            )

            return JsonResponse(
                {
                    "salesperson": salesman.to_dict(),
                    "customer": customer.to_dict(),
                    "automobile": automobile.to_dict(),
                    "price": new_sale.price,
                },
                encoder=SaleEncoder,
                safe=False,
            )

        except (json.JSONDecodeError, Salesperson.DoesNotExist, Customer.DoesNotExist, AutomobileVO.DoesNotExist) as e:
            return JsonResponse(
                {"error": str(e)},
                status=400,
            )
