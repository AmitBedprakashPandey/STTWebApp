import { configureStore } from "@reduxjs/toolkit";
import CityReducer from "./Feature/CitySlice";
import QualityReducer from "./Feature/QualitySlice";
import CustomerWiseReducer from "./Feature/CustomerWiseSlice";
import ProcessDetails from "./Feature/ProcessSlice";
import TransportDetails  from "./Feature/TransportSlice";
import CustomerDetails from "./Feature/CustomerSlice";
import SupplierDetails from "./Feature/SupplierSlice";
export const Store = configureStore({
  reducer: {
    City: CityReducer,
    Quality:QualityReducer,
    CustomerWise:CustomerWiseReducer,
    process:ProcessDetails,
    Transport:TransportDetails,
    Customer:CustomerDetails,
    Supplier:SupplierDetails
  },
});
