import React, { useEffect, useState } from "react";
import "./master.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BiEdit, BiPencil, BiSave, BiTrash, BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const ShowModel = ({ close }) => {
  const [oldName, setOldName] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "scroll");
  }, []);

  const update = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        class="absolute top-0 bottom-0 left-0 right-0 z-50 flex justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.26)" }}
      >
        <div class="w-80 bg-white rounded-2xl absolute mt-56">
          <div class="text-2xl uppercase flex justify-center py-3">
            <h5>Update</h5>
          </div>
          <div class="card-body p-4">
            <div class="model-boxs">
              <div class="">
                <div class="mt-2  w-full">
                  <input
                    type="text"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    value={oldName}
                    placeholder="title"
                    onChange={(e) => setOldName(e.target.value)}
                  />
                </div>
              </div>
              <div class="flex justify-end items-center gap-4 mt-3">
                <button
                  class="bg-blue-500 text-white font-bold rounded-xl px-5 py-3 uppercase"
                  onClick={update}
                >
                  UPDATE
                </button>
                <button
                  class="bg-red-500 text-white font-bold rounded-xl px-5 py-3 uppercase"
                  onClick={() => {
                    setOldName("");
                  }}
                >
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
export default function Quality({ close }) {
  const [CityList, setCityList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [name, setName] = useState("");
  const [showModel, setShowModel] = useState(false);
  const dispatch = useDispatch();
  const { quality, loading } = useSelector((state) => state.Quality);
  console.log(quality);
  useEffect(() => {}, []);

  const save = async () => {};
  return (
    <div className="py-1 flex md:justify-center w-full">
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
      {showModel && <ShowModel close={() => setShowModel(false)} />}
      <div class="w-full md:w-[600px]">
        <div class="flex gap-2 px-5 py-3">
          <Link to={"/"} className="capitalize hover:font-medium">
            home
          </Link>
          /
          <Link to={"/quality"} className="capitalize hover:font-medium">
            quality
          </Link>
        </div>
        <div class="flex flex-col justify-between">
          <div class="flex gap-2 items-center mx-3">
            <div class="flex flex-col relative w w-full">
              <label for="input" class="capitalize ">
                title
              </label>
              <input
                type="text"
                id="input"
                class="rounded-lg px-3 py-2 border border-black text-lg placeholder:capitalize"
                placeholder="title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button
              onClick={save}
              class="bg-green-500 flex items-center gap-2 text-white px-3 py-2 text-lg mt-6 rounded-xl uppercase font-medium hover:font-bold"
            >
              <BiSave className="text-2xl" />
              Add
            </button>
          </div>
          <div class="flex items-center mt-3 mx-3">
            <div class="w-full">
              <input
                type="text"
                id="input"
                class="rounded-lg px-3 py-2 border border-black text-lg w-full"
                placeholder="search"
                required
              />
            </div>
          </div>
        </div>
        <div class="mx-3 mt-3 bg-white shadow-md ">
          <table class="w-full">
            <thead className="border-b border-gray-500">
              <tr class="flex gap-3 items-center py-2 px-3 bg-slate-300">
                <th scope="col" class="capitalize flex">
                  #
                </th>
                <th scope="col" class="capitalize w-56 flex">
                  particular
                </th>
                <th scope="col" class="capitalize flex">
                  action
                </th>
              </tr>
            </thead>
            <tbody class="">
              {quality &&
                quality.map((item, index) => (
                  <tr class="flex gap-3 py-3 items-center px-3 border-b border-black">
                    <td scope="col" class="font-bold">
                      {index + 1}
                    </td>
                    <td scope="col" class="w-56 capitalize font-bold">
                      {item.QualityNm}
                    </td>
                    <td scope="col" class="">
                      <div class="flex gap-3">
                        <button
                          onClick={() => {
                            setShowModel(true);
                          }}
                          class="bg-blue-500 text-white p-2 rounded-full text-2xl"
                        >
                          <BiEdit />
                        </button>
                        <button class="bg-red-500 text-white p-2 rounded-full text-2xl">
                          <BiTrash />
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
