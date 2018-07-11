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
        <h2 class="name">{{ detail.name }}
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
    import util from '../../../libs/util'
    import ApplicationList from '../../Application/List/index.vue'

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
        methods: {

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
