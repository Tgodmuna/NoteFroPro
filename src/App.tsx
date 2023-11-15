import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import DashBoard from "./components/Global/DashBoard";
import { Forms } from "./components/Global/Forms";
import { AppContextType } from "./components/Global/globalTypes";
export const AppContext = React.createContext<AppContextType | undefined>(undefined);

//app state types
export type StateType = {
  fullname: string;
  username: string;
  Email: string;
  password: string | number;
};

function App() {
  const [AppState, setAppState] = useState<StateType>({
    fullname: "",
    username: "",
    Email: "",
    password: "",
  });
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  //OncomponentMount,if userToken exists, signin the user
  useEffect(() => {
    const Token = sessionStorage.getItem("userToken");
    if (Token) setIsLoggedIn(true);
  }, [IsLoggedIn]);

  //log out user
  const logout = () => {
    sessionStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  //retrieve the form data from Form component.
  //this function was passed as a callback function to form component.
  const GetSignUpData = useCallback((data: StateType) => {
    setAppState(data);
  }, []);

  //serialize the Appstate and save in the local storage
  // to persist after closing browser or tab
  useEffect(() => {
    if (
      AppState.Email !== "" &&
      AppState.fullname !== "" &&
      AppState.username !== "" &&
      AppState.password !== ""
    ) {
      localStorage.setItem("AppState", JSON.stringify(AppState));
    }
  }, [AppState]);

  //unique token generator for user session management;
  function UniqueToken(length: number) {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }

  //retrieve the login data from logIn component.
  //this function was provided to the component using Context API
  //this function authenticates user sign in
  const Auth = (data: Omit<StateType, 'Email' | 'fullname'>) => {
    if (
      data.username === AppState.username &&
      data.password === AppState.password
    ) {
      const Token = UniqueToken(50);
      sessionStorage.setItem("userToken", Token);
      setIsLoggedIn(true);
    } else {
      alert("userName or password not correct ");
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
        {IsLoggedIn ? (
          <DashBoard Logout={logout} />
        ) : (
          <Forms get={GetSignUpData} />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
