# CarCar

Team:

- Tifa - Service
- Sama - Sales

## Design

## Service microservice

The Service microservice backend includes models for Technician, Appointment, as well as AutomobileVO. For the Technician model, there are APIs for HTTP requests including GET (list all technicians), POST (create a new technician), and DELETE (delete an existing technician). Similarly, for the Appointment model, there are also APIs for GET, POST, and DELETE to get a list of appointments, create a new appointment, and deleting an existing appointment, respectively. There is also a poller file that polls automobile data from the 'inventory' service every 60 seconds.

For frontend, the Service microservice has pages to view all technicians, add a technician, view all appointments, add a new appointment, and a service history page. There are also functionalities to cancel and finish an appointment (in the view all appointment page), which the status of that appointment will be reflected accordingly on the service history page. And on the service hisotry page, there is a serach box which allows user to search for a vervice via VIN. Another feature is that each appointment has a VIP status (yes/no). It is based on whether the VIN entered in appointment create form matches the VIN in our inventory. If it does, that appointment will have a status = yes. And vice versa.

## Sales microservice

I created APIs for managing sales records, including salespeople, customers, and individual sales allowing you to Create, Update, Delete api_sales_person, api_customer, api_sales, api_list_sales. After setting up the models, views, and URLs, I shifted my focus to the front-end of the project. Here, I created the required forms and lists that would be displayed on the web application. Unfortunatly, I was not able to get SalesHistoryList to work correctly. I added navigation links to Nav.js and created routes in App.js to help user navigation.
