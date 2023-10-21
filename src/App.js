import "./App.css";
import {Route, Routes } from "react-router-dom";
import Quality from "./Master/Quality";
import Header from "./header";
import City from "./Master/City";
import Catagory from "./Master/catagory";
import Supplier from "./Master/Supplier";
import Process from "./Master/Process";
import Home from "./Master/Home";
import Transport from "./Master/Transport";
import Customer from "./Master/Customer";
import CustomerWiseReport from './Report/CustomerWiseReport';
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

function App() {
return (<>
    <Header/>
    <div style={{margin:70}} />
        <Routes>                
        <Route path="/" element={<Home/>} />
          <Route path="/quality" element={<Quality/>} />
          <Route path="/city" element={<City/>} />
          <Route path="/transport" element={<Transport/>} />
          
          {/* <Route path="/supplier" element={<Supplier/>} />
          <Route path="/process" element={<Process/>} />
         <Route path="/catagory" element={<Catagory/>} />
          <Route path="/customer" element={<Customer/>} />
          <Route path="/customerwisereport" element={<CustomerWiseReport/>} /> */}
        </Routes>
    </>
  );
}

export default App;
