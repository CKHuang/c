<template>
    
</template>

<script>
    import apsConfig from '../../../../config/aps'
    import Emitter from 'iview/src/mixins/emitter'

    export default {
        name: `ProcessInput`,
        mixins: [Emitter],
        props: {

        },
        data() {
            return {
                configs: apsConfig.process()
            }
        },
        methods: {
            
        }
    }
</script>

