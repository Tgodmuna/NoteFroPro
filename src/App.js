import { useState } from "react";
import "./App.css";
import DashBoard from "./components/Global/DashBoard";

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
      <DashBoard />
    </div>
  );
}

export default App;
