import React, { useContext } from "react";
import { AppContext } from "../../App";

function Profile() {
  let AppState = useContext(AppContext);
  const { email, username, fullname } = AppState;
  console.log("from profile", AppState);
  return (
    <div className='profile-container w-[50vw] m-auto PriColor h-[45vw] shadow-2xl shadow-slate-500 my-3 rounded-lg p-[2rem]'>
      <div className='profile-header text-white p-4'>
        <h2 className='text-4xl uppercase font-bold font-sans my-3'>
          {" "}
          Profile
        </h2>
      </div>
      <div className='profile-content p-[1rem] bg-slate-200 w-[35rem] bg-opacity-10 rounded-md m-auto shadow-2xl shadow-slate-100 '>
        <div className='profile-info flex flex-col gap-10 h-[35rem] w-full '>
          <h3 className='text-2xl font-bold mt-2 uppercase text-slate-100 '>
            User Information
          </h3>
          <hr />

          <p className='text-gray-400 text-2xl'>
            <strong>UserName:</strong>{" "}
            <span className='text-xl text-white '>{username}</span>
          </p>
          <p className='text-gray-400 text-2xl'>
            <strong>FullName:</strong>
            <span className='text-xl text-white '>{fullname}</span>
          </p>

          <p className='text-gray-400 text-2xl'>
            <strong>Email:</strong>
            <span className='text-xl text-white '>{email}</span>
          </p>
          <p></p>
        </div>
        <div className='profile-settings mt-4'>
          <h3 className='text-xl font-semibold mb-2 text-slate-200'>
            Profile Settings
          </h3>
          <button className='bg-blue-500 text-white rounded px-4 py-2 mr-2 hover:bg-blue-900 uppercase'>
            Edit Profile
          </button>
          <button className='bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-900 uppercase'>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
