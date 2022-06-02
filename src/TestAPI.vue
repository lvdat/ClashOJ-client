<template>
    <select>
        <option v-for="item in res" :key="item.id" :value="item.id">{{ item.name }}</option>
    </select>
</template>

<script>
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    export default {
        name: 'Test API trả về xD',
        data() {
            return {
                res: null,
                base_url: 'https://judge-api.ctuit.club/languages/',
                x_auth_token: 'f6583e60-b13b-4228-b554-2eb332ca64e9',
                x_auth_user: 'a1133bc6-a0f6-46bf-a2d8-6157418c6fe3',
                allow_lang: [50, 51, 54, 56, 60, 61, 62, 63, 64, 67, 68, 70, 71, 72, 73, 78, 79, 80, 88]
            }
        },
        mounted() {
            const option = {
                headers: {
                    'X-Auth-Token': this.x_auth_token,
                    'X-Auth-User': this.x_auth_user,
                }
            }
            this.axios.get(this.base_url, option).then((response) => {
                this.res = response.data
                this.res = this.res.filter((item) => this.allow_lang.includes(parseInt(item.id)))
            }).catch((err) => {
                this.res = err
            })
        }
    }
</script>