import "./App.css";
import { Route, Routes } from "react-router-dom";
import Quality from "./Master/Quality";
import Navbar from "./components/Navbar";
import City from "./Master/City";
import Catagory from "./Master/catagory";
import Supplier from "./Master/Supplier";
import Process from "./Master/Process";
import PrintPage from "./printPage/CustomerWisePrint";
import Home from "./Master/Home";
import Transport from "./Master/Transport";
import Customer from "./Master/Customer";
import CustomerWiseReport from "./Report/CustomerWiseReport";
import "react-toastify/dist/ReactToastify.css";
import CustomerWise from "./Entry/CustomerWise";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exct path="/" element={<Home />} />
        <Route exct path="/quality" element={<Quality />} />
        <Route exct path="/city" element={<City />} />
        <Route exct path="/transport" element={<Transport />} />
        <Route exct path="/process" element={<Process />} />
        <Route exct path="/customer" element={<Customer />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/catagory" element={<Catagory />} />
        <Route path="/customerwise" element={<CustomerWise />} />
        <Route path="/customerwisereport" element={<CustomerWiseReport />} />
        <Route path="/printpage" element={<PrintPage />} />
      </Routes>
    </>
  );
}

export default App;
