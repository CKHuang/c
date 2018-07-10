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
            v-if="currentValue == 2"
            :padding="10"
            class="input-card"
        >
            <Form :label-width="100" label-position="right">
                <FormItem label="QQ号码覆盖率">
                    <InputNumber
                        :max="100"
                        :min="30"
                        :formatter="value => `${value}%`"
                        :parser="value => value.replace('%', '')"
                        v-model="coverage.rate"
                        @on-change="input"
                    ></InputNumber>
                </FormItem>
                <FormItem label="检测的QQ号码" style="margin-top:8px;">
                    <Input
                        v-model="coverage.uids"
                        @on-change="input"
                    >
                    </Input>
                </FormItem>
            </Form>
            
        </Card>
    </div>
</template>

<script>
    import apsConfig from '../../../../../../../config/aps'
    import Emitter from 'iview/src/mixins/emitter'

    /**
     * @name RuleInput
     * @description rule 属性的输入控件
     * @example
     *      <RuleInput
     *          v-model="{id,coverage}",
     *          @on-change="change"
     *      ></RuleInput>
     *      @prop
     *          @param {Object} value
     *          @param {Number} value.id 选中的id
     *          @param {Object} value.coverage 覆盖率配置,针对id是2才有效
     *          @param {Number} value.coverage.rate 覆盖比例
     *          @param {String}  value.coverage.uids 需要覆盖的用户号，多个以;分割
     *      @event
     *          @on-change(currentValue) currentValue
     */
    export default {
        name: `RuleInput`,
        mixins: [Emitter],
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: Object,
                default: () => ({
                    id: 0,
                    coverage: {rate:0,uids:``}
                })
            }
        },
        data() {
            return {
                currentValue: this.value.id,
                coverage: this.value.coverage || 0,
                configs: apsConfig.rule()
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
                const config = apsConfig.getRule(
                    _checkId
                )
                const has = config.iview.needInput;
                return {
                    id: _checkId,
                    coverage: has ? this.coverage : {rate:0,uids:``}
                }
            }
        },
        watch: {
            "value.id": function(val,oldVal) {
                if ( this.currentValue !== this.value.id ) {
                    this.currentValue = this.value.id
                }
            }
        }
    }
</script>

