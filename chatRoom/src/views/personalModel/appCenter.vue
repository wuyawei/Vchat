<template>
    <div class="vchat-appCenter">
        <div class="weather vchat-bg"></div>
    </div>
</template>

<script>
    export default{
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-appCenter{
        width:100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
        .weather{
            width: 100%;
            height: 200px;
            background-image: url("../../assets/img/weather_b1.jpg");
            position: relative;
        }
        .weather:before{
            display: block;
            content: '';
            position: absolute;
            left:0;background-color: rgba(0,0,0,0.2);
            top:0;
            width:100%;
            height: 100%;

        }
    }
</style>