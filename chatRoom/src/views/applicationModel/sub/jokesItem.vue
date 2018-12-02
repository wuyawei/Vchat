<template>
    <div class="vchat-jokes-item">
        <div class="top">
            <a class="avator">
                <img :src="item.profile_image" alt="">
            </a>
            <div class="info">
                <p class="name">{{item.name}}</p>
                <p class="time">{{item.create_time}}</p>
            </div>
        </div>
        <div class="content">
            <p class="text">{{item.text}}</p>
            <a class="image" v-if="item.image1 && !item.videouri && !item.voiceuri">
                <img v-lazy="item.image1">
            </a>
            <aplayer v-if="item.voiceuri" :src="item.voiceuri" :pic="item.bimageuri"></aplayer>
            <div class="dplayer-container">
                <dplayer v-if="item.videouri" :videoInfo="videoInfo"></dplayer>
            </div>
        </div>
    </div>
</template>

<script>
    import aplayer from '@/views/components/APlayer/aplayer';
    import dplayer from '@/views/components/DPlayer/dplayer';
    export default{
        props: ['item'],
        name: 'jokesItem',
        data() {
            return {

            }
        },
        computed: {
            videoInfo() {
                return {
                    src: this.item.videouri,
                    type: 'mp4',
                    autoplay: false,
                    pic: this.item.bimageuri
                }
            }
        },
        components: {
            aplayer,
            dplayer
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-jokes-item{
        width:800px;
        margin: 0 auto;
        background-color: #fff;
        margin-bottom: 10px;
        border-radius: 5px;
        text-align: left;
        padding: 15px;
        box-sizing: border-box;
        .top{
            display: flex;
            border-bottom: 1px solid #d5d5d5;
            margin-bottom: 10px;
            padding: 5px;
            box-sizing: border-box;
            .avator{
                width:40px;
                overflow: hidden;
                display: block;
                img{
                    width:100%;
                }
            }
            .info{
                margin-left: 10px;
            }
            .name{
                font-size: 14px;
                margin-bottom: 5px;
            }
            .time{
                font-size: 12px;
                color: #666;
            }
        }
        .content{
            width: 100%;
            .text{
                line-height: 32px;
                margin-bottom: 10px;
            }
            .image{
                max-width: 700px;
                margin: 0 auto;
                display: block;
                img{
                    max-width: 700px;
                }
            }
            .dplayer-container{
                width:500px;
            }
        }
    }
</style>