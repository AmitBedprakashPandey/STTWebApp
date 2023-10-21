import React, { useEffect, useState } from "react";
import "./master.css";
import {collection} from "firebase/firestore";
import { DB } from "../config/db.firebase";
import { ToastContainer, toast } from "react-toastify";
const QualityRef = collection(DB, "quality");
const ShowModel = ({ id, close, change }) => {
  const [oldName, setOldName] = useState();
  const [newName, setNewName] = useState();

  const getolddata = async () => {
    // const datas = await getDoc(doc(QualityRef, id));
    // setOldName(datas.data().QualityNm);
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
      // const datas = doc(QualityRef, id);
      // await updateDoc(datas, { QualityNm: newName, date: currentDate }).then(
      //   (doc) => toast.success("UPDATE")
      // );
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
      // const querySnapshot = await getDocs(QualityRef);
      // const datas = querySnapshot.docs.map((doc) => ({
      //   ...doc.data(),
      //   id: doc.id,
      // }));
      // setQualityList(datas);
      // setFilterData(datas);
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
      // await addDoc(QualityRef, {
      //   QualityNm: qualityName,
      //   date: currentDate,
      // }).then((doc) => toast.success("SAVE"));
      setQualityName("");
      getQuality();
    }
  };

  const QualityDelete = async (id) => {
    try {
      // deleteDoc(doc(QualityRef, id.target.value)).then(() =>
      //   toast.success("DELETE")
      // );
      getQuality();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    // <div className="bg-card py-1">    //
    //   <ToastContainer
    //     position="bottom-right"
    //     autoClose={5000}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //     theme="light"
    //   />
    //   <div className="card w-50 w-75 mx-auto">
    //     <div className="card-header d-flex justify-content-center text-uppercase fs-3 fw-bold p-1">
    //       Qulaity
    //     </div>
    //     <div className="card-body">
    //       <div className="row">
    //         <div className="col-12 d-flex">
    //           <div className="d-flex col-6">
    //             <div className="input-wrapper">
    //               <input
    //                 type="text"
    //                 id="input"
    //                 className="form-inp"
    //                 required
    //                 autocomplete="off"
    //                 value={qualityName}
    //                 onChange={(e) => {
    //                   setQualityName(e.target.value);
    //                 }}
    //               />
    //               <label for="input" className="form-lab text-capitalize ">
    //                 Enter Name
    //               </label>
    //             </div>
    //             <button
    //               className="btn btn-success mt-2 px-4 fw-bold text-white text-uppercase fs-4"
    //               onClick={QualitySave}
    //             >
    //               SAVE
    //             </button>
    //           </div>
    //           <div className="d-flex  flex-row-reverse col-6">
    //             <div className="bottom-0 end-0">
    //               <div className="input-wrapper">
    //                 <input
    //                   type="text"
    //                   id="input"
    //                   className="form-inp"
    //                   required
    //                   autocomplete="off"
    //                   onChange={searchQuality}
    //                 />
    //                 <label for="input" className="form-lab text-capitalize ">
    //                   Search
    //                 </label>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col"></div>
    //       </div>
    //       <div className="tableFixHead">
    //         <table className="table">
    //           <thead>
    //             <tr>
    //               <th scope="col" className="th1 text-capitalize">
    //                 #
    //               </th>
    //               <th scope="col" className="th2 text-capitalize">
    //                 particular
    //               </th>
    //               <th scope="col" className="th3 text-capitalize">
    //                 date
    //               </th>
    //               <th scope="col" className="th4 text-capitalize">
    //                 action
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody className="table-group-divider custom-tbody">
    //             {filterData.map((quality, index) => (
    //               <tr>
    //                 <th className="th1">{index + 1}</th>
    //                 <td className="th2 fs-5 ">{quality.QualityNm}</td>
    //                 <td className="th3">{quality.date}</td>
    //                 <td className="th4">
    //                   <div className="d-flex">
    //                     <button
    //                       className="btn btn-primary text-white  fw-bold border-0 rounded-5 m-2"
    //                       value={quality.id}
    //                       onClick={() => {
    //                         {
    //                           setId(quality.id);
    //                           setShowModel(true);
    //                         }
    //                       }}
    //                     >
    //                       UPDATE
    //                     </button>
    //                     <button
    //                       className="btn btn-danger text-white  fw-bold border-0  rounded-5 m-2"
    //                       value={quality.id}
    //                       onClick={QualityDelete}
    //                     >
    //                       DELETE
    //                     </button>
    //                   </div>
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
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
              <input type="text" id="input" class="form-inp" required />
              <label for="input" class="form-lab">
                Full name
              </label>
            </div>
            <button class="btn btn-success py-2 px-3 text-white fw-bold text-uppercase rounded-0">
              Add
            </button>
          </div>
          <div class="d-flex mt-3 py-0">
            <div class="input-wrapper w-100">
              <input type="text" id="input" class="form-inp p-3" required />
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
              <tr class="col-12">
                <th scope="col" class="col-1">
                  1
                </th>
                <td scope="col" class="col">
                  Mark
                </td>
                <td scope="col" class="col">
                  Otto
                </td>
                <td scope="col" class="col">
                  <div class="d-flex">
                    <button onClick={()=>setShowModel(true)} class="btn btn-primary rounded-5  text-white">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger rounded-5 mx-1 text-white">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
