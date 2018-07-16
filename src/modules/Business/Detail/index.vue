<style scoped>
    .name {
        padding: 15px;
        
    }
    .tab-content {
        
    }
    .pull-right {
        float: right;;
    }
</style>

<template>
    <div>
        <h2 class="name">{{ business && business.name }}
            <Button icon="gear-a" size="small" type="primary" class="pull-right">设置</Button>
        </h2>
        <Tabs v-bind:value="currentTab">
            <TabPane label="申请单列表" icon="social-buffer" name="application">
                <div class="tab-content">
                    <ApplicationList></ApplicationList>
                </div>
            </TabPane>
            <TabPane label="成员配置" icon="ios-people" name="group">
                <div class="tab-content">
                    成员配置
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import ApplicationList from '../../Application/List/index.vue'
    import { mapGetters, mapActions } from 'vuex'

    /**
     * @name BusinessDetail
     * @description 业务的详情功能
     * @example
     *    <BusinessDetail
     *      :id="1",
     *      :tab="group"
     *    >
     *    </BusinessDetail>
     */
    export default {
        name: `BusinessDetail`,
        components: {
            ApplicationList: ApplicationList
        },
        // 创建之后再去获取数据来渲染
        created() {
            this.$store.dispatch('business/one',{id:this.bid})
        },
        
        props: {
            id: {
                type: Number,
                default: 0
            },
            tab: {
                type: String,
                default: `application`
            }
        },
        computed: {
            ...mapGetters(`business`,{
                business: 'one'
            })
        },
        methods: {
            ...mapActions(`business`,[
                'one'
            ]),
        },
        data() {
            return {
                bid: this.id,
                currentTab: this.tab,
                detail: {
                    id: 12,
                    name: `Benz_Suppers`
                }
            }
        }
    }
</script>
