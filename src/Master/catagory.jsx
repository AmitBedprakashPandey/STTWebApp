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
const CatagoryRef = collection(DB, "Catagory");
const ShowModel = ({ id, close, change }) => {
  const [oldName, setOldName] = useState();
  const [newName, setNewName] = useState();

  const getolddata = async () => {
    const datas = await getDoc(doc(CatagoryRef, id));
    setOldName(datas.data().Catagory);
    console.log(datas.data().Catagory);
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
      const datas = doc(CatagoryRef, id);
      await updateDoc(datas, { Catagory: newName, date: currentDate }).then(
        () => toast.success("UPDATE")
      );
      setNewName("");
      getolddata();
    }
  };

  return (
    <>
      <div class="modelBg">
        <div class=" card Main-Model w-25 ">
          <button className="btn-close closebtn" onClick={close} />
          <div class="card-header d-flex justify-content-center text-uppercase">
            <h5>Update</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="input"
                    class="form-inp"
                    autocomplete="off"
                    value={oldName}
                    disabled
                  />
                  <label for="input" class="form-labNm text-capitalize">
                    old Name
                  </label>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="input-wrapper">
                  <input
                    type="text"
                    id="input"
                    class="form-inp"
                    required
                    autocomplete="off"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <label for="input" class="form-lab text-capitalize ">
                    new Name
                  </label>
                </div>
              </div>
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
    </>
  );
};
const currentDate = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  return currentDate;
};
export default function Catagory() {
  const [CatagoryList, setCatagoryList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [CatagoryName, setCatagoryName] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [id, setId] = useState();

  const getCatagory = async () => {
    try {
      const querySnapshot = await getDocs(CatagoryRef);
      const datas = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCatagoryList(datas);
      setFilterData(datas);
    } catch (error) {
      console.log(error);
    }
  };
  const searchCatagory = (e) => {
    console.log(e.target.value);
    const data = CatagoryList.filter((val) =>
      val.Catagory.toLowerCase().includes(e.target.value)
    );
    setFilterData(data);
  };

  useEffect(() => {
    getCatagory();
    document.body.style.overflowY = "hidden";
  }, []);

  const CatagorySave = async () => {
    if (!CatagoryName) {
      toast.warning("Please enter name");
    } else {
      await addDoc(CatagoryRef, { Catagory: CatagoryName, date: currentDate });
      setCatagoryName("");
      getCatagory();
    }
  };
  const CatagoryDelete = async (id) => {
    try {
      deleteDoc(doc(CatagoryRef, id.target.value)).then(() =>
        toast.success("DELETE")
      );
      getCatagory();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="bg-card py-1">
      {showModel && (
        <ShowModel
          id={id}
          close={() => setShowModel(false)}
          change={getCatagory}
        />
      )}
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
      <div className="card w-50 mx-auto">
        <div className="card-header d-flex justify-content-center text-uppercase fs-3 fw-bold p-1">
          catagory
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12 d-flex">
              <div className="d-flex col-6">
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="input"
                    className="form-inp"
                    required
                    autocomplete="off"
                    value={CatagoryName}
                    onChange={(e) => {
                      setCatagoryName(e.target.value);
                    }}
                  />
                  <label for="input" className="form-lab text-capitalize ">
                    Enter Name
                  </label>
                </div>
                <button
                  className="btn btn-success mt-2 px-4 fw-bold text-white text-uppercase fs-4"
                  onClick={CatagorySave}
                >
                  SAVE
                </button>
              </div>
              <div className="d-flex  flex-row-reverse col-6">
                <div className="bottom-0 end-0">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="input"
                      className="form-inp"
                      required
                      autocomplete="off"
                      onChange={searchCatagory}
                    />
                    <label for="input" className="form-lab text-capitalize ">
                      Search
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
          <div className="tableFixHead">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="th1 text-capitalize">
                    #
                  </th>
                  <th scope="col" className="th2 text-capitalize">
                    particular
                  </th>
                  <th scope="col" className="th3 text-capitalize">
                    date
                  </th>
                  <th scope="col" className="th4 text-capitalize">
                    action
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider custom-tbody">
                {filterData.map((Catagory, index) => (
                  <tr>
                    <th className="th1">{index + 1}</th>
                    <td className="th2 fs-5 ">{Catagory.Catagory}</td>
                    <td className="th3">{Catagory.date}</td>
                    <td className="th4">
                      <div className="d-flex">
                        <button
                          className="btn btn-primary text-white  fw-bold border-0 rounded-5 m-2"
                          value={Catagory.id}
                          onClick={() => {
                            {
                              setId(Catagory.id);
                              setShowModel(true);
                            }
                          }}
                        >
                          UPDATE
                        </button>
                        <button
                          className="btn btn-danger text-white  fw-bold border-0  rounded-5 m-2"
                          value={Catagory.id}
                          onClick={CatagoryDelete}
                        >
                          DELETE
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
    </div>
  );
}
