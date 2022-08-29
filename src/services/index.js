import axios from "axios";
import * as filestack from "filestack-js";
const filestackClient = filestack.init(process.env.VUE_APP_FILESTACK);

let Service = axios.create({
    baseURL: "https://macroquiet.herokuapp.com/",
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
let Auth = {
    //Get/delete current user from localStorage
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    },
    logOut() {
        localStorage.removeItem("user");
    },
    //Extract user data from local storage, without token
    getCurrentUserData() {
        let user = this.getCurrentUser();
        let currentUserData = {
            username: user.username,
            email: user.email,
            admin: user.admin,
        };
        return currentUserData;
    },

    //Get ALL user data from database (including profile picture and settings)
    async getUserDetails(username) {
        return await Service.get(`users/${username}`);
    },

    //REGISTRATION AND AUTHENTICATION
    registerUser(userData) {
        return Service.post("users", userData);
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

    //CHANGE USER DATA
    changeUserPassword(passwordData) {
        return Service.patch(
            `users/${this.currentUser.username}/password`,
            passwordData
        );
    },
    changeUserEmail(userData) {
        return Service.patch(
            `users/${this.currentUser.username}/email`,
            userData
        );
    },
    changeUserProfileDescription(description) {
        return Service.patch(
            `users/${this.currentUser.username}/profile/description`,
            description
        );
    },
    changeUserProfileCoverImage(imageID) {
        return Service.patch(
            `users/${this.currentUser.username}/profile/coverImage`,
            imageID
        );
    },
    changeUserProfileAvatarImage(imageID) {
        return Service.patch(
            `users/${this.currentUser.username}/profile/avatarImage`,
            imageID
        );
    },

    //IMAGE MANIPULATION
    postImage(imageData) {
        return Service.post("images", imageData);
    },
    getImage(id) {
        return id ? Service.get(`images/${id}`) : "";
    },
    deleteImage(id) {
        return id ? Service.delete(`images/${id}`) : "";
    },

    //Getters
    state: {
        get authenticated() {
            return Auth.authenticated();
        },
    },
    currentUser: {
        get getCurrentUserData() {
            if (Auth.authenticated) return Auth.getCurrentUserData();
        },
        get username() {
            let result = Auth.getCurrentUserData();
            return result.username;
        },
    },
};

let Admin = {
    async insertDocument(doc, collectionName) {
        return Service.post(`admin/data/${collectionName}`, doc);
    },
    async deleteDocument(id, collectionName) {
        return Service.delete(`admin/data/${collectionName}?id=${id}`);
    },
    async uploadImage(base64_data, location) {
        let uploadResult = await filestackClient.upload(base64_data);
        let doc = {
            handle: uploadResult.handle,
            url: uploadResult.url,
        };
        let insertResult = await this.insertDocument(doc, location);
        return insertResult;
    },
    fetchData(dataName) {
        return Service.get(`admin/data/${dataName}`);
    },
    //Getters
    data: {
        get getTimelinePosts() {
            return Admin.fetchData("timelinePosts");
        },
        get getCarouselPictures() {
            return Admin.fetchData("carouselPictures");
        },
        get getAllUsers() {
            return Admin.fetchData("users");
        },
        get getAllGames() {
            return Admin.fetchData("gameCards");
        },
    },
};

export { Auth, Admin };
