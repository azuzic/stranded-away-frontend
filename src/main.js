import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import vuetify from "./plugins/vuetify";
import AsyncComputed from "vue-async-computed";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";

Vue.use(AsyncComputed);
Vue.use(Croppa);

Vue.config.productionTip = false;
Vue.use(vuetify);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
