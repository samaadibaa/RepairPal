import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salesman/list">
                List all salespeople
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salesman/add">
                Add a salesperson
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customer/add">
                Add a customer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customer/list">
                List all customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vehicles">
                Vehicles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobile/list">
                List Automobiles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers/list">
                List Manufacturers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/add">
                Record a new sale
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
    </nav>
  )
}

export default Nav;
