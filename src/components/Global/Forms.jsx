import React, { memo, useContext, useState } from "react";
import { AppContext } from "../../App";

const Forms = memo(({ get }) => {
  const [state, setstate] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [IsActive, setIsActive] = useState(true);
  const [Tab, setTab] = useState(0);

  function handleInput(e) {
    const { value, name } = e.target; //extracts  name and value from the object(element) that calls or invoked this function
    setstate((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.fullname !== "" && state.username !== "" && state.email !== "") {
      const ParsedData = JSON.parse(localStorage.getItem("AppState"));
      if (
        !ParsedData ||
        (ParsedData.username !== state.username &&
          ParsedData.email !== state.email)
      ) {
        get(state);
        alert(
          "hoolayyy...! \n account created. you will be navigated \n to signIn page  to Login ",
        );
        setstate((prev) => {
          return {
            ...prev,
            fullname: "",
            username: "",
            email: "",
            password: "",
          };
        });
        handleTAB(1, false);
      } else {
        alert("user with same username and email already exist");
        setstate((prev) => {
          return {
            ...prev,
            username: "",
            email: "",
          };
        });
      }
    }
  }

  function handleTAB(value, bool) {
    setTab(value);
    setIsActive(bool);
  }

  function hideLabel() {
    const label = document.getElementsByTagName("label");
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value !== "" || null || undefined) {
        label[i].style.visibility = "hidden";
      } else {
        label[i].style.visibility = "visible";
      }
    }
  }

  // signUp jsx
  return (
    <div className='PriColor w-fit m-auto p-3 pb-4 mt-2 rounded-md'>
      {IsActive && Tab === 0 ? (
        <form action=''>
          <div className='holder'>
            <input
              className='inputs peer'
              type='text'
              value={state.fullname}
              name='fullname'
              id='FullName'
              onChange={handleInput}
              onBlur={hideLabel}
            />
            <label htmlFor='FullName' className='float'>
              FullName
            </label>
          </div>

          <div className='holder'>
            <input
              className='inputs peer'
              type='text'
              value={state.username}
              name='username'
              id='userName'
              onChange={handleInput}
              onBlur={hideLabel}
            />
            <label htmlFor='userName' className='float'>
              userName
            </label>
          </div>

          <div className='holder'>
            <input
              className='inputs peer '
              type='email'
              value={state.email}
              name='email'
              id='Email'
              onChange={handleInput}
              onBlur={hideLabel}
            />
            <p className='text-red-900 text-2xl hidden peer-invalid:block'>
              invalid Email
            </p>
            <label htmlFor='Email' className='float'>
              Email
            </label>
          </div>

          <div className='holder'>
            <input
              className='inputs peer'
              type='password'
              value={state.password}
              name='password'
              id='password'
              onChange={handleInput}
              onBlur={hideLabel}
            />
            <label htmlFor='password' className='float'>
              password
            </label>
          </div>

          <button
            type='submit'
            onClick={handleSubmit}
            className='rounded-xl p-[1rem] mt-[-3rem] hover:scale-x-90   px-[2rem] bg-blue-950 hover:bg-blue-700 uppercase font-semibold text-white  text-xl shadow-2xl shadow-teal-900  '>
            submit
          </button>
        </form>
      ) : (
        <>
          <Loggin />
        </>
      )}

      {/* form type selection tab */}
      <div className='w-[25rem] shadow  shadow-blue-950   px-[0.5rem] h-[5rem] mt-[2rem] items-center justify-center rounded-xl m-auto flex border-[1px] border-black  '>
        <button
          onClick={() => handleTAB(1, false)}
          type='button'
          className={` ${
            !IsActive && Tab === 1
              ? " [transform:scaleX(150.4%)] after:content-['✔']  after:text-yellow-500 after:relative after:top-[-1rem] bg-opacity-20 w-[9rem] bg-slate-200  peer"
              : null
          }  btn`}>
          log in
        </button>
        <button
          onClick={() => handleTAB(0, true)}
          type='button'
          className={`btn ${
            IsActive && Tab === 0
              ? " [transform:scaleX(150.4%)] after:content-['✔']  after:text-yellow-500 after:relative after:top-[-1rem] bg-opacity-20    bg-black   peer"
              : null
          } `}>
          Signup
        </button>
      </div>
    </div>
  );
});

// signIn form
const Loggin = memo(() => {
  const [login, setlogin] = useState({ username: "", password: "" });
  const AppState = useContext(AppContext);
  const { Auth } = AppState;

  function hideLabel() {
    const label = document.getElementsByTagName("label");
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value !== "" || null || undefined) {
        label[i].style.visibility = "hidden";
      } else {
        label[i].style.visibility = "visible";
      }
    }
  }

  function handleInput(e) {
    const { value, name } = e.target; //extracts  name and value from the object(element) that calls or invoked this function
    setlogin((prevState) => {
      return {
        ...prevState,
        [name]: value, //use the extracted name and value to update the state
      };
    });
  }
  return (
    <form className='PriColor w-fit m-auto  h-[30rem] rounded-md '>
      <div className='holder '>
        <input
          className='inputs peer'
          type='text'
          value={login.username}
          name='username'
          id='userName'
          onChange={handleInput}
          onBlur={hideLabel}
        />
        <label htmlFor='userName' className='float'>
          userName
        </label>
      </div>

      <div className='holder'>
        <input
          className='inputs peer '
          type='password'
          value={login.password}
          name='password'
          id='password'
          onChange={handleInput}
          onBlur={hideLabel}
        />
        <label htmlFor='password' className='float'>
          password
        </label>
      </div>

      <button
        onClick={(e) => {
          if (login.username !== "" && login.password !== "") {
            Auth(login);
          }
          e.preventDefault();
        }}
        type='submit'
        className='rounded-xl p-[1rem] mt-[-3rem] hover:scale-x-90   px-[2rem] bg-blue-950 hover:bg-blue-700 uppercase font-semibold text-white  text-xl shadow-2xl shadow-teal-900  '>
        submit
      </button>
    </form>
  );
});

export { Loggin, Forms };
