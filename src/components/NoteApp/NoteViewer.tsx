import React from "react";

const NoteViewer = ({ Hovered }: { Hovered: string | null }) => {
  return (
    <div className='p-2 absolute bottom-[50rem] right-[22rem] bg-slate-500 w-[10rem] text-ellipsis overflow-hidden h-auto bg-opacity-40 rounded-lg border border-slate-20 text-xl '>
      {Hovered}
    </div>
  );
};

export default NoteViewer;
