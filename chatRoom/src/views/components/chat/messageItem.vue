<template>
    <div class="vchat-messageItem mes-box">
        <p v-if="type === 'other'" class="avatar">
            <img :src="IMG_URL + v.avatar" alt="">
        </p>
        <div v-if="type === 'other' || type === 'mine'" class="messageInfo">
            <p class="info">
                <span>{{v.nickname}}</span>
                <i>{{v.time}}</i>
            </p>
            <p v-if="v.style === 'emoji'" class="emoji">
                <img v-lazy="IMG_URL + v.emoji" alt="">
            </p>
            <p v-if="v.style === 'img'" class="image">
                <img v-lazy="IMG_URL + v.emoji" alt="" @dblclick="$emit('lookPhoto', v.emoji)" title="双击查看原图">
            </p>
            <div v-if="v.style === 'file'" class="file">
                <img src="../../../assets/img/file.png" alt="">
                <div>
                    <p :title="v.mes">{{v.mes.lastIndexOf('.') > 12 ? v.mes.slice(0, 12) + '...' + v.mes.slice(v.mes.lastIndexOf('.')) : v.mes}}</p>
                    <a :href="v.emoji" download v-if="type === 'other'">下载</a>
                    <p v-if="type === 'mine'">
                        发送成功
                        <v-icon class="el-icon-circle-check-outline" color="#67C23A"></v-icon>
                    </p>
                </div>
            </div>
            <p class="mes" v-if="v.style === 'mess'">{{v.mes}}</p>
        </div>
        <p v-if="type === 'mine'" class="avatar">
            <img :src="IMG_URL + v.avatar" alt="">
        </p>
    </div>
</template>

<script>
    export default{
        name: 'messageItem',
        props: ['type', 'v'],
        data() {
            return {
                IMG_URL: process.env.IMG_URL
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mes-box{
        width: 100%;
        display: flex;
        .avatar{
            width:42px;
            height: 42px;
            color: #fff;
            font-size: 14px;
            text-align: center;
            line-height: 42px;
            border-radius: 50%;
            overflow: hidden;
            img{
                width:100%;
            }
        }
        .messageInfo {
            max-width:298px;
            p.info{
                font-size: 14px;
                color: #f5f5f5;
                margin-bottom: 5px;
                i{
                    font-size: 10px;
                    color: #b3b3b3;
                    font-style: normal;
                    margin-left: 5px;
                }
            }
            p.mes{
                background-color: #acd9f8;
                border-radius: 5px;
                padding: 10px;
                box-sizing: border-box;
                position: relative;
                text-align: left;
                word-wrap:break-word;
                font-size: 14px;
                word-break: break-all;
                display: inline-block;
                color: #323232;
            }
            p.emoji{
                max-width: 160px;
                overflow: hidden;
                border-radius: 5px;
                img{
                    width:100%;
                }
            }
            p.image{
                max-width: 300px;
                overflow: hidden;
                border-radius: 5px;
                img{
                    width:100%;
                }
            }
            div.file{
                width:300px;
                height: 80px;
                display: flex;
                justify-content: flex-start;
                align-content: center;
                color: #323232;
                background-color: #fff;
                text-align: left;
                padding: 10px;
                box-sizing: border-box;
                border-radius: 5px;
                img{
                    width:60px;
                    height: 60px;
                    margin-right: 10px;
                }
                p:nth-of-type(1){
                    font-size: 16px;
                    margin-bottom: 8px;
                }
                p:nth-of-type(2){
                    font-size: 12px;
                    line-height: 13px;
                    color: #888;
                    i{
                        vertical-align: text-bottom;
                    }
                }
                a{
                    color: #27cac7;
                    font-size: 12px;
                }
            }
        }
    }
    .other.mes-box .messageInfo{
        text-align: left;
        margin-left: 10px;
        p.emoji{
            margin-left: 20px;
        }
    }
    .other.mes-box{
        justify-content: flex-start;
    }
    .mine.mes-box{
        justify-content: flex-end;
    }
    .mine.mes-box .messageInfo{
        text-align: right;
        margin-right: 10px;
        p.emoji{
            margin-right: 20px;
        }
    }
    .mine.mes-box{
        justify-content: flex-end;
    }
    .other.mes-box .messageInfo p.mes{
        background-color: #9cbeca;
    }
    .other p.mes:before, .mine p.mes:after{
        width:0;
        height:0;
        content: '';
        display: block;
        position:absolute;
        top:10px;
    }
    .other p.mes:before{
        left:-11px;
        border-bottom: 5px solid #9cbeca;
        border-left: 10px solid transparent;
        border-right: 5px solid transparent;
        border-top: 0;
        transform: rotate(45deg);
    }
    .mine p.mes:after{
        right:-10px;
        border-bottom: 5px solid #acd9f8;
        border-left: 5px solid transparent;
        border-right: 10px solid transparent;
        transform: rotate(-45deg);
    }
</style>