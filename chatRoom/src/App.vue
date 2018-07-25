<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        mounted() {
            this.$store.dispatch('getUserInfo');
        }
    }
</script>

<style lang="scss">
    @import "../static/css/base.scss";
</style>
