<template>
    <div class="vchat-chatRoom">
        <div class="chat-header">
            <a>聊年第一群</a>
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
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-chatRoom{
        width:100%;
        height: 100%;
        .chat-header{
            width:100%;
            height: 40px;
            background-color: #27cac7;
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