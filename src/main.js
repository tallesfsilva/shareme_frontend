import { createApp ,ref} from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import vue3GoogleLogin from 'vue3-google-login'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiSolidHome,HiMenu,IoCloseCircle,
  IoSearch,MdAddcircleoutline,BiCloudDownloadFill,BiArrowUpRightCircleFill,
  MdDelete,BiCloudArrowUp
 } from "oh-vue-icons/icons";
import VueMasonry from 'vue-next-masonry'
import store from './store/index'
import GridLoader from 'vue-spinner/src/GridLoader.vue'

addIcons(HiSolidHome,HiMenu,IoCloseCircle,IoSearch,MdAddcircleoutline,
  BiCloudDownloadFill,BiArrowUpRightCircleFill,MdDelete,BiCloudArrowUp);



const app = createApp(App)

app.use(router) 
app.component('grid-loader',GridLoader )
app.use(store)
app.use(VueMasonry)
app.use(ref)
 
app.component("v-icon", OhVueIcon);


app.use(vue3GoogleLogin, {
  clientId: '247374036314-f99qfcepbemvlar9od9er4eee3un43db.apps.googleusercontent.com'
})


app.mount('#app')
