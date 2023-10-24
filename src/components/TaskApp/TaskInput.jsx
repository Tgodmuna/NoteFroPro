import React, { useCallback, useState } from "react";

const TaskInput = ({ HandleUpdateProp }) => {
  const [TaskText, setTaskText] = useState("");

  //handle input function
  const handleInput = useCallback(
    (e) => {
      const { value } = e.target;
      setTaskText(value);
      //call back from TaskApp
      HandleUpdateProp(value);
    },
    [HandleUpdateProp],
  );

  //reset input value

  return (
    <>
      <input
        onChange={(e) => handleInput(e)}
        value={TaskText}
        placeholder='enter Task '
        type='text'
        name='TaskText'
        id='TT'
        className='p-[1rem] py-[1rem] m-auto my-6 w-[20rem] bg-slate-300 placeholder:text-lg placeholder:uppercase placeholder:text-center placeholder:text-gray-500  border-[3px] border-slate-400 rounded-md  '
      />
    </>
  );
};

export default React.memo(TaskInput);
