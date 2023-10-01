import React, { useState, memo, useCallback } from "react";
import TodoApp from "../TodoApp/TodoApp";

const MainApp = () => {
  const [Tab, setTab] = useState(1);
  const [IsTabActive, setIsTabActive] = useState(false);

  //tab handler, responsible for seting tab no.
  const handleTab = useCallback(
    (tab) => {
      setIsTabActive(!false);
      setTab(tab);
      console.log('started');
    },
    [],
  );
  return (
    <div className='m-auto flex flex-col justify-center items-center'>
      {/* App selection Tab   */}
      <div className='flex justify-between w-[50rem] border-4 p-2 rounded-2xl m-auto  '>
        <button
          type='button'
          onClick={() => handleTab(1)}
          className={`Tabs ${
            Tab === 1 && IsTabActive
              ? "bg-gray-300 after:content-['_is_Active'] text-orange-500 transform scale-75  transition duration-[1s]  "
              : "transition duration-[1s]"
          }`}>
          Notes
        </button>

        <button
          type='button'
          onClick={() => handleTab(2)}
          className={`Tabs shadow-md ${
            Tab === 2 && IsTabActive
              ? "bg-gray-300 after:content-['_is_Active'] text-orange-500 transform scale-75 transition duration-[1s] "
              : "transition duration-[1s]"
          }`}>
          Todos
        </button>
      </div>
      <>{IsTabActive && Tab === 2 ? <TodoApp /> : null}</>
    </div>
  );
};

export default memo(MainApp);
