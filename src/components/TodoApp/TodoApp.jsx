import React, { Suspense, useCallback, useState } from "react";
//dynamic importations
const List = React.lazy(() => import("./TodoList"));
const Input = React.lazy(() => import("./TodoInput"));
const TodoItemViewr = React.lazy(() => import("./TodoItemViewer"));

//Todo main Components
const TodoApp = () => {
  const [InputValue, setInputValue] = useState("");
  const [IsSaved, setIsSaved] = useState(false);
  const [IsOpened, setIsOpened] = useState(false);
  const [Selected, setSelected] = useState(undefined);
  let [ID, setID] = useState(0);
  //todo Store
  const [TodoItemStore, setTodoItemStore] = useState([]);

  //call back function to update inputValue state with prop value from Todoinput Component
  const HandleUpdate = useCallback((value) => {
    setInputValue(value);
  },[]);

  //todo object functions
  const handleCreateObj = useCallback((text) => {
    //this function creates todo obj
    const uniq = () => Math.random().toFixed(2);
    let obj = {
      name: `item-${ID}`,
      Id: uniq(),
      value: text,
      TimeStamp: new Date().toLocaleDateString(),
      IsSaved: false,
      set_status: () => (obj.IsSaved = true),
    };
    setTodoItemStore((prevItems) => [...prevItems, obj]);
    obj.set_status();
    setIsSaved(true);
    setID(ID + 1);
  },[ID])

  const memoizedIsOpened = (bool) => {
    setIsOpened(bool);
  };

  //this function handles selection of item from the list to converts to PDF
  const HandleSelect = useCallback((id) => {
    let store = TodoItemStore;
    let picked = store.find((item) => item.Id === id);
    setSelected(picked.value);
  },[TodoItemStore])

  return (
    <>
      <Suspense
        fallback={
          <>
            loading1 <span className='text-red-500 text-7xl '>.......</span>
          </>
        }>
        {/* input form */}
        <div className='flex w-[30rem] gap-[10px] my-[2rem] m-auto  py-0 items-center'>
          <Input HandleUpdateProp={HandleUpdate} />
          <button
            className='px-[1rem] hover:bg-slate-200 hover:shadow-neutral-400dow bg-slate-100 rounded-md h-[3.5rem] ring-2 uppercase text-lg '
            onClick={() => {
              if (InputValue !== "" && InputValue !== undefined) {
                handleCreateObj(InputValue); // Call handleCreateObj if InputValue is not empty, undefined, or null
              }
            }}>
            Add
          </button>
        </div>

        {/* todolist */}
        <List
          identity={{ ID: ID, IDsetter: setID }}
          Todo_store={{ store: TodoItemStore, storeSetter: setTodoItemStore }}
          OpenHandler={memoizedIsOpened}
          handleSelect={HandleSelect}
        />

        {/* itemViewer */}
        {IsOpened && (
          <TodoItemViewr
            closeHandler={memoizedIsOpened}
            selectedItemProp={Selected}
          />
        )}
      </Suspense>
    </>
  );
};

export default TodoApp;
