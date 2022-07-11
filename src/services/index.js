import axios from "axios";
//vezan uz konkretni backend
let Service = axios.create({
  baseURL: "https://stranded-away.herokuapp.com/",
  timeout: 1000,
});
console.log(Service);
// prije svakog poslanog requesta na backend izvrši:
Service.interceptors.request.use((request) => {
  let token = Auth.getUserToken();
  try {
    request.headers["Authorization"] = "Bearer " + token;
  } catch (e) {
    console.error(e);
  }
  return request;
});
/*
Service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      Auth.signOut();
    }
  }
);
*/

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
  signOut() {
    localStorage.removeItem("user");
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  getUserToken() {
    let user = this.getUser();
    console.log(user);
    if (user && user.token) return user.token;
    else return false;
  },
  authenticated() {
    let user = Auth.getUser();
    if (user && user.token) {
      return true;
    } else return false;
  },
  getUserData() {
    let user = this.getUser();
    let userData = {
      username: user.username,
      email: user.email,
      //Plus profile picture treba dodati
    };
    return userData;
  },
  state: {
    get authenticated() {
      return Auth.authenticated();
    },
  },
};

export { Storage, Auth };
