import React, { useState, useCallback, useEffect } from "react";
import { getAllUsers, updateProfile } from "Service/ApiUser";

// components
export default function CardSettings() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    firstname: "",
    lastname: "",
    password: "",
    user_image: ""
  });

  const getUsers = useCallback(async () => {
    await getAllUsers().then((res => {
      console.log(res.data.usersList);
      setUsers(res.data.usersList);

      // 👉 récupérer l'utilisateur connecté (ex via localStorage)
      const userId = localStorage.getItem("userId");
      const foundUser = res.data.usersList.find(u => u._id === userId);
      if (foundUser) setCurrentUser(foundUser);
    }))
  }, []);

  useEffect(() => { getUsers() }, [getUsers]);

  // gestion changement des champs
  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  // gestion fichier
  const handleFileChange = (e) => {
    setCurrentUser({ ...currentUser, image: e.target.files[0] });
  };

  // mise à jour du profil
  const handleUpdateProfile = async () => {
    try {
      let formData = new FormData();
      formData.append("firstname", currentUser.firstname);
      formData.append("lastname", currentUser.lastname);
      formData.append("password", currentUser.password);
      if (currentUser.image instanceof File) {
        formData.append("user_image", currentUser.image);
      }

      await updateProfile(currentUser._id, formData);
      getUsers();
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de la mise à jour !");
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">user account</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    firstname
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={currentUser.firstname}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    lastname
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={currentUser.lastname}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={currentUser.password}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Picture 
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    choisir un fichier 
                  </label>
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <button
                    onClick={handleUpdateProfile}
                    type="button"
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
