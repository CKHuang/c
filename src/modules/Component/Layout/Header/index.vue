<style scoped>
.layout-logo{
   
    border-radius: 3px;
    float: left;
    position: relative;
    left: 20px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.alink {
    color: hsla(0,0%,100%,.7);
}
</style>

<template>
    <Header :style="{marginBottom:'20px'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">
                APS
            </div>
            <div class="layout-nav">
                <MenuItem name="1">
                    <router-link :to="{ name: 'layout'}" class="alink">
                        <Icon type="speedometer"></Icon>
                        控制台
                    </router-link>
                </MenuItem>
                <MenuItem name="2">
                    <router-link :to="{ name: 'business-list'}" class="alink">
                        <Icon type="android-list"></Icon>
                        业务列表
                    </router-link>
                </MenuItem>
            </div>
        </Menu>
    </Header>
</template>

<script>
    export default {
        name: `zHeader`
    }
</script>

