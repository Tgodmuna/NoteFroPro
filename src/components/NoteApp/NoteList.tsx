import React, { Suspense, useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { VscEdit } from "react-icons/vsc";
import { notelistpropType } from "../Global/globalTypes";
const LazyView = React.lazy(() => import("./NoteViewer"));

const NoteList = ({ store, EditNoteProp }: notelistpropType) => {
  const [state, setstate] = useState(store);
  const [Hovered, setHovered] = useState<string | null>(null);
  const [showHover, SetshowHover] = useState(false);
  useEffect(() => {
    setstate(store);
  }, [store]);
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
            setHovered(item?.item);
            SetshowHover(true);
          }}
          key={index}>
          <span>
            <CiCircleRemove
              title='delete note'
              size={30}
              className=' hover:scale-x-75  hover:text-green-500 hidden group-hover:block'
              onClick={() => {
                item.key && localStorage.removeItem(item.key);
                setstate((prev) =>
                  prev.filter((note) => note.key !== item.key),
                );
              }}
            />
            <VscEdit
              title='edit note'
              onClick={() => {
                if (item.item) {
                  EditNoteProp(item.item);
                }
              }}
              size={30}
              className=' hover:scale-x-75  hover:text-green-500 hidden group-hover:block'
            />
          </span>
          <span className='text-xl hover:text-white overflow-ellipsis overflow-hidden w-auto max-w-[8rem] '>
            {item.item}
          </span>
        </li>
      </>
    );
  });

  return (
    <Suspense fallback={<>loading....................</>}>
      <div className='w-[25rem] border-[4px] bord rounded-lg h-[58rem] my-4  overflow-x-clip overflow-scroll  mr-2'>
        <ul className='flex PriColor flex-col h-full w-full mt-4   '>
          {list}
        </ul>
        {showHover && <LazyView Hovered={Hovered} />}
      </div>
    </Suspense>
  );
};

export default NoteList;
