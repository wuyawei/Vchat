<template>
    <div class="vchat-appCenter">
        <weather></weather>
    </div>
</template>

<script>
    import weather from './appModel/weather.vue';
    export default{
        data() {
            return {

            }
        },
        components: {
            weather
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-appCenter{
        width:100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
    }
</style>