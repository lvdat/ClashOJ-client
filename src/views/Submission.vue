<template>
  <div class="q-pa-md">
    <q-table
      title="Submission"
      :rows="rows"
      :columns="columns"
      row-key="token"
      v-model:pagination.sync="pagination"
    />
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
            url: BASE_URL + SUBMISSION + "?base64_encoded=false&fields=status,language,time,memory,token,created_at&page=1&per_page=100",
            headers: {
                'X-Auth-Token': ENV.VITE_X_AUTH_TOKEN,
                'X-Auth-User': ENV.VITE_X_AUTH_USER
            }
        }
        this.axios(option).then((response) => {
            let DataList = response.data['submissions']
            for(let i = 0; i < 54; i++){
                let r = {
                    token: DataList[i]['token'].slice(2, 12),
                    time: DataList[i]['time'] == null ? "NULL" : `${DataList[i]['time']}s`,
                    memory: DataList[i]['memory'] == null ? "NULL" : DataList[i]['memory'] <= 999 ? `${DataList[i]['memory']}KB` : `${(DataList[i]['memory']/1000).toFixed(2)}MB`,
                    created: DataList[i]['created_at'],
                    language: DataList[i]['language']['name'],
                    status: DataList[i]['status']['description']                   
                }
                rows.push(r)
            }
            this.rows = rows
        }).catch((err) => {
            console.log("Error")
        })
    }
}
</script>