import { useState } from "react";
import "./App.css";
import MainApp from "./components/Global/MainApp";
function App() {
  const [state, setstate] = useState({
    Fname: "",
    Sname: "",
    Email: "",
    password: undefined,
  });
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='App'>
      <MainApp />
      {/* <TodoApp /> */}
    </div>
  );
}

export default App;
