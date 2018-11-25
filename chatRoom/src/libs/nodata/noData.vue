<template>
    <div class="vchat-no-data">
        <div class="no-data-bg" :style="{backgroundImage: 'url(' + src + ')'}"></div>
        <slot></slot>
    </div>
</template>
<script>
    import bg from '../../assets/img/zwsj1.png';
    export default{
        props: ['url'],
        name: 'vchatNodata',
        data() {
            return {};
        },
        computed: {
            src() {
                return this.url || bg;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .vchat-no-data{
        width:100%;
        margin-bottom: 10px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        .no-data-bg{
            width:200px;
            height: 200px;
            background-repeat: no-repeat;
            margin-bottom: 10px;
            background-size: contain;
        }
    }
</style>