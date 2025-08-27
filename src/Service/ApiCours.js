import axios from "axios";

const apiUrl = 'http://localhost:5001'
export async function getAllCours() {
    return await axios.get(`${apiUrl}/cours/getAllCours`);
}


export async function addCours(userData) {
    return await axios.post(`${apiUrl}/Cours/addCours`, userData);
}








