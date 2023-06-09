import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="manufactures/create" className="nav-link">
              Create Manufacture
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="models/create" className="nav-link">
              Create Vehicle Model
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
            <NavLink className="nav-link" aria-current="page" to="/">
              Home
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
            <NavLink className="nav-link" to="/vehicles">
              Vehicles
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/automobile/list">
              Automobiles
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/manufacturers/list">
              Manufacturers
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

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
