import router from "@/router";
let wait = function (seconds) {
  return new Promise((resolveFn) => {
    setTimeout(resolveFn, seconds * 1000);
  });
};
export default {
  loginRequest: false,
  promptType: false,

  loginHandler: async function (state) {
    this.loginRequest = true;

    if (state == "success") {
      this.promptType = true;
      await wait(3);

      //Redirect to home
      router.replace({ name: "home" });
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
      router.replace({ name: "login" });
    } else {
      this.promptType = false;
      await wait(3);
    }
    this.registerRequest = false;
  },
};
