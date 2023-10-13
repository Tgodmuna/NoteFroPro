import React, { Suspense, useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { VscEdit } from "react-icons/vsc";
const LazyView = React.lazy(() => import("./NoteViewer"));

const NoteList = ({ Store, EditNoteProp }) => {
  const [state, setstate] = useState(Store);
  const [Hovered, setHovered] = useState(null);
  const [showHover, SetshowHover] = useState(false);

  const list = state.map((item, index) => {
    return (
      <>
        <li
          className={`p-4 flex flex-row-reverse  group max-h-[7rem]  justify-between hover:cursor-pointer rounded-xl m-3  overflow-ellipsis overflow-hidden odd:bg-gray-100 even:bg-gray-300  hover:shadow-md hover:bg-slate-100 hover:border-[2px] hover:border-cyan-100 uppercase  hover:font-bold text-slate-500 `}
          onMouseLeave={() => {
            setHovered(null);
            SetshowHover(false);
          }}
          onMouseEnter={() => {
            setHovered(item.value);
            SetshowHover(true);
          }}
          key={index}>
          <span>
            <CiCircleRemove
              title='remove note'
              size={30}
              className=' hover:scale-x-75  hover:text-green-500 hidden group-hover:block'
              onClick={() => localStorage.removeItem(item.key)}
            />
            <VscEdit
              title='edit note'
              onClick={() => {
                EditNoteProp(item.value);
              }}
              size={30}
              className=' hover:scale-x-75  hover:text-green-500 hidden group-hover:block'
            />
          </span>
          <span className='text-xl hover:text-white overflow-ellipsis overflow-hidden w-auto max-w-[8rem] '>
            {item.value}
          </span>
        </li>
      </>
    );
  });

  useEffect(() => setstate(Store), [Store]);

  return (
    <Suspense fallback={<>loading....................</>}>
      <div className='w-[25rem] border-[4px] border-cyan-700 rounded-lg h-[40vw] my-4  overflow-y-scroll '>
        <ul className='flex flex-col h-auto w-full   divide-x-2divide-cyan-300  '>
          {list}
        </ul>
        {showHover && <LazyView Hovered={Hovered} />}
      </div>
    </Suspense>
  );
};

export default React.memo(NoteList);
