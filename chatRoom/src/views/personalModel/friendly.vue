<template>
    <div class="vchat-friendly">
        <div class="vchat-friendly-container">
            <transition>
                <router-view></router-view>
            </transition>
        </div>
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
    .vchat-friendly{
        width:100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        .vchat-friendly-container{
            width: 100%;
            min-width: 300px;
            height: 100%;
            background-color: #fff;
            overflow: hidden;
            position: relative;
        }
    }
</style>