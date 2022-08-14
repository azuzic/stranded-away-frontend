import axios from "axios";
let Service = axios.create({
  //baseURL: "https://macroquiet.herokuapp.com/",
  baseURL: "http://192.168.5.24:3000/",
  timeout: 30000,
});
//Before each sent request to the backend, send the Token in the header:
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
let Auth = {
  //Get/delete current user from localStorage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  signOut() {
    localStorage.removeItem("user");
  },
  //Extract user data from local storage
  getCurrentUserData() {
    let user = this.getCurrentUser();
    let currentUserData = {
      username: user.username,
      email: user.email,
      admin: user.admin,
    };
    return currentUserData;
  },
  //Get all user data from database
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

  //TOKEN
  getUserToken() {
    let user = this.getCurrentUser();
    if (user && user.token) return user.token;
    else return false;
  },
  /*updateToken(userData) {
    return Service.post("user/token", userData);
  },*/
  //CHANGE USER DATA
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
  currentUser: {
    get getCurrentUserData() {
      return Auth.getCurrentUserData();
    },
  },
};

export { Auth };
