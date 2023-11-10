import React, { Suspense, useCallback, useEffect, useState } from "react";
import { TaskType, lazyImports } from "./TaskTypes";
//dynamic importations
const List: lazyImports['list'] = React.lazy(() => import("./TaskList"));
const Input = React.lazy(() => import("./TaskInput"));
const LazyTaskItemViewer: lazyImports['TaskItemviewer'] = React.lazy(() => import("./TaskItemViewer"));

//Task main Components
const TaskApp = () => {
  const [InputValue, setInputValue] = useState("");
  const [IsOpened, setIsOpened] = useState(false);
  const [Selected, setSelected] = useState<string>();
  let [ID, setID] = useState(0);
  //Task Store
  const [TaskItemStore, setTaskItemStore] = useState<TaskType>([]);

  //call back function to update inputValue state with prop value from Taskinput Component
  const HandleUpdate = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  // Retrieve and deserialize data from local storage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("TaskData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setTaskItemStore(parsedData);
    }
  }, []);

  // Function to save the TaskItemStore in local storage
  const saveTaskData = (data: TaskType) => {
    localStorage.setItem("TaskData", JSON.stringify(data));
  };

  const DeleteTaskData = (itemToDelete: number) => {
    // Retrieve and deserialize data from local storage when you want to delete Task Item
    const StoredData = localStorage.getItem("TaskData");
    if (StoredData) {
      const deserializeData: TaskType = JSON.parse(StoredData);
      const deletedItem = deserializeData.filter(
        (item) => item.Id !== itemToDelete,
      );
      setTaskItemStore([...deletedItem]);
      saveTaskData(deletedItem);
    }
  };

  //Task object functions
  const handleCreateObj = useCallback(
    (text: string) => {
      const uniq = () => parseInt(Math.random().toFixed(2));
      let obj = {
        name: `item-${ID}`,
        Id: uniq(),
        value: text,
        TimeStamp: new Date().toLocaleDateString(),
        IsSaved: false,
        set_status: () => (obj.IsSaved = true),
      };
      setTaskItemStore((prevItems) => [...prevItems, obj]);
      obj.set_status();
      setID(ID + 1);
      // Save the updated TaskItemStore in local storage
      saveTaskData([...TaskItemStore, obj]);
    },
    [ID, TaskItemStore],
  );

  const memoizedIsOpened = (bool: boolean | ((prevState: boolean) => boolean)): void => {
    setIsOpened(bool);
  };

  //this function handles selection of item from the list to converts to PDF
  const HandleSelect: (id: number) => void = useCallback(
    (id: number) => {
      let store = TaskItemStore;
      let picked = store.find((item) => item.Id === id)!
      if (picked) setSelected(picked.value)
    },
    [TaskItemStore],
  );

  return (
    <Suspense fallback={<>loading........</>}>
      {" "}
      <div>
        {/* input form */}
        <div className='flex w-[30rem] bg-slate-300 rounded justify-between  my-[2rem] m-auto items-center'>
          <Input HandleUpdateProp={HandleUpdate} />
          <button
            type="button"
            className=' m-2  border PriColor text-xl text-white hover:scale-75 font-semibold ring-cyan-300 p-3 rounded-md '
            onClick={() => {
              if (InputValue !== "" && InputValue !== undefined) {
                handleCreateObj(InputValue); // Call handleCreateObj if InputValue is not empty, undefined, or null
              }
            }}>
            Add Task
          </button>
        </div>

        {/* Tasklist */}
        <List
          identity={{ ID: ID, IDsetter: setID }}
          Task_store={{ store: TaskItemStore, DeleteTaskData: DeleteTaskData }}
          OpenHandler={memoizedIsOpened}
          handleSelect={HandleSelect}
        />

        {/* itemViewer */}
        {IsOpened && (
          <LazyTaskItemViewer
            closeHandler={memoizedIsOpened}
            selectedItemProp={Selected}
          />
        )}
      </div>
    </Suspense>
  );
};

export default TaskApp;
