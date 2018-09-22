<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        created() {
            this.$store.dispatch('getUserInfo');
        }
    }
</script>

<style lang="scss">
    @import "../static/css/base";
    @import "../static/theme/index";
</style>
