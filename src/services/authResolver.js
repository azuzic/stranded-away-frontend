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

      //Save token to localStorage
      let user = response.data;
      localStorage.setItem("user", JSON.stringify(user));

      //Redirect to user profile page
      router.replace({ name: "Home" });
    } else {
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
};
