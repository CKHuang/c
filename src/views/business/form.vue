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
                <CheckboxGroup v-model="form.process">
                    <Checkbox v-for="item in process" v-bind:label="item.label" v-bind:key="item.pid"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="审批人配置">
                <ApproverInput v-model="form.approver">
                </ApproverInput>
            </FormItem>
            <FormItem label="审批通过规则">
                <RuleInput v-model="form.rule">
                </RuleInput>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handlerSubmit">提交</Button>
            </FormItem>
            <!-- <FormItem label="Master">
                <Input v-model="form.master_json" placeholder="业务的master成员具有高级审批审批权限，最多指定3个master，每个以;分割"></Input>
            </FormItem> -->
        </Form>
    </Card>
</template>
<script>
    import apsConfig from '../../../config/aps'
    import ApproverInput from '../common/form/ApproverInput.vue'
    import RuleInput from '../common/form/RuleInput.vue'

    export default {
        components: {
            ApproverInput: ApproverInput,
            RuleInput: RuleInput
        },
        data () {
            return {
                form: {
                    key: '',
                    name: '',
                    master_json: ['zhangsan','lisi'].join(';'),
                    approver: {id:3,approvers:`CKHuang;Ck.Ming;HelloCk`},
                    rule: {id:2,coverage:45}
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

