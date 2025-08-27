import axios from "axios";

const apiUrl = 'http://localhost:5001'


export async function addCommentaire(userData) {
    return await axios.post(`${apiUrl}/commentaire/addCommentaire`, userData);
}


export async function getAllComments() {
    return await axios.get(`${apiUrl}/commentaire/getAllComments`);}









