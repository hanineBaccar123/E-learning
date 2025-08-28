import React from "react";
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";



// components

import { getAllUsers,updateUser ,addUserWithImage,deleteUser} from "Service/ApiUser";





export default function CardTable({ color }) {

  const [users, setUsers] = useState([]);
  const[isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [newUser, setNewUser] = useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    role:"",
    user_image:"",
  
});

const handlechange= (e)=>{
  const {name,value }=e.target;
  setNewUser({...newUser, [name]:value})
  console.log(newUser)

};
  


 let formData= new FormData();

  const getUsers = useCallback(async () => {
    await getAllUsers().then((res => {
      console.log(res.data.usersList);
      setUsers(res.data.usersList);
    }))

  }, []);
  useEffect(() => { getUsers() }, [getUsers]);

  //const handleAddNewUser = async (newUser)=>{
    //try{
     // await addUser(newUser)
      //getUsers()
     // console.log("user added")

    //}catch (error){
      //console.log(error)
    //}
  //}//;

  const [image , setImage]= useState("")

  const handleFile = (e)=>{

  setImage(e.target.files[0])
  console.log(image)
};


 
   const handleAddNewUserWithImage = async (newUser)=>{

    try{
      formData.append("firstname",newUser.firstname)
      formData.append("lastname",newUser.lastname)
      formData.append("email",newUser.email)
      formData.append("password",newUser.password)
      formData.append("role",newUser.role)
      formData.append("user_image",image,`${newUser.firstname}.png`)
      await addUserWithImage(formData);
      getUsers();

    }catch (error){
      console.log(error)
    }
  };

  const handelDelete = async (id) =>{
    try {
      await deleteUser(id)
      getUsers()
      console.log("user deleted")

    }catch (error) {
      console.log(error)
    }
  };


  const handelUpdateUser = async (newUser)=>{
    try{
      await updateUser(newUser._id,newUser)
      getUsers()
      setIsModalOpen(false)
      console.log("user updated")


    }
catch(error) {
  console.log(error)
}
  }

  const filteredUsers = users.filter((user) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return [user.firstname, user.lastname, user.email, user.role]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(q));
  });

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">

          <div className="flex flex-wrap items-center justify-between">
            

             

            
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                User Account
              </h3>
            </div>
             <div className="px-4 mt-2 mb-2 md:mt-0 md:mb-0 md:ml-8 md:mr-6">
               <input
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Rechercher..."
                 className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded shadow focus:outline-none focus:ring w-72 md:w-80 ease-linear transition-all duration-150"
               />
             </div>
             <button className="ml-4 md:ml-0  mr-2 bg-lightBlue-500 hover:bg-lightBlue-600 text-white font-bold uppercase text-xs px-5 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150" type="button"
                      onClick={()=>{
               setIsModalOpen(true)

             }}>
               Add User
             </button>

               

            
          </div>
          
          {isModalOpen && (
            <div>

          
           <input
                    type="text"
                    name='firstname' 
                    placeholder="firstname"
                    value={newUser.firstname}
                    className="border-0 px-3 py-3 mr-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/4 ease-linear transition-all duration-150"
                    onChange={handlechange}
                  
                  />

                   
                  <input
                    type="text"
                    name='lastname'
                    placeholder="lastname"
                    value={newUser.lastname}
                    className="border-0 px-3 py-3 mr-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/4 ease-linear transition-all duration-150"
                    onChange={handlechange}
                  
                  />
                             <input
                    type="text"
                    name="email"
                    placeholder="your email"
                    value={newUser.email}
                    className="border-0 px-3 py-3 mr-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/4 ease-linear transition-all duration-150"
                       onChange={handlechange}
                  />
                             <input
                    type="number"
                    name="password"
                    placeholder="password"
                    value={newUser.password}
                    className="border-0 px-3 py-3 mr-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/4 ease-linear transition-all duration-150"
                       onChange={handlechange}
                  />



                            <input
                    type="text"
                    name="role"
                    placeholder="choisir role"
                    value={newUser.role}
                    className="border-0 px-3 py-3 mr-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-1/4 ease-linear transition-all duration-150"
                       onChange={handlechange}
                  />
               
                       
                   <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    choisir un fichier 
                  </label>

                   <input type="file" name='user_image' 
                      onChange={handleFile}
                       />

                        <button className="mr-2 bg-lightBlue-500 hover:bg-lightBlue-600 text-white font-bold uppercase text-xs px-5 py-2 rounded shadow outline-none focus:outline-none mb-2 ease-linear transition-all duration-150"
                         type="button"
                         onClick={()=>{
                      
                          handleAddNewUserWithImage(newUser)
                        
                        }}
                         >
                Add User
              </button>

              <button className="ml-50 mr-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase text-xs px-5 py-2 rounded shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={()=>{handelUpdateUser(newUser)

              }}>
                update user
              </button>
              
              <button className="bg-red-500 mr-2 hover:bg-red-600 text-white font-bold uppercase text-xs px-5 py-2 rounded shadow outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>{
                setIsModalOpen(false)

              }}>
                cancel
              </button>
                  </div>

                  
                   )}
              

                   
              
        </div>
        
        
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                 <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  firstName
                </th>

                 <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  lastname
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
                </th>
              
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Password
                </th>

                 <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Role
                </th>
               
                

               
          
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>

                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img
                      src={`http://localhost:5001/images/${user.user_image}`}
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="..."
                    ></img>
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light" ? "text-blueGray-600" : "text-white")
                      }
                    >
                      {user.firstname}

                    </span>
                  </th>
                   <td className="px-6 py-4 text-xs">{user.lastname}</td>

                  
                  <td className="px-6 py-4 text-xs">{user.email}</td>

                  <td className="px-6 py-4 text-xs">{user.password}</td>


                   <td className="px-6 py-4 text-xs">{user.role}</td>


                  
                
                  <td className="whitespace-nowrap">
                    <div className="flex items-center justify-between w-80 md:w-96">
                      <button className="inline-flex px-4 py-2 mr-2 items-center gap-2 bg-lightBlue-500 hover:bg-lightBlue-600 text-white font-semibold uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-lightBlue-300 transition ease-linear duration-150"
                        type="button"
                        onClick={()=>{
                          handelDelete(user._id)
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 100 2h.293l.853 10.236A2 2 0 007.14 18h5.72a2 2 0 001.994-1.764L15.707 6H16a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm-1 6a1 1 0 112 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z" clipRule="evenodd"/></svg>
                        Delete
                      </button>
                      <button className="inline-flex ml-1 items-center gap-2 bg-lightBlue-500 hover:bg-lightBlue-600 text-white font-semibold uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-lightBlue-300 transition ease-linear duration-150"
                        type="button"
                        onClick={()=>{setIsModalOpen(true)
                          setNewUser(user)
                          
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-8.95 8.95a1 1 0 01-.45.263l-3.2.8a.5.5 0 01-.606-.606l.8-3.2a1 1 0 01.263-.45l8.95-8.95z"/><path d="M5 13l2 2"/></svg>
                        update
                      </button>
                    </div>
                  </td>
                </tr>




              ))

              }



            </tbody>

          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};
CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

  