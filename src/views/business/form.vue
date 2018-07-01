<template>
    <Form :model="form" :label-width="80">
        <FormItem label="业务Key">
            <Input v-model="form.key" v-if="form.key != ''" disabled></Input>
            <p v-else>申请业务成功之后会生成业务Key</p>
        </FormItem>
        <FormItem label="业务名称">
            <Input v-model="form.name" placeholder="给您的业务起个名字吧，例如：QQWALLET_COUPON"></Input>
        </FormItem>
        <FormItem label="业务类型">
            <Select v-model="form.type">
                <Option value="beijing">beijing</Option>
                <Option value="shanghai">shanghai</Option>
                <Option value="shenzhen">shenzhen</Option>
            </Select>
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
                    type: ''
                }
            }
        },
        methods: {
            handlerSubmit() {

            }
        }
    }
</script>

