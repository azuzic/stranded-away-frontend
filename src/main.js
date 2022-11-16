import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import vuetify from "./plugins/vuetify";
import AsyncComputed from "vue-async-computed";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
import Meta from "vue-meta";
import VueAnalytics from "vue-analytics";

import { init } from "@emailjs/browser";

Vue.use(AsyncComputed);
Vue.use(Croppa);

Vue.use(Meta);

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: "G-SELHVMV24W",
  router,
});
Vue.config.productionTip = false;
Vue.use(vuetify);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

//Email JS init
init(process.env.VUE_APP_EMAIL_JS);
