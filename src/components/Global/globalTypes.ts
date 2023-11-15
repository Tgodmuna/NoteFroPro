import { StateType } from "../../App";

//localstorage Types
export type localStorageType = string | null;

//NotelenType
export type notelentype = { key: string | null; item: string | null }[];

//welcomeComponentProptype
export type welcomePropType = {
  TaskLEN: number;
  Notelen: notelentype;
};

//notelistpropType
export type notelistpropType = {
  store: notelentype;
  EditNoteProp: (editText: string) => void;
};

export type AppContextType = {
  Auth: (data: Omit<StateType, "Email" | "fullname">) => void;
  fullname: string;
  username: string;
  Email: string;
  password: string | number;
};
