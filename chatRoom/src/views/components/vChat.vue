<template>
    <div class="vchat-chatRoom">
        <div class="vchat-chatRoom-bg">
            <div class="chat-header">
                <a>聊天第一群</a>
                <div class="chat-handel">
                    <v-icon class="el-icon-minus" color="#fff" cursor="pointer" @clickIcon="close"></v-icon>
                    <v-icon class="el-icon-setting" color="#fff" cursor="pointer"></v-icon>
                </div>
            </div>
            <div class="chat-container">
                <ul class="chat-conversation-ul">
                    <li class="chat-conversation-li" v-for="(v, i) in contactsList" :key="v.id" :class="{active: currSation === v.id}" @click="setCurrSation(v.id)">
                        <a class="vchat-photo">
                            <img :src="IMGURL + v.photo" alt="">
                        </a>
                        <div class="chat-conversation-li-center">
                            <p class="vchat-line1">{{v.name}}</p>
                            <p class="vchat-line1">{{v.newMes}}</p>
                        </div>
                        <div class="chat-conversation-li-right">
                            <p>{{v.newMesTime}}</p>
                        </div>
                        <p class="delete">
                            <v-icon class="el-icon-circle-close" color="#323232" cursor="pointer" :size="18"></v-icon>
                        </p>
                    </li>
                </ul>
                <div class="chat-content-box">
                    <chat-item :currSation="currSation" @NewMes="getNewMes"></chat-item>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import chatItem from './chat-item.vue';
    import { mapState } from 'vuex';
    export default{
        name: 'vChat',
        data() {
            return {
                currSation: '', //当前会话
                contactsList: [], // 会话列表
                IMGURL: process.env.IMG_URL,
                one: true
            }
        },
        sockets:{
        },
        components: {
            chatItem
        },
        watch: {
            conversationsList: {
                handler(list) {
                    this.contactsList = list;
                    if (this.one && list.length) {
                        this.one = false;
                        this.currSation = this.contactsList[0].id;
                    }
                },
                deep: true,
                immediate: true
            }
        },
        computed: {
            ...mapState(['user', 'conversationsList'])
        },
        methods: {
            close() {
                this.$emit('closeChat');
            },
            setCurrSation(id) {
                this.currSation = id;
            },
            getNewMes(m) { // 获取最新一条消息
                this.conversationsList.forEach((v, i) => {
                    if (v.id === m.roomid) {
                        this.$set(this.conversationsList, i, Object.assign({}, v, {newMes: m.mes, newMesTime: m.time.split(' ')[1]}));
                    }
                })
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-chatRoom{
        width:100%;
        height: 100%;
        border-radius: 3px;
        background-image: url(../../assets/img/1.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
        position: relative;
        &:before{
            content: '';
            display: block;
            position: absolute;
            left:0;
            top:0;
            width:100%;
            height: 100%;
            background-color: rgba(0,0,0,0.2);
            z-index: 1;
        }
        .vchat-chatRoom-bg{
            position: absolute;
            left:0;
            top:0;
            width:100%;
            height: 100%;
            z-index: 2;
        }
        .chat-header{
            width:100%;
            height: 40px;
            color: #fff;
            text-align: center;
            position: relative;
            line-height: 40px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            font-size: 16px;
            a{
                color: #fff;
                padding: 2px 5px;
                display: inline-block;
            }
            .chat-handel{
                position: absolute;
                right: 0;
                top:0;
                padding-right: 15px;
                i{
                    padding: 8px 4px 3px;
                }
                i:hover{
                    background-color: rgba(255,255,255,0.5);
                }
            }
        }
        .chat-container{
            width:100%;
            height: calc(100% - 40px);
            display: flex;
            justify-content: flex-start;
            .chat-conversation-ul{
                width:20%;
                min-width:147.2px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255,255,255,0.2);
                overflow-y: auto;
            }
            .chat-conversation-li{
                padding: 10px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                overflow: hidden;
                text-align: left;
                position: relative;
                a{
                    width:42px;
                    min-width: 42px;
                    height: 42px;
                    margin-right: 10px;
                }

                .delete{
                    position: absolute;
                    right: 5px;
                    top:32px;
                    background-color: #fff;
                    border-radius: 50%;
                    width:18px;
                    height: 18px;
                    line-height: 18px;
                    text-align: center;
                    transition: transform 0.3s cubic-bezier(.76,.27,.09,.7);
                    transform: scale(0);
                    i{
                        margin: 0;
                    }
                    i:hover{
                        color: #FF3255 !important;
                    }
                }
            }
            .chat-conversation-li-center{
                min-width: 100px;
                font-size: 14px;
                color: #fff;
                p{
                    margin-bottom: 5px;
                }
                p:nth-of-type(2) {
                    font-size: 12px;
                    color: #d5d5d5;
                }
            }
            .chat-conversation-li-right{
                min-width: 36px;
                font-size: 12px;
                color: #d5d5d5;
                text-align: right;
                p{
                    margin-bottom: 5px;
                }
            }
            .chat-conversation-li:hover{
                background-color: rgba(255,255,255,0.2);
            }
            .chat-conversation-li:hover .delete{
                transform: scale(1);
            }
            .chat-conversation-li.active{
                background-color: rgba(255,255,255,0.2);
            }
            .chat-content-box{
                width: 80%;
                min-width: 588.8px;
                box-sizing: border-box;
            }
        }
    }
</style>