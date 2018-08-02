<template>
    <div class="chat">
        <div class="chat-l">
            <div class="chat-l-top">
                <ul ref="msglist">
                    <li :class="[{other: v.type==='other'},{mine: v.type==='mine'},{org: v.type==='org'}]" v-for="(v,i) in List" :key="i">
                        <template v-if="v.type==='other'">
                            <p>{{v.name ? v.name.slice(0,1) : ''}}</p>
                            <div>
                                <span>{{v.name}}<i> 2018-06-07 14:12:56 </i></span>
                                <p>
                                    {{v.mes}}
                            </p>
                            </div>
                        </template>
                        <template v-if="v.type==='mine'">
                            <div>
                                <span>{{v.name}}<i> 2018-06-07 14:18:56 </i></span>
                                <p>
                                    {{v.mes}}
                            </p>
                            </div>
                            <p>{{v.name ? v.name.slice(0,1) : ''}}</p>
                        </template>
                        <template v-if="v.type==='org'">
                            系统消息：<span>{{v.name}}</span>加入聊天室！
                        </template>
                    </li>
                </ul>
            </div>
            <div class="chat-l-bottom">
                <textarea v-model="mes"></textarea>
                <span @click="send">发送</span>
            </div>
        </div>
        <div class="chat-r">
            <h4>群成员 ({{groupUsers.length}})</h4>
            <ul>
                <li v-for="v in groupUsers" :key="v.userId._id">
                    <p>
                        <img :src="v.userId.photo || '/static/img/5.a9ad8f2.jpg'" alt="">
                    </p>
                    <span>{{v.userName}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    export default {
        name: 'chat',
        props: ['currGroup'],
        data() {
            return {
                List: [],
                name: window.localStorage.name,
                mes: '',
                groupUsers: []
            }
        },
        watch: {
            List(list){
                console.log('list', list);
                this.$refs['msglist'].scrollTop = this.$refs['msglist'].scrollHeight + 200;
            },
            currGroup(id) {
                if (id) {
                    this.getGroupUsers();
                }
            }
        },
        sockets:{
            connect: function(val){
            },
            customEmit: function(val){
            },
            org(r) {
                this.List.push(Object.assign({},r, {type: 'org'}));
            },
            mes(r) {
                this.List.push(Object.assign({},r, {type: 'other'}));
            }
        },
        methods: {
            exit() {
                this.$router.push('/')
            },
            send() {
                let val = {name: this.name, mes: this.mes};
                this.List.push(Object.assign({},val,{type: 'mine'}));
                this.$socket.emit('mes', this.$socket.id, val);
                this.mes = '';
            },
            getGroupUsers() {
                let params = {
                    groupId: this.currGroup
                };
                api.getGroupUsers(params).then(r => {
                    if (r.code === 0) {
                        this.groupUsers = r.data;
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .chat{
        width:100%;
        height: 100%;
        margin: auto;
        display: flex;
        justify-content: flex-start;
    }
    .chat-l:before{
        content: '';
        display: block;
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height: 100%;
        background-image: url(../../assets/img/6.jpg);
        background-repeat: no-repeat;
        background-size: cover;
    }
    .chat-l{
        width:78%;
        min-width:620px;
        min-height: 500px;
        position: relative;
        background-color: rgba(0,0,0,0.8);
    }
    .chat-r{
        width:22%;
        min-width:200px;
        min-height: 500px;
        background-color: rgba(0,0,0,0.5);
        color: #ddd;
    }
    .chat-r h4{
        padding: 10px;
    }
    .chat-l-top{
        width:100%;
        height: calc(100% - 220px);
        min-height: 320px;
        position: relative;
    }
    .chat-l-top ul{
        width:100%;
        height: 100%;
        overflow: auto;
        padding: 5px;
        box-sizing: border-box;
        position: relative;
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
        position: absolute;
        left:10px;
    }
    .mine{
        position: absolute;
        right: 10px;
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
        min-height: 180px;
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
        height: calc(100% - 50px);
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
        background-color: #27cac7;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 42px;
        border-radius: 50%;
        margin-right: 10px;
        overflow: hidden;
        border: 1px solid #d5d5d5;
        img{
            width:100%;
        }
    }
    .chat-r ul li span{
        width:135px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        text-align: left;
    }
</style>
