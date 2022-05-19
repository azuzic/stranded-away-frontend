import axios from "axios";
//vezan uz konkretni backend
let Service = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 1000,
});

//Vezani uz pojedine rute
let Storage = {
  getAll(data) {
    return Service.get(`storage?data=${data}`);
  },
};
let Auth = {
  registerUser(userData) {
    return Service.post("users", userData);
  },
  authenticateUser(userData) {
    return Service.post("auth", userData);
  },
};

export { Storage, Auth };
