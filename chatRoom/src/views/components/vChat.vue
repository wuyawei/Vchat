<template>
    <div class="vchat-chatRoom">
        <div class="chat-header">
            <a>聊年第一群</a>
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
        border-radius: 5px;
        .chat-header{
            width:100%;
            height: 40px;
            background-color: #27cac7;
            color: #fff;
            text-align: center;
            position: relative;
            line-height: 40px;
            a{
                color: #fff;
            }
            .chat-handel{
                position: absolute;
                right: 0;
                top:0;
                padding-right: 15px;
            }
        }
        .chat-container{
            width:100%;
            height: calc(100% - 40px);
            display: flex;
            justify-content: flex-start;
            .chat-conversation-list{
                width:20%;
                min-width:148px;
                background-color: #ff0000;
            }
            .chat-content-box{
                width: 80%;
                min-width: 592px;
                background-color: #fff3c2;
            }
        }
    }
</style>