<template>
    <main>
        <h1>{{ problemName }}</h1>
        <a href="/testapi.html">Sang trang test API</a>
        <hr />
        <codemirror
            v-model="code"
            :placeholder="editor.placeholder"
            :style="{ height: '400px' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tabSize="2"
            :extensions="extensions"
            :lineNumbers="editor.lineNumbers"
            @ready="log('ready', $event)"
            @change="log('change', $event)"
            @focus="log('focus', $event)"
            @blur="log('blur', $event)"
        />
    </main>
</template>

<script>
    import { Codemirror } from 'vue-codemirror'
    import { javascript } from '@codemirror/lang-javascript'
    import { oneDark } from '@codemirror/theme-one-dark'
    export default {
        data() {
            return {
                editor: {
                    placeholder: "Viết code vào đây",
                    lineNumbers: true,
                    mode: "javascript",
                    theme: "material",
                    lineWrapping: true,
                    autoCloseTags: true,
                    autoCloseBrackets: true
                },
                problemName: "APLUSB"
            }
        },
        components: {
            Codemirror
        },
        setup() {
            const code = `console.log('Hello, world!')`
            const extensions = [javascript(), oneDark]
            return {
                code,
                extensions,
                log: console.log
            }
        }
    }
</script>