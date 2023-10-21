import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import "./master.css";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const notify = () => {
    toast.success("SAVE");
    toast.info("DELETE");
  };
  useEffect(() => {}, []);
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
    </>
  );
}
