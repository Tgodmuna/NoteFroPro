import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { HiSave, HiSaveAs } from "react-icons/hi";
import { VscOpenPreview } from "react-icons/vsc";
import { BsShareFill } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { TbStatusChange } from "react-icons/tb";
import { BiFontFamily } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import NoteList from "./NoteList";
//lazy imports
const LazyMore = lazy(() =>
  import("./NoteButtons").then((module) => ({ default: module.Menu })),
);
const LazyBG = lazy(() =>
  import("./NoteButtons").then((Module) => ({ default: Module.BGbtn })),
);

const NoteEditor = () => {
  const [ShowMenu, setShowMenu] = useState(false);
  const [showColorBTNs, setshowColorBTNs] = useState(false);
  const [Text, setText] = useState("");
  const [SaveIndicator, setSaveIndicator] = useState(!false);
  const [LocalStorageArray, setLocalStorageArray] = useState([]);

  // save handler
  const Save = useCallback(() => {
    const note = Text;
    const uniqueKey = `Note_${prompt("enter Note ID [numerics]")}`;
    if (Text !== "" || null || undefined) {
      localStorage.setItem(uniqueKey, note);
      setSaveIndicator(false);
      alert("Text saved successfully!");
    }
  }, [Text]);

  //change background color
  const ChangeBG = useEffect((colorName) => {
    let elem = document.querySelector("textarea");
    elem.style.backgroundColor = colorName;
  }, []);

  //close menu handler
  const closeMenu = () => {
    setShowMenu(false);
  };
  const closeColorBTNs = () => {
    setshowColorBTNs(false);
  };
  // new note
  const createNewNote = () => {
    setText("");
    setSaveIndicator(!false);
  };

  //edit note
  const EditNote = (editText) => {
    setText(editText);
  };

  //get all the items in the localstorage
  const getAllNote = useCallback(() => {
    let i;
    let arr = [];
    for (i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      arr.push({ key, value });
    }
    setLocalStorageArray(arr);
  }, []);

  useEffect(() => {
    getAllNote();
  }, [getAllNote]);

  return (
    <Suspense fallback={<>loading...</>}>
      {" "}
      <div className='  flex  gap-5 mt-5 justify-start -mx-3 w-full '>
        {/* icons */}
        <div className='Titlebar p-[1rem] w-[5rem] h-[40vw] border-slate-400 border-2 rounded items-center my-4 m-[19px]  flex flex-col gap-6 justify-between '>
          <div className='flex '>
            <FaBars
              onClick={() => setShowMenu(true)}
              title='more'
              size={30}
              className='hover:cursor-pointer hover:scale-x-90 hover:text-green-500'
            />
            {ShowMenu && <LazyMore closeMenu={closeMenu} />}
          </div>

          {/* icons */}
          <AiOutlineHome
            title='Home'
            size={30}
            className='hover:cursor-pointer hover:scale-x-90 hover:text-green-500'
          />
          <HiSaveAs
            size={30}
            title='save as'
            className='hover:cursor-pointer hover:scale-x-90 hover:text-green-500'
          />
          <HiSave
            onClick={() => {
              Save();
              getAllNote();
            }}
            title='save'
            size={30}
            className={` hover:cursor-pointer hover:scale-x-90 hover:text-green-500`}
          />
          <span
            className={`bg-red-500 p-[6px] absolute border-2 border-green-400  top-[21rem] left-[60px] rounded-full w-1 h-1  ${
              SaveIndicator ? "block" : "hidden"
            } `}></span>

          <VscOpenPreview
            title='preview '
            size={30}
            className='hover:cursor-pointer hover:scale-x-90 hover:text-green-500'
          />
          <BsShareFill
            title='share'
            size={30}
            className='hover:cursor-pointer hover:scale-x-90 hover:text-green-500'
          />
          <IoCreateOutline
            onClick={createNewNote}
            title='newfile'
            size={30}
            className='hover:cursor-pointer hover:scale-x-90 hover:text-green-500'
          />
          <div className='flex'>
            <TbStatusChange
              onClick={() => setshowColorBTNs(true)}
              title='background color '
              size={30}
              className='hover:cursor-pointer hover:scale-x-90 hover:text-green-500'
            />
            {showColorBTNs ? (
              <LazyBG closeColorBTNs={closeColorBTNs} ChangeBG={ChangeBG} />
            ) : null}
          </div>

          <BiFontFamily
            title='font style'
            size={30}
            className='hover:cursor-pointer hover:scale-x-90 hover:text-green-500'
          />
        </div>

        <textarea
          onBlur={() => {
            if (Text.length >= 1000) {
              Save();
            }
          }}
          value={Text}
          onChange={(e) => {
            setText(e.target.value);
            setSaveIndicator(true);
          }}
          className='Editor w-full h-[40vw] bg-gray-300 border-2 border-black rounded-lg text-left indent-3 capitalize  my-4 p-4'>
          start typing
        </textarea>

        <NoteList Store={LocalStorageArray} EditNoteProp={EditNote} />
      </div>
    </Suspense>
  );
};

export default React.memo(NoteEditor);
