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
        <div class="content">
            <p class="text">{{item.text}}</p>
            <a class="image" v-if="item.image1 && !item.videouri && !item.voiceuri">
                <img :src="item.image1" :style="{width: item.width + 'px', height: item.height + 'px'}">
            </a>
            <aplayer v-if="item.voiceuri" :src="item.voiceuri" :pic="item.bimageuri"></aplayer>
            <vplayer v-if="item.videouri" :src="item.videouri" :pic="item.bimageuri"></vplayer>
        </div>
    </div>
</template>

<script>
    import aplayer from '@/views/components/APlayer/aplayer';
    import vplayer from '@/views/components/VPlayer/vplayer';
    export default{
        props: ['item'],
        name: 'jokesItem',
        data() {
            return {

            }
        },
        components: {
            aplayer,
            vplayer
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-jokesContent{
        width:800px;
        margin: 0 auto;
        background-color: #fff;
        margin-bottom: 10px;
        border-radius: 5px;
        text-align: left;
        padding: 10px;
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
        }
    }
</style>