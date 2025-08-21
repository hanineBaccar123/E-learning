import axios from "axios";

const apiUrl = 'http://localhost:5001'
export async function getAllUsers() {
    return await axios.get(`${apiUrl}/users/getAllUsers`);
}


export async function deleteUser(id) {
    return await axios.delete(`${apiUrl}/users/deleteUserById/${id}`);
}

export async function addUser(userData) {
    return await axios.post(`${apiUrl}/users/addClient`, userData);
}
export async function addUserWithImage(formData) {
    return await axios.post(`${apiUrl}/users/addClientWithImage`, formData,{
        headers: {'content-type': 'mutipart/form-data'}, 
        withCredentials: true,
    });
}
export async function updateUser(id,userData) {
    return await axios.put(`${apiUrl}/users/updateUser/68a4beb83c6699204355f88c`, userData);
}

export async function loginUser(userData){
    return await axios.post(`${apiUrl}/login`,userData);
}








