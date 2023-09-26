import React, { Suspense, memo, useState } from "react";
//lazy importations
const List = React.lazy(() => import("./TodoList"));
const Input = React.lazy(() => import("./TodoInput"));
const TodoItemViewr = React.lazy(() => import("./TodoItemViewer"));

//Todo main Components
const TodoApp = () => {
  let [ID, setID] = useState(0);
  const [InputValue, setInputValue] = useState("");
  const [IsSaved, setIsSaved] = useState(false);
  const [IsOpened, setIsOpened] = useState(false);
  const [Selected, setSelected] = useState(null);

  //todo Store
  const [TodoItems, setTodoItems] = useState([]);

  //call back function to update inputValue state with prop value from Todoinput Component
  const HandleUpdate = (value) => {
    setInputValue(value);
  };

  //todo object functions
  const handleCreateObj = (text) => {
    //this function creates an obj
    let obj = {
      name: `item-` + ID,
      Id: ID,
      value: text,
      TimeStamp: new Date().toLocaleDateString(),
      IsSaved: false,
      set_status: () => (obj.IsSaved = true),
    };
    setTodoItems((prevItems) => [...prevItems, obj]);
    setID(ID + 1);
    obj.set_status();
    setIsSaved(true);
  };

  const handleIsOpened = (bool) => {
    setIsOpened(bool);
  };

  const handleSelect = () => {
    let store = TodoItems;
    store.findIndex(
      (item, index) => item.Id === index && setSelected(item.value),
    );
  };

  const HandleReset = () => {
    setID((prevID) => {
      prevID = 0;
      ID++;
    });
  };
  return (
    <>
      <Suspense
        fallback={
          <>
            loading1 <span className='text-red-500 text-7xl '>.......</span>
          </>
        }>
        <div className='flex w-[30rem] gap-[10px] my-[2rem] m-auto  py-0 items-center'>
          <Input HandleUpdateProp={HandleUpdate} />
          <button
            className='px-[1rem] hover:bg-slate-200 hover:shadow-neutral-400dow bg-slate-100 rounded-md h-[3.5rem] ring-2 uppercase text-lg '
            onClick={() => {
              if (
                InputValue !== "" &&
                InputValue !== undefined &&
                InputValue !== null
              ) {
                handleCreateObj(InputValue); // Call handleCreateObj if InputValue is not empty, undefined, or null
              }
            }}>
            Add
          </button>
        </div>
        <List
          Todo_store={TodoItems}
          OpenHandler={handleIsOpened}
          handleSelect={handleSelect}
        />
        {IsOpened && (
          <TodoItemViewr
            closeHandler={handleIsOpened}
            selectedItemProp={Selected}
          />
        )}
      </Suspense>
    </>
  );
};

export default memo(TodoApp);
