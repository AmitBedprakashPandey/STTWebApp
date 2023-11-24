import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import "./print.css";
export default function Home({ Data, FromDate, ToDate, SupplierNm }) {
  const componentRef = useRef();

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}/${month}/${year}`;
  return (
    <>
      {/* Add a button to trigger the print */}
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-primary  text-white m-3 fs-3 position-absolute ">
            Print
          </button>
        )}
        content={() => componentRef.current}
      />

      <div className="A4Page" ref={componentRef}>
        <div className="py-2">
          <h4 className="flex justify-center uppercase font-bold">
            shree tirupati textiles
          </h4>
          <p className="flex justify-center uppercase font-normal text-xs underline m-0">
            Customer wise Register
          </p>
          <p className="flex justify-center uppercase font-normal underline ">
            From <b className="px-1 font-medium">{FromDate}</b> To{" "}
            <b className="px-1 font-medium">{ToDate}</b>
          </p>
          <div className="flex px-5">
            {/* <p className="pageTxt p-0 m-0">page :</p> */}
            <p className="p-0 m-0">Date : {currentDate}</p>
          </div>
        </div>
        <div className="pageHeader">
          <table>
            <thead className="">
              <tr className="px-5 flex gap-4">
                <th>FY. - SR.NO</th>
                <th>LOT NO.</th>
                <th>DATE</th>
                <th>BILL NO.</th>
                <th>SUPPLIER</th>
                <th>QUALITY</th>
                <th>PCS</th>
                <th>METERES</th>
                <th>RATE</th>
                <th>BILL AMT.</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="pageBody">
          <h6 className="px-5 py-2 underline capitalize">maruti textiles</h6>
          <table className="">
            <tbody className="">
              <tr className=" flex gap-4 px-5">
                <td>FT.SR.NO</td>
                <td>LOT NO.</td>
                <td>DATE</td>
                <td>BILL NO.</td>
                <td>SUPPLIER</td>
                <td>QUALITY</td>
                <td>PCS</td>
                <td>METERES</td>
                <td>RATE</td>
                <td>BILL AMT</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="my-2 border border-black">
          <table>
            <tbody className="">
              <tr className="px-5 flex gap-4">
                <td>FT.SR.NO</td>
                <td>LOT NO.</td>
                <td>DATE</td>
                <td>BILL NO.</td>
                <td>SUPPLIER</td>
                <td>QUALITY</td>
                <td>PCS</td>
                <td>METERES</td>
                <td>RATE</td>
                <td>BILL AMT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
