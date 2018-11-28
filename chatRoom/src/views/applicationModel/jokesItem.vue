<template>
    <div class="vchat-jokesContent">
        <div class="top">
            <a class="avator">
                <img :src="item.profile_image" alt="">
            </a>
            <div class="info">
                <p class="name">{{item.name}}</p>
                <p class="time">{{item.create_time}}</p>
            </div>
        </div>
        <div class="contentt">
            <p class="text">{{item.text}}</p>
            <a class="image" v-if="item.image1 && !item.videouri && !item.voiceuri">
                <img :src="item.image1" :style="{width: item.width + 'px', height: item.height + 'px'}">
            </a>
            <aplayer v-if="item.voiceuri" :src="item.voiceuri" :pic="item.bimageuri"></aplayer>
        </div>
    </div>
</template>

<script>
    import aplayer from '@/views/components/APlayer/aplayer';
    export default{
        props: ['item'],
        name: 'jokesItem',
        data() {
            return {

            }
        },
        components: {
            aplayer
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-jokesContent{
        width:800px;
        margin: 0 auto;
    }
</style>