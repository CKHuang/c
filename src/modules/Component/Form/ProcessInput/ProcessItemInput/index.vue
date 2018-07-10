<style scoped>
    .process-item-input-card {
        background-color: #f6f6f6
    }
    .disable-tips {
        font-size: 12px;
        color: #aaa;
    }
    .label-text {
        margin-left: 8px;
    }
</style>


<template>
    <Card
        dis-hover
        :padding="10"
        class="process-item-input-card"
    >
        <div slot="title">
             <Switch
                v-model="effect"
            >
                <Icon type="android-done" slot="open"></Icon>
                <Icon type="android-close" slot="close"></Icon>
            </Switch>
            <Tag class="label-text" v-if="effect" color="blue">{{ label }}</Tag>
            <Tag class="label-text" v-else type="border">{{ label }}</Tag>
        </div>
        <Form label-position="right" :label-width="70" v-if="effect">
            <FormItem label="审批人员" style="margin-bottom:5px!important;">
                <ApproverInput
                    v-model="approver"
                ></ApproverInput>
            </FormItem>
            <FormItem label="审批规则">
                <RuleInput
                    v-model="rule"
                ></RuleInput>
            </FormItem>
        </Form>
        <p v-else class="disable-tips">该环节没有开启</p>
    </Card>
</template>


<script>
    import apsConfig from '../../../../../../config/aps'
    import Emitter from 'iview/src/mixins/emitter'
    import ApproverInput from './ApproverInput/index.vue'
    import RuleInput from './RuleInput/index.vue'

    /**
     * @name ProcessItemInput
     * @description 审批流程中每项的配置
     * @example
     *      <ProcessItemInput>
     *          v-model="{
     *              approver {object}  审批人员数据，{id,apprivers}
     *              rule     {object}  审批规则数据，{id,coverage:{rate,uids}}
     *              effect   {boolean} 是否使用,
     *          }"
     *          // 以下数据是过来后就是静态的
     *          :label {string} 流程的名称
     *          :pid   {number} 流程的id
     *      </ProcessItemInput>
     *      @event
     *          @on-change({approver,rule,effect,label,pid})
     *              @param {object}  approver 审批人信息，如果effect为false返回null
     *              @param {object}  rule     审批规则信息，如果effect为false返回null
     *              @param {boolean} effect  是否生效
     *              @param {string}  label    流程的名称
     *              @param {number}  pid      流程的id
     */
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
                   rule: null,
                   effect: false
               })
           },
           label: {
               type: String,
               default: ``
           },
           pid: {
               type: Number,
               default: 0
           }
       },
       data() {
           console.log('->receview',this.value);
           return {
               approver: this.value.approver,
               rule: this.value.rule,
               effect: this.value.effect
           }
       },
       methods: {
           emitChange() {
               const effect = this.value.effect;
               const value = {
                   approver: effect ? this.value.approver : null,
                   rule: effect ? this.value.rule : null,
                   effect: effect,
                   label: this.label,
                   pid: this.pid
               }
               this.$emit('on-change',value)
           }
       },
       watch: {
           'approver': function(val) {
               if (val != this.value.approver) {
                   this.value.approver = val
                   this.emitChange()
               }
           },
           'rule': function(val) {
               if (val != this.value.rule) {
                   this.value.rule = val;
                   this.emitChange()
               }
           },
           'effect': function(val) {
               if (val != this.value.effect) {
                   this.value.effect = val;
                   this.emitChange()
               }
           }
       }
    }
</script>
