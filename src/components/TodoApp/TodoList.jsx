import React, { memo } from "react";
import { FcTodoList, FcApproval, FcFullTrash } from "react-icons/fc";

const TodoList = ({ Todo_store, OpenHandler, handleSelect }) => {
  //Remove TodoItems
  const Delete = () => {
    document.querySelector("li").remove();
  };

  const TodoElement = Todo_store.map((item) => (
    <li className='flex flex-col w-50vw] m-auto' key={item.name}>
      <div className='flex gap-2 bg-slate-300 my-[1rem] m-auto w-[55rem]'>
        <span className='flex items-center uppercase px-[1rem] gap-5'>
          <FcTodoList className='relative ' size={50} />
          <FcFullTrash size={40} onClick={() => Delete(this)} />
          <span className='font-bold'> {item.name}</span>
        </span>

        <div
          onClick={() => {
            OpenHandler(true);
            handleSelect();
          }}
          className='border-2 border-slate-300 bg-cyan-900 rounded-md p-[1.5rem] m-auto my-[1rem] flex flex-row justify-around items-center w-[45rem] hover:bg-slate-50 hover:cursor-pointer  '>
          <p className='overflow-hidden overflow-ellipsis block h-[3rem] w-[10rem] max-w-[10rem] capitalize'>
            {item.value}
          </p>
          <span className='text-xl'>{item.TimeStamp}</span>
          <span className='flex gap-2 items-center relative left-[2.5rem] font-semibold text-lg '>
            {item.IsSaved && (
              <>
                <FcApproval size={40} />
              </>
            )}
            saved{" "}
          </span>
        </div>
      </div>
    </li>
  ));

  return (
    <>
      <ul className=' w-[50vw] m-auto bg-black rounded-xl '>{TodoElement}</ul>
    </>
  );
};

export default memo(TodoList)
