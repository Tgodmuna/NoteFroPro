const openDataBase = indexedDB.open("TODO_STORE", 1);

openDataBase.onsuccess = (e) => {
  const DB = e.target.result;
  alert("Database created successfully");

  const usersStore = DB.createObjectStore("TODOlist", {
    keyPath: "Id",
    autoIncrement: true,
    unique: true,
  });

  //create a transaction
  const Trans1 = DB.transaction("usersStore", "readwrite");
  const newData = { id: 1, name: "John Doe" };
  let ObjTrans1 = Trans1.objectStore(usersStore).add(newData);

  ObjTrans1.onsuccess = (e) => {
    let yeld = e.target.result;
    const key = yeld;
    console.log(key);
  };
};
