<template>
    <Form :model="form" :label-width="80">
        <FormItem label="业务Key">
            <Input v-model="form.key" v-if="form.key != ''" disabled></Input>
            <p v-else>申请业务成功之后会生成业务Key</p>
        </FormItem>
        <FormItem label="业务名称">
            <Input v-model="form.name" placeholder="给您的业务起个名字吧，例如：QQWALLET_COUPON"></Input>
        </FormItem>
       <FormItem label="Master">
           <Input v-model="form.master_json" placeholder="业务的master成员具有高级审批审批权限，最多指定3个master，每个以;分割"></Input>
       </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                form: {
                    key: '',
                    name: '',
                    master_json: ['zhangsan','lisi'].join(';')
                    
                }
            }
        },
        methods: {
            handlerSubmit() {

            }
        }
    }
</script>

