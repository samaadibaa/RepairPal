from django.urls import path
from sales_rest.views import api_customer, api_sales_person, api_sales, api_list_sales, get_salespeople

urlpatterns = [
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:pk>/", api_sales, name="api_sales"),
    path("customer/", api_customer, name="api_customer"),
    path("customer/<int:customer_id>/", api_customer, name="api_customer_detail"),
    path("salesperson/", api_sales_person, name="api_sales_person"),
    path("salespeople/", get_salespeople, name="get_salespeople"),
    path("sales/<int:auto_vo_id>/", api_list_sales, name="api_list_sales_auto"),
    path("salesperson/<int:salesperson_id>/", api_sales_person, name="api_sales_person_detail"),
]

