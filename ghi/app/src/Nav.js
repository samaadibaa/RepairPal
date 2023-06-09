import { NavLink } from "react-router-dom";
import "./index.css";

function Nav() {
  return (
    <nav class="navbar bg-body-tertiary fixed-to navbar-dark bg-success">
      <div class="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              CarCar
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <NavLink className="nav-link" to="/manufacturers/list">
                  Manufacturers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="manufactures/create" className="nav-link">
                  Create Manufacture
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/vehicles">
                  Vehicles
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="models/create" className="nav-link">
                  Create Vehicle Model
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/automobile/list">
                  Automobiles
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="automobiles/create" className="nav-link">
                  Create Automobile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="technicians/" className="nav-link">
                  Technicians
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="technicians/create" className="nav-link">
                  Create Technician
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="appointments/" className="nav-link">
                  Appointments
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="appointments/create" className="nav-link">
                  Create Appointment
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="appointments/history" className="nav-link">
                  Service History
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/salesman/list">
                  Salespeople
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/salesman/add">
                  Add a Salesperson
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/customer/add">
                  Add a Customer
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/customer/list">
                  Customers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales/add">
                  Add a sale
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales/list">
                  Sales
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales/history">
                  Sales History
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
