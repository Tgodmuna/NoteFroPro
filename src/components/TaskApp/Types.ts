//importation types
export type lazyImports = {
  inputs: React.LazyExoticComponent<
    React.MemoExoticComponent<
      ({
        HandleUpdateProp,
      }: {
        HandleUpdateProp: (value: string) => void;
      }) => React.JSX.Element
    >
  >;

  list: React.LazyExoticComponent<
    React.MemoExoticComponent<
      ({
        identity,
        Task_store,
        OpenHandler,
        handleSelect,
      }: {
        Task_store: {
          store: TaskType;
          DeleteTaskData: (itemToDelete: number) => void;
        };
        OpenHandler: (
          bool: boolean | ((prevState: boolean) => boolean),
        ) => void;
        handleSelect: any;
        identity: any;
      }) => React.JSX.Element
    >
  >;

  TaskItemviewer: React.LazyExoticComponent<
    React.MemoExoticComponent<
      ({
        closeHandler,
        selectedItemProp,
      }: {
        closeHandler: any;
        selectedItemProp: any;
      }) => React.JSX.Element
    >
  >;
};

// types for Task
export type TaskType = {
  name: string;
  Id: number;
  value: string|undefined
  TimeStamp: string;
  IsSaved: boolean;
  set_status: () => boolean;
}[];

//taskInput prop Type
export type InputPropType = {
  HandleUpdateProp: (value: string) => void;
};

//taskListProps type
export type listProps = {
  Task_store: {
    store: TaskType;
    DeleteTaskData: (itemToDelete: number) => void;
  };
  OpenHandler: (bool: boolean | ((prevState: boolean) => boolean)) => void;
  handleSelect: (id: any) => void;
};