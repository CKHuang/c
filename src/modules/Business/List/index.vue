<style scoped>
    .owner {
        padding: 0px 6px;
    }
    .list {
        margin-bottom: 10px;
    }
    .text-center {
        text-align: center;
        padding: 15px 0px;
    }
</style>
<template>
    <div>
        <Spin fix v-if="loading">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <div v-else>
            <div v-if="list.length > 0">
                <Card v-for="item in list" :key="item.id" :padding="10" class="list">
                    <h4>{{ item.name }}</h4>
                    <Tooltip content="项目创建者" placement="top">
                        <Icon type="ios-person"></Icon>
                        <span>{{ item.owner }}</span>
                    </Tooltip>
                </Card>
            </div>
            <div v-else class="text-center">暂无数据</div>
        </div>
    </div>
</template>
<script>

    import { mapGetters, mapActions } from 'vuex'

    /**
     * @name BusinessList
     * @description 业务列表模块
     * @example
     *     <BusinessList>
     *     </BusinessList>
     */
    export default {
        name: `BusinessList`,
        props: {},
        created() {
            this.$store.dispatch('business/list')
        },
        computed: {
            ...mapGetters(`business`,{
                list: 'list'
            })
        },
        methods: {
            ...mapActions(`business`,[
                'list'
            ]),
        },
        data() {
            return {
                bid: this.id,
                list: this.value
            }
        }
    }
</script>

