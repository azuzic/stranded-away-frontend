import router from "@/router";
let wait = function (seconds) {
  return new Promise((resolveFn) => {
    setTimeout(resolveFn, seconds * 1000);
  });
};
function updateToken(data) {
  if (localStorage.user) localStorage.removeItem("user");
  localStorage.setItem("user", JSON.stringify(data));
}
export default {
  loginRequest: false,
  promptType: false,
  message: "",

  loginHandler: async function (state, response, message) {
    this.loginRequest = true;
    this.message = message;
    this.promptType = state;
    if (state == "success") {
      await wait(3);
      //Save token to localStorage
      let tokenData = response.data;
      updateToken(tokenData);

      //Redirect to user profile page
      router.replace({ name: "Home" });
      router.go();
    } else {
      await wait(3);
    }
    this.loginRequest = false;
  },

  registerRequest: false,

  registerHandler: async function (state) {
    this.registerRequest = true;

    if (state == "success") {
      this.promptType = true;
      await wait(3);

      //Redirect to login
      router.replace({ name: "Login" });
    } else {
      this.promptType = false;
      await wait(3);
    }
    this.registerRequest = false;
  },

  passwordChangeRequest: false,

  changePasswordHandler: async function (state) {
    this.passwordChangeRequest = true;

    if (state == "success") {
      this.promptType = true;
      await wait(3);
    } else {
      this.promptType = false;
      await wait(4);
    }
    this.passwordChangeRequest = false;
  },

  emailChangeRequest: false,

  changeEmailHandler: async function (state, response) {
    this.emailChangeRequest = true;

    if (state == "success") {
      this.promptType = true;
      var tokenData = response.data;
      //Update token in localStorage after email change
      updateToken(tokenData);
      await wait(3);
    } else {
      this.promptType = false;
      await wait(3);
    }
    this.emailChangeRequest = false;
  },

  coverImageChangeRequest: false,

  changeCoverImageHandler: async function (state) {
    this.coverImageChangeRequest = true;

    if (state == "success") {
      this.promptType = true;
      await wait(3);
    } else {
      this.promptType = false;
      await wait(4);
    }
    this.coverImageChangeRequest = false;
  },

  avatarImageChangeRequest: false,

  changeAvatarImageHandler: async function (state) {
    this.avatarImageChangeRequest = true;

    if (state == "success") {
      this.promptType = true;
      await wait(3);
    } else {
      this.promptType = false;
      await wait(4);
    }
    this.avatarImageChangeRequest = false;
  },
};
