import "./report.css";
import CustomerWisePrint from "../printPage/CustomerWisePrint";
import { useEffect, useState } from "react";
import Select from "react-select";
import { DB } from "../config/db.firebase";
import { getDocs, collection } from "firebase/firestore";

const ShowModel = ({ close, FromDate, Todate, Data }) => {
  const [selectedCatagory, setSelectedCatagory] = useState();
  const [catagoryList, setCatagoryList] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  const FromDatehandler = (e) => {
    const date = new Date(e.target.value);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    setFromDate(currentDate);
    console.log(fromDate);
  };
  const ToDatehandler = (e) => {
    const date = new Date(e.target.value);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    setToDate(currentDate);
    console.log(toDate);
  };
  const [selectCtg, setSelectCtg] = useState();
  const catagorySelectChange = (selectedOption) => {
    setSelectedCatagory(selectedOption.Catagory);
    setSelectCtg(selectedOption);
  };
  const getCatagory = async () => {
    const datas = await getDocs(catagoryRef);
    const sortData = datas.docs.map((doc) => ({
      ...doc.data(),
    }));
    setCatagoryList(sortData);
  };

  useEffect(() => {
    getCatagory();
  }, []);

  return (
    <div className="model-container">
      <div class="model-box p-3">
        <div className="input-wrapper d-flex justify-content-center text-uppercase py-3">
          <h4>Report Form</h4>
        </div>
        <button className="btn-close closebtn" onClick={close}></button>
        <div class="input-wrapper">
          <Select
            className="custom-select"
            value={selectCtg}
            onChange={catagorySelectChange}
            getOptionValue={(option) => option.Catagory}
            getOptionLabel={(option) => option.Catagory}
            options={catagoryList}
            isSearchable
          />
          <label for="input" class="form-labNm text-capitalize ">
            Select Supplier
          </label>
        </div>
        <div className="input-wrapper my-4">
          <input
            type="date"
            className="form-control"
            accept="dd/mm/yyyy"
            onChange={FromDatehandler}
          />
          <label for="input" class="form-labNm text-capitalize ">
            From Date
          </label>
        </div>
        <div className="input-wrapper">
          <input
            type="date"
            className="form-control "
            onChange={ToDatehandler}
          />
          <label for="input" class="form-labNm text-capitalize ">
            To Date
          </label>
        </div>
        <div className="input-wrapper d-flex  justify-content-center">
          <button className="reportBtn my-3 text-uppercase fw-bold " >view</button>
        </div>
      </div>
    </div>
  );
};
const catagoryRef = collection(DB, "Catagory");
export default function CustomerWiseReport() {
  const [showModel, setShowModel] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModel(true)}
        className="OpenBtn m-3 text-uppercase fw-bold"
      >
        report
      </button>
      {showModel && <ShowModel close={() => setShowModel(false)} />}
    </>
  );
}
