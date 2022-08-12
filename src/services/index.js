import axios from "axios";
//vezan uz konkretni backend
let Service = axios.create({
  //baseURL: "https://macroquiet.herokuapp.com/",
  baseURL: "http://localhost:3000/",
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
  //GET CURRENT USER
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  //Get user from localStorage
  getCurrentUserData() {
    let user = this.getCurrentUser();
    let currentUserData = {
      username: user.username,
      email: user.email,
      admin: user.admin,
    };
    return currentUserData;
  },
  async getUserDetails(username) {
    return await Service.get(`user?username=${username}`);
  },
  //REGISTRATION AND AUTHENTICATION
  registerUser(userData) {
    return Service.post("user", userData);
  },
  authenticateUser(userData) {
    return Service.post("auth/web", userData);
  },
  authenticated() {
    let user = Auth.getCurrentUser();
    if (user && user.token) {
      return true;
    } else return false;
  },
  signOut() {
    localStorage.removeItem("user");
  },
  //TOKEN
  getUserToken() {
    let user = this.getCurrentUser();
    if (user && user.token) return user.token;
    else return false;
  },
  updateToken(userData) {
    return Service.post("user/token", userData);
  },
  //CHANGE USER DATA
  changeUserUsername(userData) {
    return Service.patch("user/username", userData);
  },
  changeUserPassword(userData) {
    return Service.patch("user/password", userData);
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
  //IMAGE MANIPULATION
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
