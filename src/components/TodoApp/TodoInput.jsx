import React, { useCallback, useState } from "react";

const TodoInput = ({ HandleUpdateProp }) => {
  const [TodoText, setTodoText] = useState("");

  //handle input function
  const handleInput = useCallback(
    (e) => {
      const { value } = e.target;
      setTodoText(value);
      //call back from TodoApp
      HandleUpdateProp(value);
    },
    [HandleUpdateProp],
  );

  //reset input value

  return (
    <>
      <input
        onChange={(e) => handleInput(e)}
        value={TodoText}
        placeholder='enter Todo item '
        type='text'
        name='TodoText'
        id='TT'
        className='p-[1rem] py-[1rem] m-auto my-6 w-[35vw] bg-slate-300 placeholder:text-lg placeholder:uppercase placeholder:text-center placeholder:text-gray-500  border-[3px] border-slate-400 rounded-md  '
      />
    </>
  );
};

export default React.memo(TodoInput);
