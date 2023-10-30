Sales - Sama Younis
Service - Tifa Nguyen

Design
Project Beta is designed to function as an application to handle all of the aspects of a car dealership such as services, sales and inventory.
The service component offers a wide range of functionalities such as managing car-servicing, from scheduling the appointments and viewing the current and past appointment history, adding and browsing through all of the on-site technicians.
The sales component also offers an extensive range of functionalities, such as tracking a list of all the sales and viewing the history of all sale transactions, adding and browsing through all of the customers.
The inventory component allows to conveniently access all the automobiles in the inventory, as well as add/update/delete them. You may also add specific details of the cars such as the manufacturer, model and year.
Front-End: React, Bootstrap and Javascript
Back-End: Django Framework


Service microservice
The Service Microservice includes the following models:


Technician

first name
last name
employee id



Appointment

date
time
reason
vin
customer
technician



AutomobileVO
color
year
vin
model

AutomobileVO is created and updated via polling to fetch data from the  Inventory API

Sales microservice
The Sales Microservice includes the following models:


Sale


Customer


Salesperson


AutomobileVO


AutomobileVO is created and updated via polling to fetch data from the  Inventory API
