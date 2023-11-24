import { useEffect, useState } from "react";
import "../Master/master.css";
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
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Create } from "../redux/Feature/CustomerWiseSlice";
import { toast } from "react-toastify";
const customerRef = collection(DB, "customer");
const stateRef = collection(DB, "State");
const catagoryRef = collection(DB, "Catagory");
const cityRef = collection(DB, "City");
const ShowModel = ({ id, close, change, btn }) => {
  
  const [customerData, setCustomerData] = useState();
  const [customerList, setCustomerList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [proccesList, setProccesList] = useState([]);
  const [transportList, setTransportList] = useState([]);
  const [qualityList, setQualityList] = useState([]);
  const dispatch = useDispatch();
  
  const {transport} = useSelector((state)=>state.Transport);
  const onChangeHandlerForAll = (e) => {
    setCustomerData({...customerData,[e.target.name]: e.target.value });
    console.log(customerData);
  };
  useEffect(()=>{

  },[customerData])
  const onSubmit = () => {
    if (btn === "save") {
      dispatch(Create(customerData)).then(() => {
        toast.success("save");
      });
    } else {
    }
  };
  return (
    <>
      <div
        class="absolute top-0 left-0 bottom-0 right-0 z-50 p-5 flex justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.26)" }}
      >
        <div class="w-[700px] h-[450px] mt-10 relative bg-white rounded-2xl p-5">
          <div class="text-2xl py-3">Customer Wise Entry</div>
          <div class="">
            <div class="">
              {/* Row 1 */}
              <div className="flex gap-3">
                <div class="w-full">
                  <label for="input" class="form-labNm capitalize ">
                    Select Customer
                  </label>
                  <Select
                    className="custom-select"
                    name="customer"
                    value={customerData?.customer}
                    onChange={onChangeHandlerForAll}
                    getOptionValue={(option) => option.Catagory}
                    getOptionLabel={(option) => option.Catagory}
                    options={customerList}
                    isSearchable
                  />
                </div>
                <div class="w-full">
                  <label for="input" class="form-labNm capitalize ">
                    Select Suplier
                  </label>
                  <Select
                    className="custom-select"
                    name="supplier"
                    value={customerData?.supplier}
                    onChange={onChangeHandlerForAll}
                    getOptionValue={(option) => option.Catagory}
                    getOptionLabel={(option) => option.Catagory}
                    options={supplierList}
                    isSearchable
                  />
                </div>
              </div>
              {/* Row 2 */}
              <div className="flex gap-3">
                <div class="w-full">
                  <label for="input" class="form-labNm capitalize ">
                    Select Procces
                  </label>
                  <Select
                    className="custom-select"
                    value={customerData?.procces}
                    onChange={onChangeHandlerForAll}
                    getOptionValue={(option) => option.Catagory}
                    getOptionLabel={(option) => option.Catagory}
                    options={proccesList}
                    isSearchable
                  />
                </div>
                <div class="w-full">
                  <label for="input" class="form-labNm capitalize ">
                    Select Transport
                  </label>
                  <Select
                    className="custom-select"
                    name="transport"
                    value={customerData?.transport}
                    onChange={onChangeHandlerForAll}
                    getOptionValue={(option) => option.Transport}
                    getOptionLabel={(option) => option.Transport}
                    options={transport}
                    isSearchable
                  />
                </div>
              </div>
              {/* Row 3 */}
              <div class="flex gap-3">
                <div class="w-full">
                  <label for="input" class=" capitalize ">
                    Bill Date
                  </label>
                  <input
                    type="text"
                    id="input"
                    name="billdate"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    value={customerData?.date}
                    required
                    onChange={onChangeHandlerForAll}
                  />
                </div>
                <div class="w-full">
                  <label for="input" class=" capitalize ">
                    Lot No
                  </label>
                  <input
                    type="text"
                    id="input"
                    name="lotno"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    value={customerData?.lotno}
                    required
                    onChange={onChangeHandlerForAll}
                  />
                </div>
                <div class="w-full">
                  <label for="input" class="form-labNm capitalize ">
                    Select Quality
                  </label>
                  <Select
                    className="custom-select"
                    name="quality"
                    value={customerData?.quality}
                    onChange={onChangeHandlerForAll}
                    getOptionValue={(option) => option.Catagory}
                    getOptionLabel={(option) => option.Catagory}
                    options={qualityList}
                    isSearchable
                  />
                </div>
              </div>
            </div>
            {/* Row 4 */}
            <div class="">
              <div class="flex gap-3">
                <div class="w-full">
                  <label for="input" class=" capitalize ">
                    pcs
                  </label>
                  <input
                    type="text"
                    id="input"
                    name="pcs"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    onChange={onChangeHandlerForAll}
                    value={customerData?.pcs}
                  />
                </div>
                <div class="w-full">
                  <label for="input" class=" capitalize ">
                    Meter's
                  </label>
                  <input
                    type="text"
                    id="input"
                    name="meter"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    onChange={onChangeHandlerForAll}
                    value={customerData?.meter}
                  />
                </div>
                <div class="w-full">
                  <label for="input" class=" capitalize ">
                    Rate
                  </label>
                  <input
                    type="text"
                    id="input"
                    name="rate"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    onChange={onChangeHandlerForAll}
                    value={customerData?.rate}
                  />
                </div>
                <div class="w-full">
                  <label for="input" class=" capitalize ">
                    Bill Amt.
                  </label>
                  <input
                    type="text"
                    id="input"
                    name="billamt"
                    class="rounded-lg px-3 py-2 border border-black text-lg w-full placeholder:capitalize"
                    required
                    onChange={onChangeHandlerForAll}
                    value={customerData?.billamt}
                  />
                </div>
              </div>
            </div>

            <div class="flex  justify-end gap-3 pt-5">
              <div class="bottom-0 end-0">
                {btn == "save" ? (
                  <button
                    class="bg-green-500  font-bold rounded-xl px-5 py-3 uppercase"
                    onClick={onSubmit}
                  >
                    save
                  </button>
                ) : (
                  <button
                    class="bg-blue-500 text-white font-bold rounded-xl px-5 py-3 uppercase"
                    onClick={onSubmit}
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
export default function CustomerWise() {
  const [showModel, setShowModel] = useState(false);
  const [CustomerList, setCustomerList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [typeBtn, setTypeBtn] = useState();
  const [id, setId] = useState();

  const { CustomerWise, loading, error } = useSelector(
    (state) => state.CustomerWise
  );

  const search = (e) => {
    const data = CustomerList.filter((val) =>
      val.Customer.toLowerCase().includes(e.target.value)
    );
    setFilterData(data);
  };
  console.log(CustomerWise);
  useEffect(() => {}, []);

  const deleteData = (e) => {};

  return (
    <>
      {showModel && (
        <ShowModel close={() => setShowModel(false)} btn={typeBtn} />
      )}
      <div className="flex justify-center bg-white">
        <div>
          <div class="flex gap-2 px-4 py-3 w-full">
            <Link to={"/"} className="capitalize hover:font-medium">
              home
            </Link>
            /
            <Link to={"/customer"} className="capitalize hover:font-medium">
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
              onChange={search}
            />
          </div>

          <div className="flex justify-center p-3">
            <table className="">
              <thead className="">
                <tr className="flex items-center gap-3 bg-gray-300 px-3 py-2">
                  <th scope="w-full" className="p-1 w-full">
                    #
                  </th>
                  <th scope="w-full" className="w-28 flex">
                    Date
                  </th>
                  <th scope="w-full" className="w-28 flex capitalize">
                    lot No.
                  </th>
                  <th scope="w-full" className="w-64 flex capitalize">
                    Bill No.
                  </th>
                  <th scope="w-full" className="w-28 flex capitalize">
                    Quality
                  </th>
                  <th scope="w-full" className="w-28 flex capitalize">
                    Pcs
                  </th>
                  <th scope="w-full" className="w-36 flex capitalize">
                    Meter's
                  </th>
                  <th scope="w-full" className="w-36 flex capitalize">
                    Rate
                  </th>
                  <th scope="w-full" className="w-36 flex capitalize">
                    Bill Amt.
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {CustomerWise.map((doc, index) => (
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
                      {doc.date}
                    </td>
                    <td
                      scope="w-full"
                      className="w-28 text-ellipsis overflow-hidden truncate"
                    >
                      {doc.lotno}
                    </td>
                    <td
                      scope="w-full"
                      className="w-64 text-ellipsis overflow-hidden truncate"
                    >
                      {doc.billno}
                    </td>
                    <td
                      scope="w-full"
                      className="w-28 text-ellipsis overflow-hidden truncate"
                    >
                      {doc.quality}
                    </td>
                    <td
                      scope="w-full"
                      className="w-28 text-ellipsis overflow-hidden truncate"
                    >
                      {doc.pcs}
                    </td>
                    <td
                      scope="w-full"
                      className="w-36 text-ellipsis overflow-hidden truncate"
                    >
                      {doc.meter}
                    </td>
                    <td
                      scope="w-full"
                      className="w-36 text-ellipsis overflow-hidden truncate"
                    >
                      {doc.rate}
                    </td>
                    <td
                      scope="w-full"
                      className="w-36 text-ellipsis overflow-hidden truncate"
                    >
                      {doc.billamt}
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
                          value={doc.id}
                          onClick={deleteData}
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
