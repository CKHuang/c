<style scoped>
    .pull-center {
        text-align: right;
    }
</style>

<template>
    <div>
        <Table :columns="columns" :data="list">
            <div slot="footer" class="pull-center">
                <Page show-total 
                    :total="40" 
                    size="small" 
                    :page-size="5"
                    :current="1"
                    @on-change="page"
                ></Page>
            </div>
        </Table>
    </div>
</template>

<script>
    import apsConfig from '../../../../config/aps'

    export default {
        name: `ApplicationList`,
        props: {
            value: [Array,Boolean],
            default: false
        },
        data() {
            return {
                columns: [{
                    title: `ID`,
                    key: `id`,
                    width: 100
                },{
                    title: `申请人`,
                    key: `applicant`,
                    width: 120
                },{
                    title: `票据`,
                    key: `ticket`,
                    width: 300
                },{
                    title: `状态`,
                    key: `state`,
                    render(h,obj) {
                        const label = apsConfig.application.state(
                            obj.row.state
                        )
                        return h(`Tag`,[
                            label.label
                        ])
                    },
                    filters: [{
                        label: `审批中`,
                        value: 1
                    },{
                        label: `审批结束`,
                        value: 2
                    }],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        return row.state == value
                    }
                },{
                    title: `审批结果`,
                    key: `result`,
                    render(h,obj) {
                        const label = apsConfig.application.result(
                            obj.row.result
                        )
                        return h(`Tag`,[
                            label.label
                        ])
                    },
                    filters: [{
                        label: `未审批完`,
                        value: 0
                    },{
                        label: `通过`,
                        value: 1
                    },{
                        label: `拒绝`,
                        value: 2
                    },{
                        label: `取消`,
                        value: 3
                    }],
                    filterMultiple: false,
                    filterMethod (value, row) {
                       return row.result == value
                    }
                }],
                list: this.value || [{
                    id: 36,
                    ticket: `98df1a44b757a444c6a466fc07f95bf3`,
                    create_time: `2018-07-07 22:30:40`,
                    state: 1,
                    result: 0,
                    applicant: `CK.Huang`,
                    last_modify_time: `2018-07-07 22:30:40`
                },{
                    id: 37,
                    ticket: `68d91a49b7s7a44cc6a466fc07f95bf3`,
                    create_time: `2018-07-07 22:30:40`,
                    state: 2,
                    result: 0,
                    applicant: `CK.Huang`,
                    last_modify_time: `2018-07-07 22:30:40`
                },{
                    id: 38,
                    ticket: `68d91a49b7s2344cc6a466fc07f95bf3`,
                    create_time: `2018-07-07 22:30:40`,
                    state: 2,
                    result: 0,
                    applicant: `CK.Huang`,
                    last_modify_time: `2018-07-07 22:30:40`
                },{
                    id: 39,
                    ticket: `68d91a49b7s2344cc6a466fc07f95bf3`,
                    create_time: `2018-07-07 22:30:40`,
                    state: 2,
                    result: 0,
                    applicant: `CK.Huang`,
                    last_modify_time: `2018-07-07 22:30:40`
                }]
            }
        },
        methods: {
            page: (num) => {
                console.log(num)
            }
        }

    }
</script>

