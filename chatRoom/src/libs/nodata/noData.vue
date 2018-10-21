<template>
    <div class="vchat-no-data">
        <div class="no-data-bg"></div>
        <slot></slot>
    </div>
</template>
<script>
    export default{
        name: 'vchatNodata',
        data() {
            return {};
        }
    }
</script>
<style lang="scss" scoped>
    .vchat-no-data{
        width:100%;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .no-data-bg{
            width:200px;
            height: 200px;
            background-image: url(../../assets/img/zwsj1.png);
            background-repeat: no-repeat;
            margin-bottom: 10px;
            background-size: contain;
        }
    }
</style>