import { createApp } from 'vue'
import Test from './Test.vue'
import VueCodemirror from 'vue-codemirror'
import { basicSetup } from '@codemirror/basic-setup'

const app = createApp(Test)

app.use(VueCodemirror, {
    // optional default global options
    autofocus: true,
    disabled: false,
    indentWithTab: true,
    tabSize: 2,
    placeholder: 'Code gose here...',
    extensions: []
    // ...
}).mount('#app')

// app.mount('#app')
