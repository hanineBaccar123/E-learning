import React from "react";
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";



// components

import { getAllUsers,updateUser ,addUser,addUserWithImage,deleteUser} from "Service/ApiUser";





export default function CardTable({ color }) {

  const [users, setUsers] = useState([]);
  const[isModalOpen, setIsModalOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    role:"student",
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

  const handleAddNewUser = async (newUser)=>{
    try{
      await addUser(newUser)
      getUsers()
      console.log("user added")

    }catch (error){
      console.log(error)
    }
  };

  const [image , setImage]= useState("")

  const handleFile = (e)=>{

  setImage(e.target.files[0])
  console.log(image)
};


 
   const handleAddNewUserWithImage = async (newUser)=>{

    try{
      formData.append("firstName",newUser.firstname)
      formData.append("lastName",newUser.lastname)
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
      await updateUser(newUser.id,newUser)
      getUsers()
      setIsModalOpen(false)
      console.log("user updated")


    }
catch(error) {
  console.log(error)
}
  }

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">

          <div className="flex flex-wrap items-center">
            

             

            
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
             <button className="ml-50 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
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
                       
                   <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    choisir un fichier 
                  </label>

                   <input type="file" name='user_image' 
                      onChange={handleFile}
                       />

                        <button className="mr-2 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150"
                         type="button"
                         onClick={()=>{
                      
                          handleAddNewUserWithImage(newUser)
                        
                        }}
                         >
                Add User
              </button>

              <button className="ml-50 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      onClick={()=>{handelUpdateUser(newUser)
               

              }}>
                update user
              </button>
              
              <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150"
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
               
                

               
          
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
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

                  
                
                  <td>
                     <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>{
                handelDelete(user.id)
              }}>
                delete
              </button>


                   <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>{setIsModalOpen(true)
                setNewUser(user)
                handelUpdateUser(newUser)
                
              }}>
                modifier
              </button>


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

  