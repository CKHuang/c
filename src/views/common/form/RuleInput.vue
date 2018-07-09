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
            <InputNumber
                :max="100"
                :min="30"
                :formatter="value => `${value}%`"
                :parser="value => value.replace('%', '')"
                v-model="coverage"
            ></InputNumber>
        </Card>
    </div>
</template>

<script>
    import apsConfig from '../../../../config/aps'
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
     *          @param {Number} value.coverage 覆盖率，针对类型是2才有用，默认是0
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
                    coverage: 0
                })
            }
        },
        data() {
            return {
                currentValue: this.value.id,
                coverage: this.value.coverage || 0,
                inputState: this.updateInputState(),
                configs: apsConfig.rule()
            }
        },
        methods: {
            updateInputState() {
                const config = apsConfig.getRule(
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
                const config = apsConfig.getRule(
                    _checkId
                )
                const has = config.iview.needInput;
                return {
                    id: _checkId,
                    coverage: has ? this.coverage : 0
                }
            }
        },
        watch: {
            "value.id": function(val,oldVal) {
                if ( this.currentValue !== this.value.id ) {
                    this.currentValue = this.value.id
                }
                this.updateInputState();
            }
        }
    }
</script>

