import axios from "axios";
//vezan uz konkretni backend
let Service = axios.create({
  baseURL: "https://stranded-away.herokuapp.com/",
  //baseURL: "http://localhost:3000/",
  timeout: 1000,
});
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
    console.log(error);
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
  updateToken(userData) {
    return Service.post("user/token", userData);
  },
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
  changeUserPassword(userData) {
    return Service.patch("user/password", userData);
  },
  changeUserUsername(userData) {
    return Service.patch("user/username", userData);
  },
  changeUserEmail(userData) {
    return Service.patch("user/email", userData);
  },
  async getImage() {
    return await Service.get("image");
  },
  state: {
    get authenticated() {
      return Auth.authenticated();
    },
  },
};

export { Storage, Auth };
