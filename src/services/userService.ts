// services/userService.js
import axios from "@/lib/axios";

export const getUsers = () => axios.get("/users");
