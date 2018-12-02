<template>
    <ul ref="msglist" class="vchat-message">
        <li :class="[{other: v.type==='other'},{mine: v.type==='mine'},{org: v.type==='org'}]" v-for="(v, i) in chatList" :key="i">
            <template v-if="v.type==='other'">
                <message-item type="other" @lookPhoto="lookPhoto" :v="v"></message-item>
            </template>
            <template v-if="v.type==='mine'">
                <message-item type="mine" @lookPhoto="lookPhoto" :v="v"></message-item>
            </template>
            <template v-if="v.type==='org'">
                系统消息：<span>{{v.nickname}}</span>加入群聊！
            </template>
        </li>
    </ul>
</template>

<script>
    import messageItem from './messageItem.vue';
    export default{
        props: ['chatList'],
        name: 'vMessage',
        data() {
            return {
                IMG_URL: process.env.IMG_URL
            }
        },
        watch: {
            chatList(){
                this.$nextTick(_ => {
                    this.$refs['msglist'].scrollTop = this.$refs['msglist'].scrollHeight + 200;
                });
            }
        },
        components: {
            messageItem
        },
        methods: {
            lookPhoto(url) {
                this.$emit('lookPhoto', url);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-message{
        width:100%;
        height: 100%;
        overflow-y: auto;
        padding: 5px 10px;
        box-sizing: border-box;
        position: relative;
        li{
            width:100%;
            margin: 15px 0;
        }
        /deep/ .mes-box{
            width:350px;
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
                    color: #fff;
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
        /deep/ .other .mes-box .messageInfo{
            text-align: left;
            margin-left: 10px;
            p.emoji{
                margin-left: 20px;
            }
        }
        /deep/ .other .mes-box{
            justify-content: flex-start;
        }
        /deep/ .mine .mes-box{
            justify-content: flex-end;
        }
        /deep/ .mine .mes-box .messageInfo{
            text-align: right;
            margin-right: 10px;
            p.emoji{
                margin-right: 20px;
            }
        }
        .mine{
            display: flex;
            justify-content: flex-end;
        }
        /deep/ .other .mes-box .messageInfo p.mes{
            background-color: #9cbeca;
        }
        /deep/ .other p.mes:before, .mine p.mes:after{
            width:0;
            height:0;
            content: '';
            display: block;
            position:absolute;
            top:10px;
        }
        /deep/ .other p.mes:before{
            left:-11px;
            border-bottom: 5px solid #9cbeca;
            border-left: 10px solid transparent;
            border-right: 5px solid transparent;
            border-top: 0;
            transform: rotate(45deg);
        }
        /deep/ .mine p.mes:after{
            right:-10px;
            border-bottom: 5px solid #acd9f8;
            border-left: 5px solid transparent;
            border-right: 10px solid transparent;
            transform: rotate(-45deg);
        }
        .org{
            width:100%;
            margin: 20px 0;
            font-size: 12px;
            color: #e4e4e4;
            box-sizing: border-box;
        }
        .org span{
            color: rgb(164, 245, 231);
            margin: 0 5px;
        }
    }
</style>