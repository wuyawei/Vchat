<template>
    <div class="chat">
        <h3>111聊天室 <span @click="exit">[退出]</span></h3>
        <div class="chat-l">
            <div class="chat-l-top">
                <ul>
                    <li class="other">
                        <p>1</p>
                        <div>
                            <span>111 <i> 2018-06-07 14:12:56 </i></span>
                            <p>
                                看到明年房价不能分开就是
                            </p>
                        </div>
                    </li>
                    <li class="mine">
                        <div>
                            <span>222 <i> 2018-06-07 14:18:56 </i></span>
                            <p>
                                大不了广佛看了看大V发
                            </p>
                        </div>
                        <p>2</p>
                    </li>
                    <li class="other">
                        <p>1</p>
                        <div>
                            <span>111 <i> 2018-06-07 14:12:56 </i></span>
                            <p>
                                看到明年房价不能分开就是
                            </p>
                        </div>
                    </li>
                    <li class="mine">
                        <div>
                            <span>222 <i> 2018-06-07 14:18:56 </i></span>
                            <p>
                                大不了广佛看了看大V发
                            </p>
                        </div>
                        <p>2</p>
                    </li>
                    <li class="other">
                        <p>1</p>
                        <div>
                            <span>111 <i> 2018-06-07 14:12:56 </i></span>
                            <p>
                                看到明年房价不能分开就是
                            </p>
                        </div>
                    </li>
                    <li class="mine">
                        <div>
                            <span>222 <i> 2018-06-07 14:18:56 </i></span>
                            <p>
                                大不了广佛看了看大V发
                            </p>
                        </div>
                        <p>2</p>
                    </li>
                    <li class="org">
                        系统消息：<span>222</span>加入聊天室！
                    </li>
                </ul>
            </div>
            <div class="chat-l-bottom">
                <textarea name=""></textarea>
                <span>发送</span>
            </div>
        </div>
        <div class="chat-r">
            <h4>在线人数 (12)</h4>
            <ul>
                <li>
                    <p>1</p>
                    <span>111</span>
                </li>
                <li>
                    <p>2</p>
                    <span>非即日付款吧成绩单速度快办公费</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'chat',
        data() {
            return {}
        },
        methods: {
            exit() {
                this.$router.push('/')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .chat{
        width:850px;
        height: 600px;
        margin:  0 auto;
        display: flex;
        justify-content: flex-start;
        position: relative;
    }
    .chat h3{
        position: absolute;
        color: #fff;
        top:-50px;
    }
    .chat h3 span{
        color: #00b4f0;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
    }
    .chat h3 span:hover{
        color: #0EDCD0;
    }
    .chat-l:before{
        content: '';
        display: block;
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height: 100%;
        background-image: url(../assets/6.jpg);
        background-repeat: no-repeat;
        background-size: cover;
    }
    .chat-l{
        width:650px;
        height: 600px;
        position: relative;
        background-color: rgba(0,0,0,0.8);
    }
    .chat-r{
        width:200px;
        height: 600px;
        background-color: rgba(0,0,0,0.5);
        color: #ddd;
    }
    .chat-r h4{
        padding: 10px;
    }
    .chat-l-top{
        width:100%;
        height: 380px;
        position: relative;
    }
    .chat-l-top ul{
        width:100%;
        height: 100%;
        overflow: auto;
        padding: 5px;
        box-sizing: border-box;
    }
    .chat-l-top ul::-webkit-scrollbar, .chat-r ul::-webkit-scrollbar {
        display: none;
    }
    .other, .mine{
        width:300px;
        display: flex;
        justify-content: flex-start;
        margin: 20px 0;
    }
    .other{
        position: relative;
        left:0;
    }
    .mine{
        position: relative;
        left: 340px;
    }
    .other >p, .mine>p{
        width:42px;
        height: 42px;
        background-color: #00b4f0;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 42px;
        border-radius: 50%;
    }
    .other >div{
        text-align: left;
        margin-left: 10px;
        width:258px;
    }
    .mine>div{
        text-align: right;
        margin-right: 10px;
        width:258px;
    }
    .other >div span, .mine>div span{
        font-size: 16px;
    }
    .other >div span i, .mine >div span i{
        font-size: 12px;
        color: #767676;
    }
    .other >div >p, .mine >div >p{
        max-width:258px;
        background-color: #dfd9d9;
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
        text-align: left;
        word-wrap:break-word;
    }
    .other >div >p:before, .mine >div >p:after{
        width:0;
        height:0;
        content: '';
        display: block;
        position:absolute;
        top:10px;
    }
    .other >div >p:before{
        left:-10px;
        border-bottom: 5px solid #dfd9d9;
        border-left: 10px solid transparent;
        border-right: 5px solid transparent;
        border-top: 0;
        transform: rotate(45deg);
    }
    .mine >div >p:after{
        right:-10px;
        border-bottom: 5px solid #dfd9d9;
        border-left: 5px solid transparent;
        border-right: 10px solid transparent;
        transform: rotate(-45deg);
    }
    .org{
        width:100%;
        margin: 20px 0;
        font-size: 14px;
        color: #e4e4e4;
        background-color: #9d9d9d;
        box-sizing: border-box;
    }
    .org span{
        color: #ff9545;
        margin: 0 5px;
    }
    .chat-l-bottom{
        width:100%;
        height: 220px;
        position: relative;
    }
    .chat-l-bottom textarea{
        width:100%;
        height: 100%;
        background-color: rgba(255,255,255,0.3);
        resize: none;
        outline: none;
        color: #111;
        font-size: 18px;
        padding: 10px;
        box-sizing: border-box;
    }
    .chat-l-bottom span{
        position: absolute;
        right: 10px;
        bottom: 10px;
        background-color: #ff9545;
        color: #fff;
        padding: 5px 15px;
        border-radius: 3px;
        cursor: pointer;
    }
    .chat-l-bottom span:hover{
        background-color: #FFBC87;
    }
    .chat-r ul{
        width:100%;
        height: 100%;
        overflow: auto;
        padding: 5px;
        box-sizing: border-box;
    }
    .chat-r ul li {
        margin: 10px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .chat-r ul li p{
        width:42px;
        height: 42px;
        background-color: #00b4f0;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 42px;
        border-radius: 50%;
        margin-right: 5px;
    }
    .chat-r ul li span{
        width:135px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align: left;
    }
</style>
