<template>
    <div class="login">
        <div class="input-box">
            <input type="text" placeholder="输入昵称" v-model="username">
            <div class="animation-box">
                <div class="btn-box" :class="{active: showadd}">
                    <button @click="toChat">创建聊天室</button>
                    <button @click="chose">加入已有聊天室</button>
                </div>
                <div class="select-box" :class="{active: !showadd}">
                    <select name="" id="">
                        <option value="">醉了醉了</option>
                        <option value="">101聊天室</option>
                        <option value="">102聊天室</option>
                    </select>
                    <button @click="sure">确定</button>
                    <span>没有合适的？<i @click="back">返回</i> 创建</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../api';
    export default {
        name: 'login',
        username: '',
        data() {
            return {
                showadd: false,
                username: ''
            }
        },
        sockets:{
            connect: function(val){
                console.log('连接成功');
            },
            customEmit: function(val){
                console.log('连接失败');
            }
        },
        methods: {
            toChat() {
                this.$socket.emit('login', {username: this.username});
                window.localStorage.username = this.username;
                this.$router.push('/chat')
            },
            chose() {
                this.showadd = true;
            },
            sure() {
                this.showadd = false;
            },
            back() {
                this.showadd = false;
            }
        },
        mounted() {
            /*fetch('/api/getUser').then(res=>res.json()).then(r=>{
                if(r.code === 0){
                    console.log(r);
                }
            });*/
            api.getUser().then(r => {console.log(r)});
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .input-box{
        margin-top: 10%;
        display: flex;
        justify-content: center;
    }
    .input-box input{
        width:350px;
        height: 42px;
        border: 2px solid #1dd2f0;
        padding-left: 15px;
        border-radius: 5px;
        outline: none;
    }
    .input-box button{
        height: 46px;
        padding: 0 15px;
        background-color: #2c95ff;
        color: #fff;
        border: none;
        cursor: pointer;
        margin-left: 20px;
        border-radius: 5px;
    }
    .input-box select{
        width:250px;
        height: 42px;
        border: 2px solid #cbf0e8;
        padding-left: 15px;
        border-radius: 5px;
        outline: none;
    }
    .animation-box{
        width:400px;
        height: 70px;
        overflow: hidden;
        position: relative;
    }
    .btn-box{
        transition: left 0.5s;
        position: absolute;
        left:0;
    }
    .btn-box.active{
        left:-280px;
    }
    .select-box{
        width:400px;
        transition: left 0.5s;
        position: absolute;
        left:0;
    }
    .select-box.active{
        display: inline-block;
        left:400px;
    }
    .select-box span{
        display: inline-block;
        color: #eee;
        font-size: 13px;
        margin-top: 5px;
    }
    .select-box span i{
        color: #00b4f0;
        font-style: normal;
        cursor: pointer;
    }
</style>
