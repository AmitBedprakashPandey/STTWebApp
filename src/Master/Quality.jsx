import React, { useEffect, useState } from "react";
import "./master.css";
import {addDoc, collection,getDoc ,doc ,updateDoc,getDocs, deleteDoc} from "firebase/firestore";
import { DB } from "../config/db.firebase";
import { ToastContainer, toast } from "react-toastify";
const QualityRef = collection(DB, "quality");
const ShowModel = ({ id, close, change }) => {
  const [oldName, setOldName] = useState();
  const [newName, setNewName] = useState();

  const getolddata = async () => {
    const datas = await getDoc(doc(QualityRef, id));
    setOldName(datas.data().QualityNm);
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
      const datas = doc(QualityRef, id);
      await updateDoc(datas, { QualityNm: newName }).then(
        (doc) => toast.success("UPDATE")
      );
      setNewName("");
      getolddata();
    }
  };

  return (
    <>
      <div class="modelBg">
        <div class="card Main-Model">
          <button className="btn-close closebtn" onClick={close} />
          <div class="card-header d-flex  justify-content-center text-uppercase ">
            <h5>Update</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <div class="input-wrapper mt-2">
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
                <div class="input-wrapper mt-3">
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
          <hr />
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
const currentDate = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  currentDate = `${day}-${month}-${year}`;
  return currentDate;
};
export default function Quality() {
  const [qualityList, setQualityList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [qualityName, setQualityName] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [id, setId] = useState();

  const getQuality = async () => {
    try {
      const querySnapshot = await getDocs(QualityRef);
      const datas = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQualityList(datas);
      setFilterData(datas);
    } catch (error) {
      console.log(error);
    }
  };
  const searchQuality = (e) => {
    console.log(e.target.value);
    const data = qualityList.filter((val) =>
      val.QualityNm.toLowerCase().includes(e.target.value)
    );
    setFilterData(data);
  };

  useEffect(() => {
    getQuality();
    document.body.style.overflowY = "hidden";
  }, []);

  const QualitySave = async () => {
    if (!qualityName) {
      toast.warning("Please enter name");
    } else {
      await addDoc(QualityRef, {
        QualityNm: qualityName,
        date: currentDate,
      }).then((doc) => toast.success("SAVE"));
      setQualityName("");
      getQuality();
    }
  };

  const QualityDelete =(id) => {
  if(!id){
    return toast.warning()
  }
    deleteDoc(doc(QualityRef, id)).then(() =>
        toast.success("DELETE")
      );
      getQuality();
      window.location.reload(false)
  
  };
  return (
  <>
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
          change={getQuality}
        />
      )}

      <div class="card border-0 p-0 m-0">
        <div class="card-header bg-danger text-white border-0 m-0 p-2 d-flex justify-content-center text-uppercase fs-3 fw-bold rounded-0 ">
          Qulaity
        </div>
        <div class="justify-content-between col-lg-8 mx-auto d-md-flex d-sm-inline-flex  ">
          <div class="d-flex py-2 mt-2  col-lg-4">
            <div class="input-wrapper">
              <input type="text" id="input" class="form-inp" required value={qualityName} onChange={(e)=>qualityName(e.target.value)}/>
              <label for="input" class="form-lab">
                Full name
              </label>
            </div>
            <button class="btn btn-success py-2 px-3 text-white fw-bold text-uppercase rounded-0" onClick={QualitySave}>
              Add
            </button>
          </div>
          <div class="d-flex mt-3 py-0">
            <div class="input-wrapper w-100">
              <input type="text" id="input" class="form-inp p-3" required onChange={searchQuality}/>
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
                  date
                </th>
                <th scope="col" class="text-capitalize">
                  action
                </th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {filterData.map((item,index)=>(
              <tr class="col-12">
                <th scope="col" class="col-1">
                  {index+1}
                </th>
                <td scope="col" class="col">
                  {item.QualityNm}
                </td>
                <td scope="col" class="col">
                  {item.QualityDt}
                </td>
                <td scope="col" class="col">
                  <div class="d-flex">
                    <button onClick={()=>{setShowModel(true);setId(item.id)}} class="btn btn-primary rounded-5  text-white">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger rounded-5 mx-1 text-white" onClick={()=>QualityDelete(item.id)}>
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
    </>
  );
}
