/* eslint-disable react/jsx-pascal-case */
import React, {
  Suspense,
  memo,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import { PiNotePencilBold } from "react-icons/pi";
import { BsFillPersonFill, BsListTask } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { BiChevronDown, BiChevronUp, BiExport, BiLogOut } from "react-icons/bi";
import { CiCircleRemove } from "react-icons/ci";
import { VscEdit } from "react-icons/vsc";
import NoteEditor from "../NoteApp/NoteEditor";
import TaskApp from "../TaskApp/TaskApp";
import { FcApproval, FcFullTrash, FcTodoList } from "react-icons/fc";
import Profile from "./Profile";
import { AppContext } from "../../App";

const DashBoard = ({ Logout }) => {
  const [ShowCreateNote, setShowCreateNote] = useState(false);
  const [ViewNotes, setViewNotes] = useState(false);
  const [DisplayTask, setDisplayTask] = useState(false);
  const [DisplayList, setDisplayList] = useState(false);
  const [Notes, setNotes] = useState([]);
  const [ShowProfile, setShowProfile] = useState(false);

  //Function that returns LocalStorageArray from NOTEEDITOR component.
  const ReturnStore = useCallback((store) => {
    setNotes(store);
  }, []);

  const NoteList = Notes.map((item, index) => {
    return (
      <li
        key={index}
        className={`p-4 m-auto flex flex-row-reverse w-[75vw] group max-h-[7rem]  justify-between hover:cursor-pointer rounded-xl my-2  overflow-ellipsis overflow-hidden odd:bg-gray-100 even:bg-gray-300  hover:shadow-md hover:bg-slate-100 hover:border-[2px] hover:border-cyan-100 capitalize text-slate-300 `}>
        <span>
          <CiCircleRemove
            title='delete note'
            size={30}
            className=' hover:scale-x-75  hover:text-green-500 hidden group-hover:block'
            onClick={() => {
              localStorage.removeItem(item.key);
              setNotes((prev) => prev.filter((note) => note.key !== item.key));
            }}
          />
          <VscEdit
            title='edit note'
            onClick={() => {}}
            size={30}
            className=' hover:scale-x-75  hover:text-green-500 hidden group-hover:block'
          />
        </span>
        <span className='w-full text-xl text-slate-400'>{item.value}</span>
      </li>
    );
  });

  function GetAllTask() {
    const Tasks = JSON.parse(localStorage.getItem("TaskData"));
    if (Tasks) {
      return Tasks.map((item, index) => {
        return (
          <li className='flex flex-col w-[50vw] m-auto' key={item.name}>
            <div className='flex gap-2 bg-slate-300 my-[1rem] m-auto w-[55rem]'>
              <span className='flex items-center uppercase px-[1rem] gap-5'>
                <FcTodoList className='relative ' size={50} />
                <FcFullTrash
                  size={40}
                  // onClick={() => DeleteTaskData(item.Id)}
                  style={{ cursor: "pointer" }}
                  title='delete Task'
                  className='hover:scale-95'
                />

                <span className='font-bold w-[5rem]' title='task ID'>
                  {"Task-" + index}
                </span>
              </span>

              <div className='border-2 border-slate-300 bg-cyan-900 rounded-md p-[1.5rem] m-auto my-[1rem] flex flex-row justify-around items-center w-[45rem] '>
                <div className=' flex-col flex items-center w-[5rem] '>
                  <p className=' overflow-hidden overflow-ellipsis block h-[3rem] w-[10rem] max-w-[10rem] capitalize'>
                    {item.value}
                  </p>
                  <button
                    type='button'
                    onClick={() => {
                      // handleSelect(item.Id);
                      // OpenHandler(!false);
                    }}
                    className=' font-bold w-[5rem] bg-slate-400  capitalize   p-[8px] text-xs rounded-xl m-auto hover:bg-slate-50 hover:cursor-pointer'
                    title='view Task content'>
                    open task
                  </button>
                </div>
                <span className='text-xl' title='Time task was created'>
                  {item.TimeStamp}
                </span>
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
    }
  }

  let TaskLEN, Notelen;
  const getTaskLength = () => {
    const Tasks = localStorage.getItem("TaskData");
    if (Tasks) {
      const parsedTasks = JSON.parse(Tasks);
      TaskLEN = parsedTasks.length;
    }
  };
  const getNoteLength = () => {
    let i;
    let arr = [];
    for (i = 0; i < localStorage.length; i++) {
      if (
        localStorage.key(i) !== "TaskData" &&
        localStorage.key(i) !== "AppState"
      ) {
        let key = localStorage.key(i);
        let item = localStorage.getItem(key);
        arr.push({ key, item });
      }
    }
    Notelen = arr;
  };

  getTaskLength();
  getNoteLength();

  return (
    <div className='flex border-gray-900 my-1 bg-slate-400 border-[3px] gap-48'>
      <Suspense fallback={<>hello</>}>
        {/* sidebar */}
        <div className='sidebar z-50  w-[20rem]   h-[60rem] p-4 m-3  border-orange-400 PriColor '>
          <ul className='flex w-full  flex-col m-auto gap-[5rem] uppercase text-white '>
            {/* profile */}
            <li
              className='liStyle flex items-center gap-4  justify-center '
              onClick={() => {
                setShowProfile(!ShowProfile);
                setDisplayList(false);
                setDisplayTask(false);
                setViewNotes(false);
                setShowCreateNote(false);
              }}>
              <span>
                <BsFillPersonFill size={35} />
              </span>
              Profile
            </li>
            {/* notification */}
            <li className='liStyle flex items-center gap-4  justify-center  '>
              <span>
                <span className='h-1 w-1 p-[7px] left-[15rem] top-[10rem] bg-yellow-400 absolute  bottom rounded-full'></span>
                <IoNotifications size={35} />
              </span>
              Notification
            </li>
            {/* note management */}
            <li className='liStyle flex-col  items- justify-center  group p-2'>
              <div className='flex items-center gap-4  justify-center  '>
                <span>
                  <PiNotePencilBold size={35} />
                </span>
                Note Management
                <BiChevronDown
                  className='group-hover:block hidden '
                  size={35}
                />
                <BiChevronUp className=' group-hover:hidden block' size={35} />
              </div>
              <ul className='flex-col gap-[3rem] h-auto w-full  justify-evenley  hidden font-normal group-hover:block group-hover:transition-all group-hover:duration-300    '>
                <li
                  className='hover:bg-slate-500 p-4'
                  onClick={() => {
                    setShowProfile(!true);
                    setDisplayList(false);
                    setDisplayTask(false);
                    setViewNotes(false);
                    setShowCreateNote(!ShowCreateNote);
                  }}>
                  {ShowCreateNote ? "Close editor" : "Create New Note"}
                </li>
                <li
                  className='hover:bg-slate-500 p-4'
                  onClick={() => {
                    setShowCreateNote(false);
                    setShowProfile(!true);
                    setDisplayList(false);
                    setDisplayTask(false);
                    setViewNotes(!ViewNotes);
                    setShowCreateNote(false);
                  }}>
                  {ViewNotes ? "close view Note " : "view Notes"}
                </li>
              </ul>
            </li>
            {/* task management */}
            <li className='liStyle flex-col items-center gap-4  justify-center  group'>
              <div className='flex items-center gap-4  justify-center  '>
                <span>
                  <BsListTask size={35} />
                </span>
                Task Management{" "}
                <BiChevronDown
                  className='group-hover:block hidden '
                  size={35}
                />
                <BiChevronUp className=' group-hover:hidden block' size={35} />
              </div>
              <ul className='flex-col gap-[3rem] h-auto w-full justify-evenley  hidden font-normal group-hover:block group-hover:transition-all group-hover:duration-300    '>
                <li
                  onClick={() => {
                    setDisplayTask(!DisplayTask);
                    setShowProfile(!true);
                    setDisplayList(false);
                    setViewNotes(false);
                    setShowCreateNote(false);
                  }}
                  className='hover:bg-slate-500 p-4 '>
                  Create Task
                </li>
                <li
                  onClick={() => {
                    setDisplayList(!DisplayList);
                    setDisplayTask(false);
                    setShowProfile(!true);
                    setShowCreateNote(false);
                    setViewNotes(false);
                  }}
                  className='hover:bg-slate-500 p-4'>
                  View Task
                </li>
              </ul>
            </li>
            {/* exports */}
            <li className='liStyle flex items-center gap-4  justify-center  '>
              <span>
                <BiExport size={35} />
              </span>
              Exports
            </li>
            {/* sign out */}
            <li
              onClick={() => {
                const qst = window.confirm(
                  "you will be logged out of your account \n click yes to continue or No to cancel",
                );
                if (qst) Logout();
              }}
              className='liStyle flex items-center gap-4  justify-center'>
              <span>
                <BiLogOut size={35} />
              </span>
              log Out
            </li>
          </ul>
        </div>

        <WelcomeMessage TaskLEN={TaskLEN} Notelen={Notelen.length} />
        {ShowCreateNote && <NoteEditor ReturnStore={ReturnStore} />}
        {ViewNotes && (
          <ul className='flex flex-col h-auto w-[75vw] '>{NoteList}</ul>
        )}
        {/* todo */}
        {DisplayTask && <TaskApp />}
        {DisplayList && <ul>{GetAllTask()}</ul>}
        {ShowProfile && <Profile />}
      </Suspense>
    </div>
  );
};

export default React.memo(DashBoard);

//welcome message components
const WelcomeMessage = memo(({ TaskLEN, Notelen }) => {
  useEffect(() => {
    let msgBorder = document.querySelector(".message-border");
    let msg = document.querySelector(".msg");
    msgBorder.addEventListener("animationend", () => msg.remove());
    return () =>
      msgBorder.removeEventListener("animationend", () => msg.remove());
  }, [TaskLEN]);
  let AppState = useContext(AppContext);
  const { fullname } = AppState;
  return (
    <div className='msg PriColor w-[45vw] h-fit border-cyan-300 border flex-col left-[35%] bg-opacity-40  absolute  z-50 '>
      <div className=' flex justify-evenly items-center'>
        <p className='font-serif text-4xl text-sky-400 text uppercase '>
          welcome back dear
          <span className='uppercase font-semibold italic text-slate-100 font-serif text-4xl ml-2 '>
            {fullname}
          </span>
        </p>
        <div className='h-5 w-5 p-[3rem] rounded-full bg-slate-500 flex items-center justify-center '>
          avater
        </div>
      </div>
      <hr />
      <p className='capitalize text-slate-400 text-xl '>
        you have <span className='text-slate-100'>{Notelen}</span> notes,
        <span className='text-slate-100'>{TaskLEN}</span> tasks and{" "}
        <span className='text-slate-100 text-xl '>0</span> tasks completed.
      </p>
      <div className='message-border'></div>
    </div>
  );
});
