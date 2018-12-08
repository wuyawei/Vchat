<template>
    <div class="Not-found">
        <span @click="$router.go(-1)">返回上一页</span>
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
    .Not-found{
        width: 100vw;
        height: 100vh;
        background-image: url("../assets/img/404.gif");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #0691d2;
        display: flex;
        justify-content: center;
        color: #fff;
        span{
            margin-top: 100px;
            cursor: pointer;
        }
    }
</style>