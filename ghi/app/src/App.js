import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './SalesPersonForm';
import SalesRecordForm from './SalesRecordForm';
import SalesHistoryList from './SalesHistoryList';
import ListSalesPeople from './ListSalesPeopleForm';
import ListCustomer from './ListCustomer';
import AddCustomerForm from './AddCustomerForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/salesman/add' element={<SalesPersonForm />} />
          <Route path='/salesman/list' element={<ListSalesPeople />} />
          <Route path='/customer/add' element={<AddCustomerForm />} />
          <Route path='/customer/list' element={<ListCustomer />} />
          <Route path='/sales' element={<SalesHistoryList />} />
          <Route path='/sales/add' element={<SalesRecordForm />} />
          <Route path='/sales/history' element={<SalesHistoryList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
