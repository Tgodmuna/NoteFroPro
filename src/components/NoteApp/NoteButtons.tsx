import React from "react";

type BGbtnPropType = {
  closeColorBTNs: () => void
  ChangeBG: (colorName: string) => void
}

const BGbtn = ({ closeColorBTNs, ChangeBG }: BGbtnPropType) => {
  const colorNames = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "teal",
    "cyan",
    "brown",
    "gray",
    "lightgray",
    "darkred",
    "navy",
    "olive",
    "lime",
    "maroon",
    "fuchsia",
    "silver",
    "black",
  ];

  return (
    <div
      className={`w-[25vw] h-[13rem]  z-20 flex-wrap bg-black bg-opacity-40 shadow-lg  flex p-[1rem] rounded-xl absolute bottom-[10rem] left-[5rem]`}
      onMouseLeave={closeColorBTNs}>
      {colorNames.map((color, index) => (
        <button
          className='p-2 m-1 border-2 border-black rounded-lg  hover:bg-slate-50 shadow-xl '
          onClick={() => ChangeBG(color)}
          key={index}
          style={{ backgroundColor: color }}>
          {color}
        </button>
      ))}
    </div>
  );
};


const Menu = () => {
  return (
    <div
      // onMouseLeave={ }
      className=' border-black absolute w-fit  top-[30px] left-[70px] h-auto rounded-lg  z-10 p-4   bg-black bg-opacity-40   shadow-xl shadow-slate-500  '>
      <ul className='w-auto  flex  items-center justify-center divide-x-2 divide-blue-100 flex-wrap '>
        <li className='capitalize font-bold text-lg text-slate-400 hover:bg-slate-100 transition my-2 p-1  hover:rounded  hover:text-black hover:italic '>
          save As
        </li>
        <li className='capitalize font-bold text-lg text-slate-400 hover:bg-slate-100 transition my-2 p-1  hover:rounded  hover:text-black hover:italic '>
          save
        </li>
        <li className='capitalize font-bold text-lg text-slate-400 hover:bg-slate-100 transition my-2 p-1  hover:rounded  hover:text-black hover:italic '>
          open File
        </li>
        <li className='capitalize font-bold text-lg text-slate-400 hover:bg-slate-100 transition my-2 p-1  hover:rounded  hover:text-black hover:italic '>
          new file
        </li>
      </ul>
    </div>
  );
};

export {
  Menu,
  BGbtn,
};
