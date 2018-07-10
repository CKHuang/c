<template>
    <Card>
        <Form :model="form" label-position="top">
            <FormItem label="业务Key">
                <Input v-model="form.key" v-if="form.key != ''" disabled></Input>
                <p v-else>申请业务成功之后会生成业务Key</p>
            </FormItem>
            <FormItem label="业务名称">
                <Input v-model="form.name" placeholder="给您的业务起个名字吧，例如：QQWALLET_COUPON"></Input>
            </FormItem>
            <FormItem label="审批流程">
                <ProcessInput
                    v-model="form.process"
                >
                </ProcessInput>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
    import apsConfig from '../../../../config/aps'
    import ProcessInput from '../../Component/Form/ProcessInput/index.vue'

    export default {
        components: {
            ProcessInput: ProcessInput
        },
        data () {
            return {
                form: {
                    key: '',
                    name: '',
                    master_json: ['zhangsan','lisi'].join(';'),
                    process: [{
                        process: {id:1,label:`自测`},
                        approver: {id:3,approvers:`CKHuang;Ck.Ming;HelloCk`},
                        rule: {id:2,coverage:{rate:42,uids:'72732;232123;3232;123;323223'}}
                    },{
                        process: {id:2,label:`体验`},
                        approver: {id:3,approvers:`CKHuang;Ck.Ming;HelloCk`},
                        rule: {id:2,coverage:{rate:42,uids:'72732;232123;3232;123;323223'}}
                    },{
                        process: {id:3,label:`测试`},
                        approver: {id:3,approvers:`CKHuang;Ck.Ming;HelloCk`},
                        rule: {id:2,coverage:{rate:42,uids:'72732;232123;3232;123;323223'}}
                    }]
                    
                },
                process: apsConfig.process()
            }
        },
        methods: {
            handlerSubmit() {
                //this.form.approver.id = 2;
                console.log(this.form.approver,this.form.rule)
            }
        }
    }
</script>

