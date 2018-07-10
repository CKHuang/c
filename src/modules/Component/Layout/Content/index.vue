<style scoped>
.content {
    min-height: 200px;
}
</style>

<template>
    <Content :style="{padding: '0 50px'}">
        <Card dis-hover class="content" >
            <router-view></router-view>
        </Card>
    </Content>
</template>

<script>
    export default {
        name: `zContent`
    }
</script>

