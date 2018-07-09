<template>
    <Timeline>
        <TimelineItem v-for="(item,index) in currentValue" :key="index">
            <!-- <p class="title">自测环节</p> -->
            <ProcessItemInput
                v-model="currentValue[index]"
            >
            </ProcessItemInput>
        </TimelineItem>
        <TimelineItem color="green">
            <!-- <Icon type="trophy" ></Icon> -->
            <Icon type="checkmark-circled" slot="dot"></Icon>
            <span>审批完成</span>
        </TimelineItem>
    </Timeline>
</template>

<script>
    import apsConfig from '../../../../config/aps'
    import Emitter from 'iview/src/mixins/emitter'
    import ProcessItemInput from './ProcessItemInput.vue'

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
        data() {
            console.log('-->this.value',this.value);
            return {
                currentValue: this.value
            }
        },
        methods: {

        }
    }
</script>

