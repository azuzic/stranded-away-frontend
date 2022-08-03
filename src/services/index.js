import axios from "axios";
//vezan uz konkretni backend
let Service = axios.create({
  baseURL: "https://macroquiet.herokuapp.com/",
  //baseURL: "http://localhost:3000/",
  timeout: 30000,
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
    return Service.post("user", userData);
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
  async getUserDataFromDB() {
    let user = this.getUser();
    return await Service.get(`user?username=${user.username}`);
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
  changeUserProfileCoverImage(userData) {
    return Service.patch("user/profile/coverImage", userData);
  },
  changeUserProfileAvatarImage(userData) {
    return Service.patch("user/profile/avatarImage", userData);
  },
  async postImage(imageData) {
    return await Service.post("upload/image", imageData);
  },
  async getImage(imageID) {
    return await Service.get(`download/image?id=${imageID}`);
  },
  async removeImage(imageID) {
    return await Service.delete(`remove/image?id=${imageID}`);
  },
  state: {
    get authenticated() {
      return Auth.authenticated();
    },
  },
};

export { Storage, Auth };
