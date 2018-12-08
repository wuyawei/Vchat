<template>
    <div class="PhotoSwipe" v-show="visible" @click="close">
        <div class="img-container">
            <img :src="IMG_URL + url" alt="图片加载失败">
        </div>
    </div>
</template>

<script>
    export default{
        name: 'PhotoSwipe',
        props: ['url', 'visible'],
        data() {
            return {
                IMG_URL: process.env.IMG_URL
            }
        },
        methods: {
            close() {
                this.$emit('close');
            }
        },
        mounted() {
            document.querySelector('body').appendChild(this.$el);
        }
    }
</script>

<style lang="scss" scoped>
    .PhotoSwipe{
        position: fixed;
        width:100%;
        height: 100%;
        left:0;
        top:0;
        z-index: 2018;
        background-color: rgba(0,0,0,0.8);
        overflow: hidden;
        .img-container{
            position: absolute;
            width:100%;
            height: 100%;
            left:0;
            top:0;
            overflow-y: auto;
        }
        img{
            position: absolute;
            left:50%;
            top:50%;
            transform: translate(-50%, -50%);
            max-width: 1000px;
        }
    }
</style>