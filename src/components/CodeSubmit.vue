<template>
   <codemirror
    v-model="code"
    placeholder="Code gose here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tabSize="2"
    :extensions="extensions"
    @ready="log('ready', $event)"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
  <h1>{{ problemName }}</h1>
</template>

<script>
  import { Codemirror } from 'vue-codemirror'
  import { javascript } from '@codemirror/lang-javascript'
  import { oneDark } from '@codemirror/theme-one-dark'
  export default {
      data: {
          problemName: "APLUSB"
      },
      components: {
          Codemirror
      },
      setup() {
          const code = `console.log('Hello World')`
          const extensions = [javascript(), oneDark]
          return {
              code,
              extensions,
              log: console.log
          }
      }
  }
</script>