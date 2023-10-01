import React, { memo, useMemo } from "react";
import { FcTodoList, FcApproval, FcFullTrash } from "react-icons/fc";

const TodoList = ({ Todo_store, OpenHandler, handleSelect }) => {
  const { store, storeSetter } = Todo_store;

  const TodoElement = useMemo(() => {
    function DeleteItem(itemIDToDel) {
      storeSetter((prevs) => prevs.filter((item) => item.Id !== itemIDToDel));
    }
    return store.map((item, index) => {
      return (
        <li className='flex flex-col w-[50vw] m-auto' key={item.name}>
          <div className='flex gap-2 bg-slate-300 my-[1rem] m-auto w-[55rem]'>
            <span className='flex items-center uppercase px-[1rem] gap-5'>
              <FcTodoList className='relative ' size={50} />
              <FcFullTrash
                size={40}
                onClick={() => DeleteItem(item.Id)}
                style={{ cursor: "pointer" }}
              />

              <span className='font-bold w-[5rem]'>{"item-" + index}</span>
            </span>

            <div className='border-2 border-slate-300 bg-cyan-900 rounded-md p-[1.5rem] m-auto my-[1rem] flex flex-row justify-around items-center w-[45rem] '>
              <div className=' flex-col flex items-center w-[5rem] '>
                <p className=' overflow-hidden overflow-ellipsis block h-[3rem] w-[10rem] max-w-[10rem] capitalize'>
                  {item.value}
                </p>
                <button
                  type='button'
                  onClick={() => {
                    handleSelect(item.Id);
                    OpenHandler(!false);
                  }}
                  className=' font-bold w-[5rem] bg-slate-400  capitalize   p-[8px] text-xs rounded-xl m-auto hover:bg-slate-50 hover:cursor-pointer'>
                  downlaod PDF
                </button>
              </div>
              <span className='text-xl'>{item.TimeStamp}</span>
              <span className='flex gap-2 items-center relative left-[2.5rem] font-semibold text-lg '>
                {item.IsSaved && (
                  <>
                    <FcApproval size={40} />
                  </>
                )}
                saved
              </span>
            </div>
          </div>
        </li>
      );
    });
  }, [OpenHandler, handleSelect, store, storeSetter]);

  return (
    <>
      <ul className=' w-[50vw] m-auto bg-black rounded-xl '>{TodoElement}</ul>
    </>
  );
};

export default memo(TodoList);
