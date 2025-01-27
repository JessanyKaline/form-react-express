import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3030/api",
});

export const fetchUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (user: {
  name: string;
  email: string;
  cep: string;
}) => {
  const response = await api.post("/users", user);
  return response.data;
};

export const updateUser = async (
  id: number,
  user: { name: string; email: string; cep: string }
) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export default api;
