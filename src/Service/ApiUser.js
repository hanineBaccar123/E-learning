import axios from "axios";

const apiUrl = 'https://688a8bb92a52cabb9f4e796d.mockapi.io/'
export async function getAllUsers() {
    return await axios.get(`${apiUrl}/users`);
}

export async function getOrderAllUsersByAge() {
    return await axios.get(`${apiUrl}/getOrderAllUsersByAge`);
}

export async function deleteUser(id) {
    return await axios.delete(`${apiUrl}/users/${id}`);
}

export async function addUser(userData) {
    return await axios.post(`${apiUrl}/users`, userData);
}
export async function addUserWithImage(formData) {
    return await axios.post(`${apiUrl}/users`, formData,{
        headers: {'content-type': 'mutipart/form-data'}, 
        withCredentials: true,
    });
}
export async function updateUser(id,userData) {
    return await axios.put(`${apiUrl}/users/${id}`, userData);
}

export async function loginUser(userData){
    return await axios.post(`${apiUrl}/login`,userData);
}








