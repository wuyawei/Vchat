<template>
    <div class="vchat-chatRoom">
        <div class="chat-header">
            <a>聊天第一群</a>
            <div class="chat-handel">
                <v-icon class="el-icon-minus" color="#fff" cursor="pointer" @clickIcon="clickIcon"></v-icon>
            </div>
        </div>
        <div class="chat-container">
            <ul class="chat-conversation-list">
                <li class="chat-conversation-list-item"></li>
            </ul>
            <div class="chat-content-box"></div>
        </div>
    </div>
</template>

<script>
    export default{
        data() {
            return {

            }
        },
        methods: {
            clickIcon() {
                this.$emit('closeChat');
            }
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
        .chat-header{
            width:100%;
            height: 40px;
            color: #fff;
            text-align: center;
            position: relative;
            line-height: 40px;
            box-sizing: border-box;
            border-bottom: 1px solid #ffffff6e;
            font-size: 16px;
            a{
                color: #fff;
            }
            .chat-handel{
                position: absolute;
                right: 0;
                top:0;
                padding-right: 15px;
                i{
                    padding: 2px;
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
            .chat-conversation-list{
                width:20%;
                min-width:147.2px;
                box-sizing: border-box;
                border-right: 1px solid #ffffff6e;
            }
            .chat-content-box{
                width: 80%;
                min-width: 588.8px;
                box-sizing: border-box;
            }
        }
    }
</style>