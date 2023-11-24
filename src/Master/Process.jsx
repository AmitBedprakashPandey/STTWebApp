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
import { Link } from "react-router-dom";
import { BiEdit, BiTrash, BiX } from "react-icons/bi";
const cityRef = collection(DB, "City");
const proccessRef = collection(DB, "Process");
const stateRef = collection(DB, "State");
const catagoryRef = collection(DB, "Catagory");
const ShowModel = ({ id, close, change, btn }) => {
  const [selectedCatagory, setSelectedCatagory] = useState();
  const [proccess, setProccess] = useState();
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
  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [catagoryList, setCatagoryList] = useState([]);

  const clearInput = () => {
    setProccess("");
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
  const [selectCity, setSelectCity] = useState();
  const citySelectChange = (selectedOption) => {
    setSelectCity(selectedOption);
    setSelectedCity(selectedOption.CityNm);
  };
  const getCity = async () => {
    const datas = await getDocs(cityRef);
    const sortData = datas.docs.map((doc) => ({
      ...doc.data(),
    }));
    setCityList(sortData);
  };
  const [selectState, setSelectState] = useState();
  const stateSelectChange = (selectedOption) => {
    setSelectState(selectedOption);
    setSelectedState(selectedOption.state);
  };
  const getState = async () => {
    const datas = await getDocs(stateRef);
    const sortData = datas.docs.map((doc) => ({
      ...doc.data(),
    }));
    setStateList(sortData);
  };
  const getOldData = async () => {
    const datas = await getDoc(doc(proccessRef, id));
    setProccess(datas.data().Proccess);
    setSelectedCatagory(datas.data().Catagory);
    setSelectCtg({
      Catagory: datas.data().Catagory,
      Catagory: datas.data().Catagory,
    });
    setAddress1(datas.data().Address1);
    setAddress2(datas.data().Address2);
    setAddress3(datas.data().Address3);
    setPincode(datas.data().Pincode);
    setSelectedCity(datas.data().City);
    setSelectCity({ CityNm: datas.data().City, CityNm: datas.data().City });
    setSelectedState(datas.data().State);
    setSelectState({ state: datas.data().State });
    setofficeNo1(datas.data().OfficeNo1);
    setofficeNo2(datas.data().OfficeNo2);
    setMobileNo(datas.data().MobileNo);
    setEmail(datas.data().Email);
  };
  useEffect(() => {
    if (btn === "update") {
      getOldData();
      getCatagory();
      getCity();
      getState();
    }
  }, []);
  const save = () => {
    const data = {
      Proccess: proccess,
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
      addDoc(proccessRef, data).then(() => {
        alert("save");
        clearInput();
      });
    } catch (error) {
      console.error(error);
    }
  };
  const update = () => {
    const data = {
      Proccess: proccess,
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
    const getdata = doc(proccessRef, id);
    updateDoc(getdata, data).then(() => {
      getOldData();
    });
  };
  return (
    <>
      <div class="absolute top-0 bottom-0 right-0 left-0 z-50 p-5 flex justify-center"  style={{ backgroundColor: "rgba(0, 0, 0, 0.26)" }} >
        <div class="w-[700px] h-[800px] mt-10 relative bg-white rounded-2xl p-5">          
          <div class="text-2xl py-3">
            Proccess
          </div>
          <div class="">
            <div class="">
              <div class="col">
                <div class="">
                  <label for="input" class="capitalize ">
                    Enter Name
                  </label>
                  <input
                    type="text"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    value={proccess}                    
                    onChange={(e) => setProccess(e.target.value)}
                  />
                </div>
              </div>
              <div class="col">
                <div class="">
                  <label for="input" class="capitalize ">
                    Select Catagory
                  </label>
                  <Select
                    className="custom-select"
                    value={selectCtg}
                    onChange={catagorySelectChange}
                    getOptionValue={(option) => option.Catagory}
                    getOptionLabel={(option) => option.Catagory}
                    options={catagoryList}
                    isSearchable
                  />
                </div>
              </div>
            </div>            
            <div class="">
              <div class="w-full">
                <div class="flex flex-col">
                  <label for="input" class="capitalize ">
                    Address 1
                  </label>
                  <input
                    type="text"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg placeholder:capitalize"
                    placeholder="Address1"
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="flex flex-col">
                  <label for="input" class="capitalize ">
                    Address 2
                  </label>
                  <input
                    type="text"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    placeholder="address2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div class="">
              <div class="w-full">
                <div class="flex flex-col">
                  <label for="input" class="capitalize ">
                    Address 3
                  </label>
                  <input
                    type="text"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    placeholder="address3"
                    value={address3}
                    onChange={(e) => setAddress3(e.target.value)}
                  />
                </div>
              </div>
              <div class="col">
                <div class="">
                  <label for="input" class="capitalize ">
                    Pincode
                  </label>
                  <input
                    type="text"
                    max="5"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    placeholder="pincode"
                    onChange={(e) => setPincode(e.target.value)}
                    value={pincode}
                  />
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div class="w-full">
                <div class="">
                  <label for="input" class="capitalize ">
                    City
                  </label>
                  <Select
                    value={selectCity}
                    onChange={citySelectChange}
                    getOptionValue={(option) => option.CityNm}
                    getOptionLabel={(option) => option.CityNm}
                    options={cityList}
                    isSearchable
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="">
                  <label for="input" class="capitalize ">
                    State
                  </label>
                  <Select
                    value={selectState}
                    onChange={stateSelectChange}
                    getOptionValue={(option) => option.state}
                    getOptionLabel={(option) => option.state}
                    options={stateList}
                    isSearchable
                  />
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div class="w-full">
                <div class="">
                  <label for="input" class="capitalize ">
                    office Number 1
                  </label>
                  <input
                    type="tel"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    value={officeNo1}
                    onChange={(e) => setofficeNo1(e.target.value)}
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="input-wrapper">
                  <label for="input" class="capitalize ">
                    office Number 2
                  </label>
                  <input
                    type="tel"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    value={officeNo2}
                    onChange={(e) => setofficeNo2(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div class="w-full">
                <div class="flex flex-col">
                  <label for="input" class="capitalize ">
                    mobile number
                  </label>
                  <input
                    type="tel"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="flex flex-col">
                  <label for="input" class="capitalize">
                    email
                  </label>
                  <input
                    type="text"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>  
            <div class="flex justify-end pt-5 gap-3">
              <div class="">
                {btn == "save" ? (
                  <button
                  class="bg-green-500 text-white font-bold rounded-xl px-5 py-3 uppercase"
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
                  class="bg-blue-500 text-white font-bold rounded-xl px-5 py-3 uppercase"
                    onClick={() => {
                      update();
                      change();
                    }}
                  >
                    update
                  </button>
                )}
              </div>
              <div class="">
                <button onClick={close} class="bg-red-500 text-white font-bold rounded-xl px-5 py-3 uppercase">
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default function Proccess() {
  const [showModel, setShowModel] = useState(false);
  const [ProccessList, setProccessList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [typeBtn, setTypeBtn] = useState();
  const [id, setId] = useState();
  const getProccess = async () => {
    const data = await getDocs(proccessRef);
    const recod = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(recod);
    setProccessList(recod);
    setFilterData(recod);
  };
  const search = (e) => {
    const data = ProccessList.filter((val) =>
      val.Proccess.toLowerCase().includes(e.target.value)
    );
    setFilterData(data);
  };
  useEffect(() => {
    getProccess();
  }, []);
  const deleteData = (e) => {
    deleteDoc(doc(proccessRef, e.target.value)).then(() => {
      alert("Delete");
      getProccess();
    });
  };
  return (
    <>
      {showModel && (
        <ShowModel
          id={id}
          close={() => setShowModel(false)}
          change={getProccess}
          btn={typeBtn}
        />
      )}
      <div className="flex justify-center bg-white"> 
      <div>          
      <div class="flex gap-2 px-4 py-3 w-full">
          <Link to={"/"} className="capitalize hover:font-medium">
            home
          </Link>
          /
          <Link to={"/process"} className="capitalize hover:font-medium">
            quality
          </Link>
        </div>
        <div className="px-4 py-3 flex justify-between">
          <button
            className="p-3 bg-blue-500 text-white uppercase rounded-2xl"
            onClick={() => {
              {
                setShowModel(true);
                setTypeBtn("save");
              }
            }}
          >
            add costomer
          </button>
          <div className="">
            <input
              type="text"
              id="input"
              class="w-full px-3 py-3 border rounded-2xl md:w-80"
              autocomplete="off"
              placeholder="Search"
              onChange={search}
            />
          </div>
        </div> 
      <div className="flex justify-center p-3">
        <table className="">
          <thead className="">
            <tr className="flex items-center gap-3 bg-gray-300 px-3 py-2">
              <th scope="col" className="">
                #
              </th>
              <th scope="col" className="w-28 flex">
                Proccess
              </th>
              <th scope="col" className="w-28 flex capitalize">
                Catagory
              </th>
              <th scope="col" className="w-64 flex capitalize">
                address
              </th>            
              <th scope="col" className="w-20 flex capitalize">
                pincode
              </th>
              <th scope="col" className="w-28 flex capitalize">
                city
              </th>
              <th scope="col" className="w-36 flex capitalize">
                State
              </th>
              <th scope="col" className="w-36 flex capitalize">
                officeNo1
              </th>
              <th scope="col" className="w-36 flex capitalize">
                officeNo1
              </th>
              <th scope="col" className="w-36 flex capitalize">
                MobileNo
              </th>
              <th scope="col" className="w-36 flex capitalize">
                email
              </th>
              <th scope="col" className="w-36 flex capitalize">
                action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {filterData.map((doc, index) => (
              <tr key={index} className="flex items-center gap-3 py-2 px-3 bg-gray-200 border-b border-gray-400">
                <td scope="col" className="">
                  {index + 1}
                </td>
                <td scope="col" className="w-28 text-ellipsis overflow-hidden truncate">
                  {doc.Proccess}
                </td>
                <td scope="col" className="w-28 text-ellipsis overflow-hidden truncate">
                  {doc.Catagory}
                </td>
                <td scope="col" className="w-64 text-ellipsis overflow-hidden truncate">
                  {doc.Address1}{doc.Address2}{doc.Address3}
                </td>
                <td scope="col" className="w-20">
                  {doc.Pincode}
                </td>
                <td scope="col" className="w-28 text-ellipsis overflow-hidden truncate">
                  {doc.City}
                </td>
                <td scope="col" className="w-36 text-ellipsis overflow-hidden truncate">
                  {doc.State}
                </td>
                <td scope="col" className="w-36 text-ellipsis overflow-hidden truncate">
                  {doc.OfficeNo1}
                </td>
                <td scope="col" className="w-36 text-ellipsis overflow-hidden truncate">
                  {doc.OfficeNo2}
                </td>
                <td scope="col" className="w-36 text-ellipsis overflow-hidden truncate">
                  {doc.MobileNo}
                </td>
                <td scope="col" className="w-36 text-ellipsis overflow-hidden truncate">
                  {doc.Email}
                </td>
                <td scope="col" className=" p-1">
                  <div className="flex gap-5">
                    <button
                    class="bg-blue-500 text-white p-2 rounded-full text-2xl"
                      onClick={() => {
                        setShowModel(true);
                        setTypeBtn("update");
                        setId(doc.id);
                      }}
                    >
                      <BiEdit/>
                    </button>
                    <button
                  class="bg-red-500 text-white p-2 rounded-full text-2xl"
                      value={doc.id}
                      onClick={deleteData}
                    >
                 <BiTrash/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>
    </>
  );
}
