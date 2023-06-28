import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Badge from "primevue/badge";
import ProgressSpinner from "primevue/progressspinner";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.component("Menubar", Menubar);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("ProgressSpinner", ProgressSpinner);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Badge", Badge);
});
