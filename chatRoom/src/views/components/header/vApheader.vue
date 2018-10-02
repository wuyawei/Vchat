<template>
    <h3>
        <a v-if="back" @click="goBack">
            <v-icon name="fanhui" cursor="pointer" color="#fff"></v-icon>
        </a>
        <span>{{title}}</span>
        <slot></slot>
    </h3>
</template>

<script>
    export default{
        props: ['back', 'title'],
        data() {
            return {};
        },
        methods: {
            goBack() {
                if (this.back === '-1') {
                    this.$router.go(-1);
                } else {
                    this.$router.push(this.back);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    h3{
        width: 100%;
        font-size: 14px;
        color: #fff;
        font-weight: 400;
        display: flex;
        justify-content: center;
        padding: 10px 15px;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 10px;
        background-color: #27cac7;
        span{
            color: #fff;
        }
        a:first-child{
            i{
                position: absolute;
                left:5px;
                top:10px;
                display: inline-block;
                width:24px;
                height: 24px;
                cursor: pointer;
                color: #323232;
            }
        }
    }
</style>