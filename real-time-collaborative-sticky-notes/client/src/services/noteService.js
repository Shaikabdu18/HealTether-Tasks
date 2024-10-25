import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

export const getNotes = () => axios.get(API_URL);
export const createNote = (content, position) => axios.post(API_URL, { content, position });
export const updateNote = (id, position) => axios.put(`${API_URL}/${id}`, { position });
export const deleteNote = (id) => axios.delete(`${API_URL}/${id}`);
