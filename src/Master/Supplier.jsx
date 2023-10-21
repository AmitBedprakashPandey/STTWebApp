import { useEffect, useState } from "react";
import "./master.css";
import Select from "react-select";
import { DB } from "../config/db.firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
const supplierRef = collection(DB, "supplier");
const ShowModel = ({ id, close, change, btn }) => {
  const SulatationData = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedCatagory, setSelectedCatagory] = useState();
  const [supplier, setSupplier] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [address3, setAddress3] = useState();
  const [pincode, setPincode] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedState, setSelectedState] = useState();
  const [officeNo1, setofficeNo1] = useState();
  const [officeNo2, setofficeNo2] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [email, setEmail] = useState();

  const clearInput = () => {
    setSupplier("");
    setSelectedCatagory("");
    setAddress1("");
    setAddress2("");
    setAddress3("");
    setPincode("");
    setSelectedCity("");
    setSelectedState("");
    setofficeNo1("");
    setofficeNo2("");
    setMobileNo("");
    setEmail("");
  };
  const getOldData = async () => {
    const datas = await getDoc(doc(supplierRef, id));
    setSupplier(datas.data().Supplier);
    setSelectedCatagory(datas.data().Catagory);
    setAddress1(datas.data().Address1);
    setAddress2(datas.data().Address2);
    setAddress3(datas.data().Address3);
    setPincode(datas.data().Pincode);
    setSelectedCity(datas.data().City);
    setSelectedState(datas.data().State);
    setofficeNo1(datas.data().OfficeNo1);
    setofficeNo2(datas.data().OfficeNo2);
    setMobileNo(datas.data().MobileNo);
    setEmail(datas.data().Email);
  };
  useEffect(() => {
    if (btn === "update") {
      getOldData();
    }
  }, []);
  const save = () => {
    const data = {
      Supplier: supplier,
      Catagory: selectedCatagory,
      Address1: address1,
      Address2: address2,
      Address3: address3,
      Pincode: pincode,
      City: selectedCity,
      State: selectedState,
      OfficeNo1: officeNo1,
      OfficeNo2: officeNo2,
      MobileNo: mobileNo,
      Email: email,
    };
    try {
      addDoc(supplierRef, data).then(() => {
        alert("save");
        clearInput();
      });
    } catch (error) {
      console.error(error);
    }
  };
  const update = () => {
    const data = {
      Supplier: supplier,
      Catagory: selectedCatagory,
      Address1: address1,
      Address2: address2,
      Address3: address3,
      Pincode: pincode,
      City: selectedCity,
      State: selectedState,
      OfficeNo1: officeNo1,
      OfficeNo2: officeNo2,
      MobileNo: mobileNo,
      Email: email,
    };
    const getdata = doc(supplierRef, id);
    updateDoc(getdata, data).then(() => {
         getOldData();
    });
  };
  return (
    <>
      <div class="modelBg ">
        <div class=" card Main-Model">
        <button className="btn-close closebtn" onClick={close} />
          <div class="card-header p-2 d-flex justify-content-center text-uppercase fs-3 fw-bold ">
            Supplier
          </div>
          <div class="card-body">
            <div class="d-lg-flex ">
              <div class="col">
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="input"
                    class="form-inp"
                    value={supplier}
                    required
                    onChange={(e) => setSupplier(e.target.value)}
                  />
                  <label for="input" class="form-lab text-capitalize ">
                    Enter Name
                  </label>
                </div>
              </div>
              <div class="col">
                <div class="input-wrapper mt-3">
                  <Select
                    className="customSelect"
                    options={SulatationData}
                    placeholder={selectedCatagory}
                    isSearchable
                    onChange={(text) => setSelectedCatagory(text.value)}
                  />
                  <label for="input" class="form-labNm text-capitalize ">
                    Select Catagory
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div class="d-lg-flex">
              <div class="col">
                <div class="input-wrapper mt-3">
                  <input
                    type="text"
                    id="input"
                    class="form-inp"
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                  <label for="input" class="form-lab text-capitalize ">
                    Address 1
                  </label>
                </div>
              </div>
              <div class="col">
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="input"
                    class="form-inp"
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                  <label for="input" class="form-lab text-capitalize ">
                    Address 2
                  </label>
                </div>
              </div>
            </div>
            <div class="d-lg-flex">
              <div class="col">
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="input"
                    class="form-inp"
                    required
                    value={address3}
                    onChange={(e) => setAddress3(e.target.value)}
                  />
                  <label for="input" class="form-lab text-capitalize ">
                    Address 3
                  </label>
                </div>
              </div>
              <div class="col">
                <div class="input-wrapper">
                  <input
                    type="text"
                    max="5"
                    id="input"
                    class="form-inp"
                    required
                    onChange={(e) => setPincode(e.target.value)}
                    value={pincode}
                  />
                  <label for="input" class="form-lab text-capitalize ">
                    Pincode
                  </label>
                </div>
              </div>
            </div>
            <div class="d-lg-flex">
              <div class="col">
                <div class="input-wrapper">
                  <Select
                    className="customSelect"
                    options={SulatationData}
                    placeholder={selectedCity}
                    isSearchable
                    onChange={(text) => setSelectedCity(text.value)}
                  />
                  <label for="input" class="form-labNm text-capitalize ">
                    City
                  </label>
                </div>
              </div>
              <div class="col">
                <div class="input-wrapper">
                  <Select
                    className="customSelect"
                    options={SulatationData}
                    isSearchable
                    placeholder={selectedState}
                    onChange={(text) => setSelectedState(text.value)}
                  />
                  <label for="input" class="form-labNm text-capitalize ">
                    State
                  </label>
                </div>
              </div>
            </div>
            <div class="d-lg-flex">
              <div class="col">
                <div class="input-wrapper">
                  <input
                    type="tel"
                    id="input"
                    class="form-inp"
                    required
                    value={officeNo1}
                    onChange={(e) => setofficeNo1(e.target.value)}
                  />
                  <label for="input" class="form-lab text-capitalize ">
                    office Number 1
                  </label>
                </div>
              </div>
              <div class="col">
                <div class="input-wrapper">
                  <input
                    type="tel"
                    id="input"
                    class="form-inp"
                    required
                    value={officeNo2}
                    onChange={(e) => setofficeNo2(e.target.value)}
                  />
                  <label for="input" class="form-lab text-capitalize ">
                    office Number 2
                  </label>
                </div>
              </div>
            </div>
            <div class="d-lg-flex">
              <div class="col">
                <div class="input-wrapper">
                  <input
                    type="tel"
                    id="input"
                    class="form-inp"
                    required
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                  />
                  <label for="input" class="form-lab text-capitalize ">
                    mobile number
                  </label>
                </div>
              </div>

              <div class="col">
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="input"
                    class="form-inp"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label for="input" class="form-lab">
                    email
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div class="d-flex  flex-row-reverse">
              <div class="bottom-0 end-0">
                {btn == "save" ? (
                  <button
                    class="btn btn-success text-white fw-bold   rounded-2 px-5 py-2 m-2 text-uppercase"
                    onClick={() => {
                      save();
                      clearInput();
                      change();
                    }}
                  >
                    save
                  </button>
                ) : (
                  <button
                    class="btn btn-primary text-white fw-bold   rounded-2 px-5 py-2 m-2 text-uppercase"
                    onClick={() => {
                      update();
                      change();
                    }}
                  >
                    update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default function Supplier() {
  const [showModel, setShowModel] = useState(false);
  const [supplierList, setSupplierList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [typeBtn, setTypeBtn] = useState();
  const [id, setId] = useState();  
  const getSupplier = async () => {
    const data = await getDocs(supplierRef);
    const recod = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setSupplierList(recod);
    setFilterData(recod);
  };
  const search = (e) => {
    const data = supplierList.filter((val) =>
      val.Supplier.toLowerCase().includes(e.target.value)
    );
    setFilterData(data);
  };
  useEffect(() => {
    getSupplier();
  }, []);
  const deleteData = (e) => {
    deleteDoc(doc(supplierRef, e.target.value)).then(() => {
      alert("Delete");
      getSupplier();
    });
  };
  return (
    <>
      {showModel && (
        <ShowModel
          id={id}
          close={() => setShowModel(false)}
          change={getSupplier}
          btn={typeBtn}
        />
      )}
      <div className="row">
        <div className="col my-3">
          <button
            className="btn btn-danger text-white fw-bold  rounded-4 m-2 update text-capitalize border-0 "
            onClick={() => {
              {
                setShowModel(true);
                setTypeBtn("save");
              }
            }}
          >
            add costomer
          </button>
        </div>
        <div className="col-3">
          <div class="input-wrapper">
            <input
              type="text"
              id="input"
              class="form-inp"
              autocomplete="off"
              placeholder="Search"
              onChange={search}
            />
          </div>
        </div>
      </div>
      <div className="tableFixHead p-2">
        <table className="table">
          <thead className="custom-thead">
            <tr className="">
              <th scope="col" className="p-1 col">
                #
              </th>
              <th scope="col" className="p-1 col th4 text-capitalize">
                Supplier
              </th>
              <th scope="col" className="p-1 th4 text-capitalize">
                Catagory
              </th>
              <th scope="col" className="p-1 th4 text-capitalize">
                address1
              </th>
              <th scope="col" className="p-1 th4  text-capitalize">
                address2
              </th>
              <th scope="col" className="p-1 th4 text-capitalize">
                address3
              </th>
              <th scope="col" className="p-1 th4 text-capitalize">
                pincode
              </th>
              <th scope="col" className="p-1 th4 text-capitalize">
                city
              </th>
              <th scope="col" className="p-1 th4 text-capitalize">
                State
              </th>
              <th scope="col" className="p-1 th4 text-capitalize">
                officeNo1
              </th>
              <th scope="col" className="p-1 th4 text-capitalize">
                officeNo1
              </th>
              <th scope="col" className="p-1 th4 text-capitalize">
                MobileNo
              </th>
              <th scope="col" className="p-1 th4 text-capitalize">
                email
              </th>
              <th scope="col" className="p-1 th4 text-capitalize">
                action
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider custom-tbody">
            {filterData.map((doc, index) => (
              <tr key={index} className="d-flex">
                <td scope="col" className="p-1 py-3 ">
                  {index + 1}
                </td>
                <td scope="col" className="p-1 py-3 th4">
                  {doc.Supplier}
                </td>
                <td scope="col" className="p-1 py-3 th4">
                  {doc.Catagory}
                </td>
                <td scope="col" className="p-1 py-3 th4">
                  {doc.Address1}
                </td>
                <td scope="col" className="p-1 py-3 th4">
                  {doc.Address2}
                </td>
                <td scope="col" className="p-1 py-3 th4">
                  {doc.Address3}
                </td>
                <td scope="col" className="p-1 py-3 th4">
                  {doc.Pincode}
                </td>
                <td scope="col" className="p-1 py-3 th4">
                  {doc.City}
                </td>
                <td scope="col" className="p-1 py-3 th4">
                  {doc.State}
                </td>
                <td scope="col" className="p-1 py-3 th4">
                  {doc.OfficeNo1}
                </td>
                <td scope="col" className="p-1 py-3 th4">
                  {doc.OfficeNo2}
                </td>
                <td scope="col" className="p-1 py-3 th4">
                  {doc.MobileNo}
                </td>
                <td scope="col" className="p-1 py-3 th4">
                  {doc.Email}
                </td>
                <td scope="col" className=" p-1 th4">
                  <div className="d-flex">
                    <button
                      className="btn btn-primary text-white fw-bold  rounded-5 m-1 update"
                      onClick={() => {
                        setShowModel(true);
                        setTypeBtn("update");
                        setId(doc.id);
                      }}
                    >
                      U
                    </button>
                    <button
                      className="btn btn-danger text-white fw-bold  rounded-5 m-1 delete"
                      value={doc.id}
                      onClick={deleteData}
                    >
                      D
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
