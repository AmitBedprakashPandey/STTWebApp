import { useEffect, useState } from "react";
import "./master.css";
import Select from "react-select";

import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { All, Create, Delete, Update } from "../redux/Feature/CustomerSlice";

const ShowModel = ({ id, close, btn }) => {
  const [inputData, setInputData] = useState();
  const { Customer, loading } = useSelector((state) => state.Customer);
  const dispatch = useDispatch();
  var catagory, city, state;

  useEffect(() => {
    if (id) {
      const single = Customer.filter((doc) => doc.id === id);
      console.log(single[0]);
      setInputData(single[0]);
    }
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "scroll");
  }, []);

  const onchangeHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const save = () => {
    dispatch(Create(inputData));
    setInputData("");
  };
  const update = () => {
    dispatch(update(inputData));
    close();
  };
  return (
    <>
      <div
        class="absolute top-0 left-0 bottom-0 right-0 z-50 p-5 flex justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.26)" }}
      >
        <div class="w-[700px] h-[670px] mt-10 relative bg-white rounded-2xl p-5">
          <div class="text-2xl py-3">Proccess</div>
          <div class="">
            <div class="">
              <div class="w-full">
                <div class="">
                  <label for="input" class=" capitalize ">
                    Enter Name
                  </label>
                  <input
                    type="text"
                    id="input"
                    name="Customer"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    value={inputData?.Customer}
                    required
                    onChange={onchangeHandler}
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="">
                  <label for="input" class="form-labNm capitalize ">
                    Select Catagory
                  </label>
                  <Select
                    className="custom-select"
                    name="Catagory"
                    defaultInputValue={inputData?.Catagory}
                    onChange={onchangeHandler}
                    getOptionValue={(option) => option.Catagory}
                    getOptionLabel={(option) => option.Catagory}
                    options={catagory}
                    isSearchable
                  />
                </div>
              </div>
            </div>
            <hr />
            <div class="flex  item-center">
              <div class="w-full">
                <div class="">
                  <label for="input" class=" capitalize ">
                    Address 1
                  </label>
                  <input
                    type="text"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    name="address1"
                    onChange={onchangeHandler}
                    value={inputData?.address1}
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="">
                  <label for="input" class=" capitalize ">
                    Address 2
                  </label>
                  <input
                    type="text"
                    id="input"
                    name="address2"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    value={inputData?.address2}
                    onChange={onchangeHandler}
                  />
                </div>
              </div>
            </div>
            <div class="flex  item-center">
              <div class="w-full">
                <div class="">
                  <label for="input" class=" capitalize ">
                    Address 3
                  </label>
                  <input
                    type="text"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    name="address3"
                    value={inputData?.address3}
                    onChange={onchangeHandler}
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="">
                  <label for="input" class=" capitalize ">
                    Pincode
                  </label>
                  <input
                    type="text"
                    max="5"
                    name="pincode"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    onChange={onchangeHandler}
                    value={inputData?.pincode}
                  />
                </div>
              </div>
            </div>
            <div class="flex  item-center">
              <div class="w-full">
                <div class="">
                  <label for="input" class="form-labNm capitalize ">
                    City
                  </label>
                  <Select
                    name="city"
                    value={inputData?.city}
                    onChange={onchangeHandler}
                    getOptionValue={(option) => option.CityNm}
                    getOptionLabel={(option) => option.CityNm}
                    options={city}
                    isSearchable
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="">
                  <label for="input" class="form-labNm capitalize ">
                    State
                  </label>
                  <Select
                    name="state"
                    value={inputData?.state}
                    onChange={onchangeHandler}
                    getOptionValue={(option) => option.state}
                    getOptionLabel={(option) => option.state}
                    options={state}
                    isSearchable
                  />
                </div>
              </div>
            </div>
            <div class="flex  item-center">
              <div class="w-full">
                <div class="">
                  <label for="input" class=" capitalize ">
                    office Number 1
                  </label>
                  <input
                    type="tel"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    name="officeNo1"
                    value={inputData?.officeNo1}
                    onChange={onchangeHandler}
                  />
                </div>
              </div>
              <div class="w-full">
                <div class="">
                  <label for="input" class=" capitalize ">
                    office Number 2
                  </label>
                  <input
                    type="tel"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    name="officeNo2"
                    value={inputData?.officeNo2}
                    onChange={onchangeHandler}
                  />
                </div>
              </div>
            </div>
            <div class="flex  item-center">
              <div class="w-full">
                <div class="">
                  <label for="input" class=" capitalize ">
                    mobile number
                  </label>
                  <input
                    type="tel"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    name="mobileNo"
                    value={inputData?.mobileNo}
                    onChange={onchangeHandler}
                  />
                </div>
              </div>

              <div class="w-full">
                <div class="">
                  <label for="input" class="">
                    email
                  </label>
                  <input
                    type="text"
                    id="input"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    name="email"
                    value={inputData?.email}
                    onChange={onchangeHandler}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div class="flex  justify-end gap-3 pt-5">
              <div class="bottom-0 end-0">
                {btn == "save" ? (
                  <button
                    class="bg-green-500 text-white font-bold rounded-xl px-5 py-3 uppercase"
                    onClick={save}
                  >
                    save
                  </button>
                ) : (
                  <button
                    class="bg-blue-500 text-white font-bold rounded-xl px-5 py-3 uppercase"
                    onClick={update}
                  >
                    update
                  </button>
                )}
              </div>
              <div class="bottom-0 end-0">
                <button
                  class="bg-red-500 text-white font-bold rounded-xl px-5 py-3 uppercase"
                  onClick={close}
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
export default function Customer() {
  const [showModel, setShowModel] = useState(false);
  const [typeBtn, setTypeBtn] = useState();
  const [id, setId] = useState();
  const { Customer, loading } = useSelector((state) => state.Customer);
  const dispatch = useDispatch();
  
  useEffect(() => {
  
  }, []);

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    if (search.length === 0) {
      setFiltered(Customer);
    } else {
      const filteredData = Customer.filter((item) =>
        item.Customer.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(filteredData);
    }
  }, [search, Customer]);

  return (
    <>
      {showModel && (
        <ShowModel id={id} close={() => setShowModel(false)} btn={typeBtn} />
      )}
      <div className="flex justify-center bg-white">
        <div>
          <div class="flex gap-2 px-4 py-3 w-full">
            <Link to={"/"} className="capitalize hover:font-medium">
              home
            </Link>
            /
            <Link to={"/Customer"} className="capitalize hover:font-medium">
              Customer
            </Link>
          </div>
          <div className="p-3 flex justify-between">
            <button
              className="p-3 bg-blue-500 text-white uppercase rounded-2xl "
              onClick={() => {
                {
                  setShowModel(true);
                  setTypeBtn("save");
                }
              }}
            >
              add costomer
            </button>
            <input
              type="text"
              id="input"
              class="w-full px-3 py-3 border border-black rounded-2xl md:w-80"
              autocomplete="off"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex justify-center p-3">
            <table className="">
              <thead className="">
                <tr className="flex items-center gap-3 bg-gray-300 px-3 py-2">
                  <th scope="w-full" className="p-1 py-3 ">
                    #
                  </th>
                  <th scope="w-full" className="w-28 flex">
                    Customer
                  </th>
                  <th scope="w-full" className="w-28 flex capitalize">
                    Catagory
                  </th>
                  <th scope="w-full" className="w-64 flex capitalize">
                    address
                  </th>
                  <th scope="w-full" className="w-28 flex capitalize">
                    pincode
                  </th>
                  <th scope="w-full" className="w-28 flex capitalize">
                    filtered
                  </th>
                  <th scope="w-full" className="w-36 flex capitalize">
                    State
                  </th>
                  <th scope="w-full" className="w-36 flex capitalize">
                    officeNo1
                  </th>
                  <th scope="w-full" className="w-36 flex capitalize">
                    officeNo1
                  </th>
                  <th scope="w-full" className="w-36 flex capitalize">
                    MobileNo
                  </th>
                  <th scope="w-full" className="w-36 flex capitalize">
                    email
                  </th>
                  <th scope="w-full" className="w-36 flex capitalize">
                    action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {filtered &&
                  filtered.map((doc, index) => (
                    <tr
                      key={index}
                      className="flex items-center gap-3 py-2 px-3 bg-gray-200 border-b border-gray-400"
                    >
                      <td scope="w-full" className="p-1 py-3 ">
                        {index + 1}
                      </td>
                      <td
                        scope="w-full"
                        className="w-28 text-ellipsis overflow-hidden truncate"
                      >
                        {doc.Customer}
                      </td>
                      <td
                        scope="w-full"
                        className="w-28 text-ellipsis overflow-hidden truncate"
                      >
                        {doc.Catagory}
                      </td>
                      <td
                        scope="w-full"
                        className="w-64 text-ellipsis overflow-hidden truncate"
                      >
                        {doc.Address1}
                        {doc.Address2}
                        {doc.Address3}
                      </td>
                      <td
                        scope="w-full"
                        className="w-28 text-ellipsis overflow-hidden truncate"
                      >
                        {doc.Pincode}
                      </td>
                      <td
                        scope="w-full"
                        className="w-28 text-ellipsis overflow-hidden truncate"
                      >
                        {doc.City}
                      </td>
                      <td
                        scope="w-full"
                        className="w-36 text-ellipsis overflow-hidden truncate"
                      >
                        {doc.State}
                      </td>
                      <td
                        scope="w-full"
                        className="w-36 text-ellipsis overflow-hidden truncate"
                      >
                        {doc.OfficeNo1}
                      </td>
                      <td
                        scope="w-full"
                        className="w-36 text-ellipsis overflow-hidden truncate"
                      >
                        {doc.OfficeNo2}
                      </td>
                      <td
                        scope="w-full"
                        className="w-36 text-ellipsis overflow-hidden truncate"
                      >
                        {doc.MobileNo}
                      </td>
                      <td
                        scope="w-full"
                        className="w-36 text-ellipsis overflow-hidden truncate"
                      >
                        {doc.Email}
                      </td>
                      <td scope="w-full" className=" p-1 th4">
                        <div className="flex gap-3">
                          <button
                            class="bg-blue-500 text-white p-2 rounded-full text-2xl"
                            onClick={() => {
                              setShowModel(true);
                              setTypeBtn("update");
                              setId(doc.id);
                            }}
                          >
                            <BiEdit />
                          </button>
                          <button
                            class="bg-red-500 text-white p-2 rounded-full text-2xl"
                       
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
    </>
  );
}
