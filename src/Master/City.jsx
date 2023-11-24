import React, { useEffect, useState } from "react";
import "./master.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BiEdit, BiSave, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  AllCity,
  createCity,
  deleteCity,
  updateCity,
} from "../redux/Feature/CitySlice";

const ShowModel = ({ id, close, change }) => {
  const [oldName, setOldName] = useState();
  const { city, loading } = useSelector((state) => state.City);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      const single = city.filter((doc) => doc.id === id);
      setOldName(single[0]);
    }
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "scroll");
  }, []);
  const onchangeHandler = (e) => {
    setOldName({ ...oldName, [e.target.name]: e.target.value });
    console.log(oldName);
  };
  const update = async () => {
    dispatch(updateCity(oldName));
    dispatch(AllCity());
    setOldName({ ...oldName, city: "" });
    close();
  };

  return (
    <>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-50 flex justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.26)" }}
      >
        <div className="w-80 bg-white rounded-2xl absolute mt-56">
          <div className="text-2xl uppercase flex justify-center py-3">
            <h5>Update</h5>
          </div>
          <div className="card-body p-4">
            <div className="model-boxs">
              <div className="">
                <div className="mt-2  w-full">
                  <input
                    type="text"
                    id="input"
                    name="city"
                    className="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    value={oldName?.city}
                    placeholder="title"
                    onChange={onchangeHandler}
                  />
                </div>
              </div>
              <div className="flex justify-end items-center gap-4 mt-3">
                <button
                  className="bg-blue-500 text-white font-bold rounded-xl px-5 py-3 uppercase"
                  onClick={update}
                >
                  UPDATE
                </button>
                <button
                  className="bg-red-500 text-white font-bold rounded-xl px-5 py-3 uppercase"
                  onClick={() => {
                    close();
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
export default function City({ close }) {
  const [cityData, setCityData] = useState();
  const [showModel, setShowModel] = useState(false);
  const [id, setId] = useState();
  const dispatch = useDispatch();
  
  const { city, loading } = useSelector((state) => state.City);
  
  useEffect(() => {
    dispatch(AllCity());
  }, []);

  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    if (search.length === 0) {
      setFiltered(city);
    } else {
      const filteredData = city.filter((item) =>
        item.city.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(filteredData);
    }
  }, [search, city]);

  const CitySave = async () => {
    dispatch(createCity({ city: cityData }));
    dispatch(AllCity());
  };
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
      {showModel && <ShowModel id={id} close={() => setShowModel(false)} />}
      <div className="w-full md:w-[600px]">
        <div className="flex gap-2 px-5 py-3">
          <Link to={"/"} className="capitalize hover:font-medium">
            home
          </Link>{" "}
          /
          <Link to={"/city"} className="capitalize hover:font-medium">
            City
          </Link>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex gap-2 items-center mx-3">
            <div className="flex flex-col relative w w-full">
              <label htmlFor="input" className="capitalize ">
                Full name
              </label>
              <input
                type="text"
                id="input"
                name="city"
                className="rounded-lg px-3 py-2 border border-black text-lg placeholder:capitalize"
                placeholder="title"
                value={cityData}
                onChange={(e) => {
                  setCityData(e.target.value);
                  setSearch("");
                }}
              />
            </div>
            <button
              onClick={CitySave}
              className="bg-green-500 flex items-center gap-2 text-white px-3 py-2 text-lg mt-6 rounded-xl uppercase font-medium hover:font-bold"
            >
              <BiSave className="text-2xl" />
              Add
            </button>
          </div>
          <div className="flex items-center mt-3 mx-3">
            <div className="w-full">
              <input
                type="text"
                id="input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg px-3 py-2 border border-black text-lg w-full"
                placeholder="search"
                required
              />
            </div>
          </div>
        </div>
        <div className="mx-3 mt-3 bg-white shadow-md ">
          <table className="w-full">
            <thead className="border-b border-gray-500">
              <tr className="flex gap-3 items-center py-2 px-3 bg-slate-300">
                <th scope="col" className="capitalize flex">
                  #
                </th>
                <th scope="col" className="capitalize w-56 flex">
                  particular
                </th>
                <th scope="col" className="capitalize flex">
                  action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {filtered &&
                filtered.map((item, index) => (
                  <tr
                    key={index}
                    className="flex gap-3 py-3 items-center px-3 border-b border-black"
                  >
                    <td scope="col" className="font-bold">
                      {index + 1}
                    </td>
                    <td scope="col" className="w-56 capitalize font-bold">
                      {item.city}
                    </td>
                    <td scope="col" className="">
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setShowModel(true);
                            setId(item.id);
                          }}
                          className="bg-blue-500 text-white p-2 rounded-full text-2xl"
                        >
                          <BiEdit />
                        </button>
                        <button
                          onClick={() => {
                            dispatch(deleteCity(item.id));
                            dispatch(AllCity());
                          }}
                          className="bg-red-500 text-white p-2 rounded-full text-2xl"
                        >
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
