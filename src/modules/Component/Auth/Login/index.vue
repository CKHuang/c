<style scoped>
    .loading {
        width: 15em;
        line-height: 5em;
        text-align: center;
        font-size: 14px;
        position: fixed;
        background: #fff;
        border-radius: 3px;
        border: 1px solid #eceaea;
        left: 50%;
        margin-left: -105px;
        margin-top: -36px;
        top: 25%;
    }
</style>

<template>
    <div class="loading">
        <span>登录跳转中...</span>
    </div>
</template>

<script>
    export default {
        name: `Login`
    }
</script>

