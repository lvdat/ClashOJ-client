<template>
  <div class="q-pa-md">
        <template v-if="!error">
            <q-table
                title="Submission"
                :rows="rows"
                :columns="columns"
                row-key="token"
                v-model:pagination.sync="pagination"
            />
        </template>
        <template v-else>
            Đã có lỗi xảy ra khi lấy dữ liệu <br /> {{ error_msg }}
        </template>
  </div>
</template>
<script>
export default {
    data() {
        return {
            rows: [],
            columns: [],
            pagination: {
                rowsPerPage: 30 // current rows per page being displayed
            },
            error: false,
            error_msg: null
        }
    },
    methods: {

    },
    mounted() {
        const columns = [
            {
                name: 'token',
                required: true,
                label: 'Token Submit',
                align: 'left',
                field: row => row.token,
                format: val => `${val}`,
                sortable: false
            },
            { name: 'status', align: 'center', label: 'Trạng thái', field: 'status', sortable: true },
            { name: 'time', label: 'Thời gian chạy', field: 'time'},
            { name: 'memory', label: 'Bộ nhớ', field: 'memory' },
            { name: 'language', label: 'Ngôn ngữ', field: 'language' },
            { name: 'created_time', label: 'Ngày submit', field: 'created' },
        ]
        const rows = []
        this.columns = columns
        const ENV = import.meta.env
        const BASE_URL = ENV.VITE_BASE_JUDGE_API_URL
        const SUBMISSION = ENV.VITE_SUBMISSION_API
        const option = {
            method: 'GET',
            url: BASE_URL + SUBMISSION + "?base64_encoded=false&fields=status,language,time,memory,token,created_at&page=1&per_page=200",
            headers: {
                'X-Auth-Token': ENV.VITE_X_AUTH_TOKEN,
                'X-Auth-User': ENV.VITE_X_AUTH_USER
            }
        }
        this.axios(option).then((response) => {
            let DataList = response.data['submissions']
            for(let i = 0; i < response.data['meta']['total_count']; i++){
                let created_at = new Date(DataList[i]['created_at'])
                let r = {
                    token: DataList[i]['token'].slice(0, 18),
                    time: DataList[i]['time'] == null ? "NULL" : `${DataList[i]['time']}s`,
                    memory: DataList[i]['memory'] == null ? "NULL" : DataList[i]['memory'] <= 999 ? `${DataList[i]['memory']}KB` : `${(DataList[i]['memory']/1000).toFixed(2)}MB`,
                    created: `${created_at.toLocaleTimeString('vi')} ${created_at.toLocaleDateString('vi')}`,
                    language: DataList[i]['language']['name'],
                    status: DataList[i]['status']['description']                   
                }
                rows.push(r)
            }
            this.rows = rows
        }).catch((err) => {
            console.log("Error")
            this.error = true
            this.error_msg = err
        })
    }
}
</script>