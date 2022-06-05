// Root import
import { createApp } from 'vue'
import Main from './Main.vue'
import router from './router'
import store from './store'

// import API lib
import axios from 'axios'
import VueAxios from 'vue-axios'

// quasar import
import { Quasar, LoadingBar, Loading } from 'quasar'
import quasarLang from 'quasar/lang/vi'
import quasarIconSet from 'quasar/icon-set/svg-material-icons'

// icon lib import
import { FontAwesomeIcon } from './plugins/font-awesome'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const app = createApp(Main)

app.use(router).use(store)
app.use(VueAxios, axios)
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(Quasar, {
    plugins: {
        LoadingBar,
        Loading
    }, // import Quasar plugins and add here
    lang: quasarLang,
    iconSet: quasarIconSet,
    config: {
        LoadingBar: {
            isActive: true
        },
        loading: {
            isActive: true,
            message: "Đang tải dữ liệu"
        }
    }
    /*
    config: {
      brand: {
        // primary: '#e46262',
        // ... or all other brand colors
      },
      notify: {...}, // default set of options for Notify Quasar plugin
      loading: {...}, // default set of options for Loading Quasar plugin
      loadingBar: { ... }, // settings for LoadingBar Quasar plugin
      // ..and many more (check Installation card on each Quasar component/directive/plugin)
    }
    */
})

app.mount('#app')
