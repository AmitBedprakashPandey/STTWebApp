import React, { useEffect, useState } from "react";
import "./master.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { DB } from "../config/db.firebase";
import { ToastContainer, toast } from "react-toastify";
const TransportRef = collection(DB, "transport");
const ShowModel = ({ id, close, change }) => {
  const [oldName, setOldName] = useState();
  const [oldSName, setOldSName] = useState();
  const [newName, setNewName] = useState();
  const [newSName, setNewSName] = useState();
  const getolddata = async () => {
    await getDoc(doc(TransportRef, id)).then((doc)=>{
      setOldName(doc.data().Transport);
      setOldSName(doc.data().ShortNm);
    });
  };

  useEffect(() => {
    getolddata()
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "scroll");
  }, []);

  const update = async () => {
    const datas = doc(TransportRef, id);
    console.log(newName, newSName);
    await updateDoc(datas, { Transport: newName, ShortNm: newSName })
      .then(() => {
        setNewSName("");
        setNewName("");
        getolddata();
        toast.success("Update");
      })
      .catch(() => toast.warning("Refresh Page and Try Agian"));
  };

  return (
    <>
      <div class="modelBg ">
        <div class="card Main-Model">
          <button className="btn-close closebtn" onClick={close} />
          <div class="card-header p-3 d-flex justify-content-center text-uppercase">
            <>Update</>
          </div>
          <div class="card-body">
            <div class="model-conatiner">
              <div class="model-boxs">
                <div class="d-lg-flex mt-lg-2">
                  <div class="input-wrapper mt-2 mt-lg-0  ">
                    <input
                      value={oldName}
                      type="text"
                      id="input"
                      class="form-inp p-3"
                      required
                      disabled
                    />
                    {/* <label for="input" class="form-lab">
                      Old Transport Name
                    </label> */}
                  </div>
                  <div class="input-wrapper mt-3 mt-lg-0">
                    <input
                      type="text"
                      id="input"
                      class="form-inp p-3"
                      required
                      disabled
                      value={oldSName}
                    />
                    {/* <label for="input" class="form-lab">
                      Old Short Name
                    </label> */}
                  </div>
                </div>
                <div class="d-lg-flex mt-lg-3">
                  <div class="input-wrapper mt-3 mt-lg-0">
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      type="text"
                      id="input"
                      class="form-inp p-3"
                      required
                    />
                    <label for="input" class="form-lab">
                      New Transport Name
                    </label>
                  </div>
                  <div class="input-wrapper mt-3 mt-lg-0">
                    <input
                      type="text"
                      id="input"
                      class="form-inp p-3"
                      required
                      value={newSName}
                      onChange={(e) => setNewSName(e.target.value)}
                    />
                    <label for="input" class="form-lab">
                      New Short Name
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-row-reverse p-2 ">
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
export default function Transport() {
  const [TransportList, setTransportList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [TransportName, setTransportName] = useState("");
  const [TransportSName, setTransportSName] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [id, setId] = useState(); 

  const getTransport = async () => {
    try {
      const querySnapshot = await getDocs(TransportRef);
      const datas = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTransportList(datas);
      setFilterData(datas);
    } catch (error) {
      console.log(error);
    }
  };
  const searchTransport = (e) => {
    const data = TransportList.filter((val) =>
      val.Transport.toLowerCase().includes(e.target.value)
    );
    setFilterData(data);
  };
  useEffect(() => {
    getTransport();
  }, []);
  const TransportSave = async () => {
    await addDoc(TransportRef, {
      Transport: TransportName,
      ShortNm: TransportSName,
    })
      .then((doc) => {
        setTransportName("");
        setTransportSName("");
        getTransport();
        toast.success("save");
      })
      .catch(() => toast.warning("Refresh Page and Try Agian"));
  };
  const TransportDelete = (e) => {
    deleteDoc(doc(TransportRef, e)).then(() => {
      getTransport();
      toast.success("Deleted");
    });
  };
  return (
    <div>
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
        <ShowModel
          id={id}
          close={() => setShowModel(false)}
          change={getTransport}
        />
      )}

      <div class="card border-0 p-0 m-0">
        <div class="card-header bg-danger text-white border-0 m-0 p-2 d-flex justify-content-center text-uppercase fs-3 fw-bold rounded-0 ">
          Transport
        </div>
        <div class="justify-content-between col-lg-8 mx-auto d-md-flex d-sm-inline-flex  ">
          <div class="py-2 mt-2  col-lg-4">
            <div class="input-wrapper my-2">
              <input
                type="text"
                id="input"
                class="form-inp"
                required
                value={TransportName}
                onChange={(e) => setTransportName(e.target.value)}
              />
              <label for="input" class="form-lab">
                Full name
              </label>
            </div>
          
          <div class="input-wrapper my-2">
              <input
                type="text"
                id="input"
                class="form-inp"
                required
                value={TransportSName}
                onChange={(e) => setTransportSName(e.target.value)}
              />
              <label for="input" class="form-lab">
                Full name
              </label>
            </div>
            <div className="d-flex justify-content-center">
            <button
              class="btn btn-success w-100 my-2 py-2 px-3 text-white fw-bold text-uppercase rounded-0"
              onClick={TransportSave}
            >
              Add
            </button>
            </div>
            </div>
          <div class="d-flex my-2 py-0">
            <div class="input-wrapper w-100">
              <input
                type="text"
                id="input"
                class="form-inp p-3"
                required
                onChange={searchTransport}
              />
              <label for="input" class="form-lab">
                Search
              </label>
            </div>
          </div>
        </div>

        <div class="tableFixHead">
          <table class="table">
            <thead>
              <tr class="">
                <th scope="col" class="text-capitalize">
                  #
                </th>
                <th scope="col" class="text-capitalize">
                  particular
                </th>
                <th scope="col" class="text-capitalize">
              Short Name
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
                    {item.Transport}
                  </td>
                  <td scope="col" class="col">
                    {item.ShortNm}
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
                        onClick={() => TransportDelete(item.id)}
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
