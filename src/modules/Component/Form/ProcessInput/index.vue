<template>
    <Timeline>
        <TimelineItem v-for="(item,index) in renderList" :key="index">
            <ProcessItemInput
                v-model="renderList[index]"
                :label="renderList[index].label"
                :pid="renderList[index].pid"
                @on-change="change"
            >
            </ProcessItemInput>
        </TimelineItem>
        <TimelineItem color="green">
            <Icon type="checkmark-circled" slot="dot"></Icon>
            <span>审批完成</span>
        </TimelineItem>
    </Timeline>
</template>

<script>
    import apsConfig from '../../../../../config/aps'
    import Emitter from 'iview/src/mixins/emitter'
    import ProcessItemInput from './ProcessItemInput/index.vue'

    export default {
        name: `ProcessInput`,
        mixins: [Emitter],
        components: {
            ProcessItemInput: ProcessItemInput
        },
        props: {
            value: {
                type: Array,
                default: () => ([])
            }
        },
        computed: {
            renderList: function() {
                let configs = this.configs;
                let effectList = this.currentValue;
                let effectMap = {}
                let renderList = []
                effectList.forEach((item) => effectMap[item.process.id] = item)
                configs.forEach((config) => {
                    let effect = effectMap[config.id] ? true : false;
                    let processItem = {
                        effect: effect,
                        label: config.label,
                        pid: config.id
                    }
                    if (effect) {
                        processItem.approver = effectMap[config.id].approver;
                        processItem.rule = effectMap[config.id].rule
                    }
                    renderList.push(processItem)
                })
                return renderList;
            }
        },
        data() {
            return {
                currentValue: this.value,
                configs: apsConfig.process()
            }
        },
        methods: {
            change(processItem) {
                const pid = processItem.pid;
                const effect = processItem.effect;
                const value = this.value
                if (effect == false) {
                    value.forEach((item,index) => {
                        if (pid == item.process.id) {
                            value.splice(index,1)
                        }
                    })
                } else {
                    let match = false;
                    value.forEach((item,index) => {
                        if (pid == item.process.id) {
                            match = index;
                            return ;
                        }
                    })
                    const newVal = {
                        approver: processItem.approver,
                        rule: processItem.rule,
                        process: {
                            id: processItem.pid,
                            label: processItem.label
                        }
                    }
                     /**
                     * 可能是因为数组引用，如果父组件的值变动后会影响子组件 
                     */
                    // match !== false ? value[match] = newVal 
                    //                 : value.push(newVal)
                }
                this.$emit('on-change',value);
                console.log('-->change',processItem);
                console.log(`pid`,pid)
                console.log(`effect`,effect)
                console.log(`this.value`,value)
            }
        }
    }
</script>

