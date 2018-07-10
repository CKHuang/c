<style scoped>
    .input-card {
        background-color: #efefef;
        border: 1px #c3c3c3 dashed;
    }
</style>

<template>
    <div>
        <RadioGroup 
            :value="currentValue"
            @on-change="change"
        >
            <Radio 
                v-for="config in configs" 
                :key="config.id"
                :label="config.id"
            >{{ config.label }}</Radio>
        </RadioGroup>
        <Card 
            dis-hover
            v-if="currentValue == 3"
            :padding="10"
            class="input-card"
        >
            <Form :label-width="90" label-position="right">
                <FormItem label="自定义审批人">
                    <Input
                        placeholder="最多填写3个审批人，多个审批人用;符号分割"
                        v-model="approvers"
                        @on-change="input"
                    ></Input>
                </FormItem>
            </Form>
            
        </Card>
    </div>
</template>

<script>
    import apsConfig from '../../../../../../../config/aps'
    import Emitter from 'iview/src/mixins/emitter'

    /**
     * @name ApproverInput
     * @description approver 属性值的输入控件
     * @example 
     *    <ApproverInput 
     *       :value="{id,approvers}"
     *       @on-change="change"
     *    ></ApproverInput>
     *    @prop
     *      @param {Object} value 
     *      @param {Number} value.id 选中的id
     *      @param {String}  value.approvers 针对类型3自定义用户的配置，其他情况ext为空字符串,多个用
     *    @event 
     *      @on-change(currentValue) currentValue 当前内部选中的值
     */
    export default {
        name: `ApproverInput`,
        mixins: [Emitter],
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            },
            value: {
                type: Object,
                default: () => ({
                    id: 0,
                    approvers: ``
                })
            }
        },
        data() {
            return {
                currentValue: this.value.id,
                approvers: this.value.approvers || ``,
                configs: apsConfig.approver()
            }
        },
        methods: {
            change(currentValue) {
                this.currentValue = currentValue;
                const model = this.model(this.currentValue)
                this.$emit('input',model)
                this.$emit('on-change',model)
            },
            input() {
                this.$emit('input',this.model())
                this.$emit('on-change',this.model())
            },
            model(currentValue) {
                const _checkId = currentValue || this.currentValue;
                const config = apsConfig.getApprover(
                    _checkId
                )
                const has = config.iview.needInput;
                return {
                    id: _checkId,
                    approvers: has ? this.approvers : ``
                }
            }
        },
        watch: {
            "value.id": function(val,oldVal) {
                if ( this.currentValue !== this.value.id ) {
                    this.currentValue = this.value.id;
                }
            }
        }
    }
</script>

