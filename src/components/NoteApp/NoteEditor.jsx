import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { HiSave, HiSaveAs } from "react-icons/hi";
import { VscOpenPreview } from "react-icons/vsc";
import { BsShareFill } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { TbStatusChange } from "react-icons/tb";
import { BiFontFamily } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import NoteList from "./NoteList";
//lazy imports

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
  const ChangeBG = (colorName) => {
    let elem = document.querySelector("textarea");
    elem.style.backgroundColor = colorName;
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
    <Suspense fallback={<> loading ...</>}>
      {" "}
      <div className=' flex  mt-5 justify-start  w-full '>
        {/* icons */}

        <FaBars
          size={35}
          onClick={() => setShowMenu(true)}
          className={`IconHover hover:cursor-pointer title='more'
 ${
   ShowMenu ? "hidden transition-all  duration-1000 ease-in " : ""
 } absolute  left-4`}
        />

        <div
          className={`Titlebar p-[1rem] w-[5rem] h-[40vw] border-slate-400 border-2 rounded items-center my-4  flex flex-col  justify-between relative left-[-12.5rem] ${
            ShowMenu
              ? "translate-x-[12.5rem] transition-transform duration-700 "
              : "translate-x-[-12.5rem] ease-in  transition-transform duration-700"
          } `}>
          <div className='flex '>
            <FaTimes
              onClick={() => setShowMenu(false)}
              size={30}
              className={`IconHover hover:cursor-pointer `}
            />
          </div>

          {/* icons */}
          <AiOutlineHome title='Home' size={30} className='IconHover' />
          <HiSaveAs size={30} title='save as' className='IconHover' />
          <HiSave
            onClick={() => {
              Save();
              getAllNote();
            }}
            title='save'
            size={30}
            className={` IconHover`}
          />
          <span
            className={`bg-red-500 p-[4px] absolute border-2 border-green-400  top-[18rem] left-[40px] rounded-full w-1 h-1  ${
              SaveIndicator ? "block" : "hidden"
            } `}></span>

          <VscOpenPreview title='preview ' size={30} className='IconHover' />
          <BsShareFill title='share' size={30} className='IconHover' />
          <IoCreateOutline
            onClick={createNewNote}
            title='newfile'
            size={30}
            className='IconHover'
          />
          <div className='flex'>
            <TbStatusChange
              onClick={() => setshowColorBTNs(true)}
              title='background color '
              size={30}
              className='IconHover'
            />{" "}
            {showColorBTNs ? (
              <LazyBG closeColorBTNs={closeColorBTNs} ChangeBG={ChangeBG} />
            ) : null}
          </div>

          <BiFontFamily title='font style' size={30} className='IconHover' />
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
          className='Editor w-full h-[40vw] m-3 bg-gray-300 border-2 border-black rounded-lg text-left indent-3 capitalize  my-4 p-4'>
          start typing
        </textarea>

        <NoteList Store={LocalStorageArray} EditNoteProp={EditNote} />
      </div>
    </Suspense>
  );
};

export default React.memo(NoteEditor);
