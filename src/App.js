import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import DashBoard from "./components/Global/DashBoard";
import { Forms } from "./components/Global/Forms";
export const AppContext = React.createContext();

function App() {
  const [AppState, setAppState] = useState({
    Fname: "",
    username: "",
    Email: "",
    password: "",
  });
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  //retrieve the form data from Form component.
  //this function was passed as a callback function to form component.
  const GetSignUpData = useCallback((data) => {
    setAppState(data);
  }, []);

  //serialize the Appstate and save in the local storage to persist
  useEffect(() => {
    if (
      AppState.Email !== "" &&
      AppState.Fname !== "" &&
      AppState.username !== "" &&
      AppState.password !== ""
    ) {
      localStorage.setItem("AppState", JSON.stringify(AppState));
    }
  }, [AppState]);

  //retrieve the login data from logIn component.
  //this function was provided to the component using Context API
  const Auth = (data) => {
    if (
      data.username === AppState.username &&
      data.password === AppState.password
    ) {
      setIsLoggedIn(true);
    } else {
      alert("username or password do not match");
    }
  };

  //deserialize the appstate so that it can be used in the context provider
  useEffect(() => {
    const RetrievedData = localStorage.getItem("AppState");
    if (RetrievedData) {
      const parsed = JSON.parse(RetrievedData);
      setAppState(parsed);
    }
  }, []);

  return (
    <AppContext.Provider value={{ ...AppState, Auth }}>
      <div className='App'>
        {IsLoggedIn ? <DashBoard /> : <Forms get={GetSignUpData} />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
