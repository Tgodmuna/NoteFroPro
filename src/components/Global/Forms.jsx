import React, { useState } from "react";

const Forms = () => {
  const [state, setstate] = useState({ fullname: "", username: "", email: "" });
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
    <div>
      {IsActive && Tab === 0 ? (
        <form action='' onSubmit={handleSubmit}>
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
          <button
            type='submit'
            className='rounded-xl p-[1rem] px-[2rem] bg-teal-200 hover:bg-teal-400 font-bold text-xl shadow-2xl shadow-teal-900  '>
            submit
          </button>
        </form>
      ) : (
        <>
          <Loggin />
        </>
      )}

      {/* form type selection tab */}
      <div className='w-[25rem] shadow bg-slate-200  shadow-blue-950   px-[0.5rem] h-[5rem] mt-[2rem] items-center justify-center rounded-xl m-auto flex border-[1px] border-black  '>
        <button
          onClick={() => handleTAB(1, false)}
          type='button'
          className={` ${
            !IsActive && Tab === 1
              ? " [transform:scaleX(150.4%)] after:content-['✔']  after:text-yellow-500 after:relative after:top-[-1rem] bg-opacity-20    bg-black   peer"
              : null
          }  btn`}>
          signIn
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
};

// signIn form
const Loggin = () => {
  const [login, setlogin] = useState({ username: "", password: "" });

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
    <form>
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
          type='email'
          value={login.password}
          name='password'
          id='psw'
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

      <button
        onSubmit={() => {
          "";
        }}
        type='submit'
        className='rounded-xl p-[1rem] px-[2rem] bg-teal-200 hover:bg-teal-400 font-bold text-xl shadow-2xl shadow-teal-900  '>
        submit
      </button>
    </form>
  );
};

export { Loggin, Forms };
