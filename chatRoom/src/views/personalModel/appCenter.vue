<template>
    <div class="vchat-appCenter">
        <weather></weather>
        <backLog></backLog>
    </div>
</template>

<script>
    import weather from './appModel/weather.vue';
    import backLog from './appModel/backLog.vue';
    export default{
        data() {
            return {

            }
        },
        components: {
            weather,
            backLog
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