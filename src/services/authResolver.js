import router from "@/router";
let wait = function (seconds) {
  return new Promise((resolveFn) => {
    setTimeout(resolveFn, seconds * 1000);
  });
};
export default {
  loginRequest: false,
  promptType: false,

  loginHandler: async function (state, response) {
    this.loginRequest = true;

    if (state == "success") {
      this.promptType = true;
      await wait(3);
      console.log("Success");
      //Save token to localStorage
      let user = response.data;
      localStorage.setItem("user", JSON.stringify(user));

      //Redirect to user profile page
      router.replace({ name: "Home" });
      router.go();
    } else {
      console.log("Error");
      this.promptType = false;
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

  usernameChangeRequest: false,

  changeUsernameHandler: async function (state, response) {
    this.usernameChangeRequest = true;

    if (state == "success") {
      this.promptType = true;
      //Update token in localStorage
      var user = response.data;
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(user));
      await wait(3);
      router.replace({
            name: 'User',
            params: { userName: user.fullName },
        })
    } else {
      this.promptType = false;
      await wait(3);
    }
    this.usernameChangeRequest = false;
  },

  emailChangeRequest: false,

  changeEmailHandler: async function (state, response) {
    this.emailChangeRequest = true;

    if (state == "success") {
      this.promptType = true;
      //Update token in localStorage
      var user = response.data;
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(user));
      await wait(3);
    } else {
      this.promptType = false;
      await wait(3);
    }
    this.emailChangeRequest = false;
  },
};
