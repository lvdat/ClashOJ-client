<template>
    <ul>
        <template v-if="!error">
            <li v-for="item in res" :key="item.id">{{item.id}} - {{ item.name }}</li>
        </template>
        <template v-else>
            {{ error_log }}
        </template>
    </ul>
</template>

<script>
    export default {
        data() {
            return {
                res: null,
                error: false,
                error_log: null
            }
        },
        mounted() {
            const ENV = import.meta.env
            const BASE_URL = ENV.VITE_BASE_JUDGE_API_URL
            const LANGUAGES = ENV.VITE_LANGUAGE_API
            const ALLOW_LANG = ENV.VITE_ALLOW_LANG.split(',').map(Number)
            const option = {
                method: 'GET',
                url: BASE_URL + LANGUAGES,
                headers: {
                    'X-Auth-Token': ENV.VITE_X_AUTH_TOKEN,
                    'X-Auth-User': ENV.VITE_X_AUTH_USER
                }
            }
            this.axios(option).then((response) => {
                this.error = false
                this.res = response.data
                this.res = this.res.filter((item) => ALLOW_LANG.includes(item.id))
            }).catch((err) => {
                this.error = true
                this.error_log = err
            })
        }
    }
</script>