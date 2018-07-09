<style scoped>
    .process-item-input-card {
        background-color: #f6f6f6
    }
</style>


<template>
    <Card
        dis-hover
        :padding="10"
        class="process-item-input-card"
    >
        <p slot="title">环节配置</p>
        <Form label-position="right" :label-width="70">
            <FormItem label="审批人员" style="margin-bottom:5px!important;">
                <ApproverInput
                    v-model="approver"
                    @on-change="handlerApprover"
                ></ApproverInput>
            </FormItem>
            <FormItem label="审批规则">
                <RuleInput
                    v-model="rule"
                    @on-change="handlerRule"
                ></RuleInput>
            </FormItem>
        </Form>
    </Card>
</template>


<script>
    import apsConfig from '../../../../config/aps'
    import Emitter from 'iview/src/mixins/emitter'
    import ApproverInput from './ApproverInput.vue'
    import RuleInput from './RuleInput.vue'

    export default {
       name: `ProcessItemInput`,
       mixins: [Emitter],
       components: {
           ApproverInput: ApproverInput,
           RuleInput: RuleInput
       },
       props: {
           value: {
               type: Object,
               default: () => ({
                   approver: null,
                   rule: null
               })
           }
       },
       data() {
           return {
               approver: this.value.approver,
               rule: this.value.rule
           }
       },
       methods: {
           handlerApprover(value) {
               console.log('approver',value)
           },
           handlerRule(value) {
               console.log(`rule`,value)
           }
       }
    }
</script>
