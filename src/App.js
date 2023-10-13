import { useState } from "react";
import "./App.css";
import MainApp from "./components/Global/MainApp";
import NoteEditor from "./components/NoteApp/NoteEditor";

function App() {
  const [state, setstate] = useState({
    Fname: "",
    Username: "",
    Email: "",
    password: undefined,
  });
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='App'>
      {/* <MainApp /> */}
      <NoteEditor />
    </div>
  );
}

export default App;
