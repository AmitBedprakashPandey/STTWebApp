import React, { useEffect, useState } from "react";
import "./master.css";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { DB } from "../config/db.firebase";
import { ToastContainer, toast } from "react-toastify";
const CityRef = collection(DB, "City");
const ShowModel = ({ id, close, change }) => {
  const [oldName, setOldName] = useState();
  const [newName, setNewName] = useState();

  const getolddata = async () => {
    const datas = await getDoc(doc(CityRef, id));
    setOldName(datas.data().CityNm);
  };

  useEffect(() => {
    getolddata();
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "scroll");
  }, []);

  const update = async () => {
    if (!newName) {
      toast.warning("Please enter name");
    } else {
      const datas = doc(CityRef, id);
      await updateDoc(datas, { CityNm: newName }).then((doc) =>
        toast.success("UPDATE")
      );
    }
    setNewName("");
    getolddata();
  };

  return (
    <>
      <div class="modelBg">
        <div class="card Main-Model">
          <button className="btn-close closebtn" onClick={close} />
          <div class="card-header d-flex justify-content-center text-uppercase">
            <h5>Update</h5>
          </div>
          <div class="card-body">
            <div class="model-conatiner">
              <div class="model-boxs">
                <div class="d-lg-flex mt-lg-2">
                  <div class="input-wrapper mt-2 mt-lg-0  ">
                    <input
                      type="text"
                      id="input"
                      class="form-inp p-3"
                      value={oldName}
                      required
                      disabled
                    />
                  </div>
                </div>
                <div class="d-lg-flex mt-lg-3">
                  <div class="input-wrapper mt-3 mt-lg-0">
                    <input
                      type="text"
                      id="input"
                      class="form-inp p-3"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <label for="input" class="form-lab">
                      New Short Name
                    </label>
                  </div>
                </div>
                <div class="d-flex flex-row-reverse p-2">
                  <button
                    class="btn btn-primary text-white fw-bold   rounded-2 px-5 py-2 m-2 text-uppercase"
                    onClick={() => {
                      update();
                      change();
                    }}
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const currentDate = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  currentDate = `${day}-${month}-${year}`;
  return currentDate;
};
export default function City() {
  const [CityList, setCityList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [CityName, setCityName] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [id, setId] = useState();

  const getCity = async () => {
    try {
      const querySnapshot = await getDocs(CityRef);
      const datas = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCityList(datas);
      setFilterData(datas);
      console.log(datas);
    } catch (error) {
      console.log(error);
    }
  };
  const searchCity = (e) => {
    const data = CityList.filter((val) =>
      val.CityNm.toLowerCase().includes(e.target.value)
    );
    setFilterData(data);
  };

  useEffect(() => {
    getCity();
    document.body.style.overflowY = "hidden";
  }, []);

  const CitySave = async () => {
    if (!CityName) {
      toast.warning("Please enter name");
    } else {
      await addDoc(CityRef, { CityNm: CityName }).then((doc) => {
        if (doc.id) {
          toast.success("SAVE");
        } else {
          toast.warning("Data Not Store !!!");
        }
      });
    }
    setCityName("");
    getCity();
  };
  const CityDelete = (i) => {   
if(!i){
  return toast.warning('Refresh And Try agian')
}
      deleteDoc(doc(CityRef, i)).then((doc) => toast.success("DELETE"));
      getCity();
  };
  return (
    <div className="bg-card py-1">
          <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"      
      />
      {showModel && (
        <ShowModel id={id} close={() => setShowModel(false)} change={getCity} />
      )}
      <div class="card border-0 p-0 m-0">
        <div class="card-header bg-danger text-white border-0 m-0 p-2 d-flex justify-content-center text-uppercase fs-3 fw-bold rounded-0 ">
          City
        </div>
        <div class="justify-content-between col-lg-8 mx-auto d-md-flex d-sm-inline-flex  ">
          <div class="d-flex py-2 mt-2  col-lg-4">
            <div class="input-wrapper">
              <input
                type="text"
                id="input"
                class="form-inp"
                required
                value={CityName}
                onChange={(e) => setCityName(e.target.value)}
              />
              <label for="input" class="form-lab">
                Full name
              </label>
            </div>
            <button
              onClick={CitySave}
              class="btn btn-success py-2 px-3 text-white fw-bold text-uppercase rounded-0"
            >
              Add
            </button>
          </div>
          <div class="d-flex mt-3 py-0">
            <div class="input-wrapper w-100">
              <input
                type="text"
                id="input"
                class="form-inp p-3"
                required
                onChange={searchCity}
              />
              <label for="input" class="form-lab">
                Search
              </label>
            </div>
          </div>
        </div>
        <div class="tableFixHead">
          <table class="table p-0 m-0">
            <thead>
              <tr class="">
                <th scope="col" class="text-capitalize">
                  #
                </th>
                <th scope="col" class="text-capitalize">
                  particular
                </th>
                <th scope="col" class="text-capitalize">
                  date
                </th>
                <th scope="col" class="text-capitalize">
                  action
                </th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {filterData.map((item, index) => (
                <tr class="col-12">
                  <th scope="col" class="col-1">
                    {index + 1}
                  </th>
                  <td scope="col" class="col">
                    {item.CityNm}
                  </td>
                  <td scope="col" class="col">
                    Otto
                  </td>
                  <td scope="col" class="col">
                    <div class="d-flex">
                      <button
                        onClick={() => {
                          setShowModel(true);
                          setId(item.id);
                        }}
                        class="btn btn-primary rounded-5  text-white"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button              
                        class="btn btn-danger rounded-5 mx-1 text-white"
                        onClick={()=>CityDelete(item.id)}
                      >
                        <i class="bi bi-trash"></i>
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
  );
}
