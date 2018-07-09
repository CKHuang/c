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
            v-if="inputState"    
        >
            <Input
                placeholder="最多填写3个审批人，多个审批人用;符号分割"
                v-model="approvers"
                @on-change="input"
            ></Input>
        </Card>
    </div>
</template>

<script>
    import apsConfig from '../../../../config/aps'
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
                inputState: this.updateInputState(),
                configs: apsConfig.approver()
            }
        },
        methods: {
            updateInputState() {
                const config = apsConfig.getApprover(
                    this.value.id
                )
                this.inputState = config.iview.needInput;
                return this.inputState;
            },
            change(currentValue) {
                this.currentValue = currentValue;
                const model = this.model(this.currentValue)
                this.$emit('input',model)
                this.$emit('on-change',model)
            },
            input() {
                this.$emit('input',this.model())
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
                this.updateInputState();
            }
        }
    }
</script>

