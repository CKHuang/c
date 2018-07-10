<template>
    <Layout>
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
    </Layout>
</template>

<script>
    import Header from './Header/index.vue'
    import Content from './Content/index.vue'
    import Footer from './Footer/index.vue'
    import './layout.css'
    
    export default {
        name: `zLayout`,
        components: {
            Header,
            Content,
            Footer
        }
    }
</script>

