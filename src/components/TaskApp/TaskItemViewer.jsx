import React, { useState, memo } from "react";
import jsPDF from "jspdf";
import { FaDownload, FaTimes } from "react-icons/fa";
const TaskItemViewer = ({ closeHandler, selectedItemProp }) => {
  const [Selected] = useState(selectedItemProp);

  console.log("selectedItem from TaskStore ", selectedItemProp);
  // functions that handles downloading of Task
  const handleDownload = () => {
    let pdf = new jsPDF();
    pdf.text(Selected, 10, 10);
    pdf.save(`${prompt("give your Task a name")}`);
    setTimeout(() => alert("Task Downloaded", 1000));
    return;
  };

  return (
    <div className=' bg-black  fixed top-0 bottom-0 left-0 right-0  z-10 w-full h-screen bg-opacity-95 '>
      <FaTimes
        className='relative top-[0rem] left-[123rem] hover:cursor-pointer hover:[color:black]'
        size={60}
        onClick={() => closeHandler(!true)}
        color='white'
      />
      <div className='single_item    w-[35vw] max-w-[35vw] relative top-[30vh] left-0 right-0 bottom-0  rounded-xl m-auto  text-center text-slate-400 bg-white  p-[1rem] max-h-auto text-3xl  break-words'>
        <p className='p-3 text-left indent-2 txt'>{Selected}</p>{" "}
        <button
          className='rounded-xl w-[14rem] h-[4rem] text-black bg-slate-400 uppercase font-normal font-sans flex gap-2 justify-center items-center text-xl m-auto p-2'
          onClick={() => handleDownload()}>
          get it Locally{" "}
          <span>
            <FaDownload size='35' width={"40"} className=' m-2 ' />
          </span>
        </button>
      </div>
    </div>
  );
};

export default memo(TaskItemViewer);
