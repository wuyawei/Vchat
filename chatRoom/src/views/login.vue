<template>
    <div class="login">
        <!--<div class="input-box">-->
            <!--<input type="text" placeholder="输入昵称" v-model="name">-->
            <!--<div class="animation-box">-->
                <!--<div class="btn-box" :class="{active: showadd}">-->
                    <!--<button @click="toChat">创建聊天室</button>-->
                    <!--<button @click="chose">加入已有聊天室</button>-->
                <!--</div>-->
                <!--<div class="select-box" :class="{active: !showadd}">-->
                    <!--<select name="" id="">-->
                        <!--<option value="">醉了醉了</option>-->
                        <!--<option value="">101聊天室</option>-->
                        <!--<option value="">102聊天室</option>-->
                    <!--</select>-->
                    <!--<button @click="sure">确定</button>-->
                    <!--<span>没有合适的？<i @click="back">返回</i> 创建</span>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <div class="logo" :class="{active: showSign}">
            <h3 class="title">Hi, vChat !</h3>
            <span class="begain" @click="experience">立即体验</span>
        </div>
        <div class="sign" v-if="showSign">
            <div class="title">
                <span :class="{active: islogin}" @click="choose(true)">登录</span>
                <span :class="{active: !islogin}" @click="choose(false)">注册</span>
            </div>
            <el-form ref="signForm" label-width="100px" class="signForm">
                <el-input v-model="name" placeholder="账号">
                    <i class="el-icon-news" slot="prepend"></i>
                </el-input>
                <el-input v-model="pass" placeholder="密码">
                    <i class="el-icon-news" slot="prepend"></i>
                </el-input>
                <el-input v-model="repass" placeholder="确认密码" v-if="!islogin">
                    <i class="el-icon-news" slot="prepend"></i>
                </el-input>
            </el-form>
            <button>{{islogin ? '登录' : '注册'}}</button>
            <div class="login-foot" v-if="islogin">
                <span></span>
                第三方登录
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../api';
    export default {
        name: 'login',
        data() {
            return {
                showadd: false,
                name: '',
                pass: '',
                repass: '',
                islogin: true, // 登录 or 注册
                showSign: false // 登录框显示
            }
        },
        sockets:{
            connect: function(val){
                console.log(this.$socket.id);
                console.log('连接成功');
            },
            customEmit: function(val){
                console.log('连接失败');
            }
        },
        methods: {
            toChat() {
                if (!this.name) {
                    this.$message.error('登录名不能为空');
                    return;
                }
                let params = {
                    name: this.name
                };
                api.login(params).then(r => {
                    if(r.code === 0){
                        this.$message.success('加入成功');
                        this.$socket.emit('login', r.data);
                        window.localStorage.name = this.name;
                        this.$router.push('/chat')
                    } else if (r.code === 1) {
                        this.$message.error('用户名已存在')
                    } else {
                        this.$message.error('加入失败')
                    }
                });
            },
            chose() {
                this.showadd = true;
            },
            sure() {
                this.showadd = false;
            },
            back() {
                this.showadd = false;
            },
            choose(flag) {
                this.islogin = flag;
            },
            experience() {
                this.showSign = true;
            }
        },
        mounted() {
            /*fetch('/api/getUser').then(res=>res.json()).then(r=>{
                if(r.code === 0){
                    console.log(r);
                }
            });*/
            /*api.getUser().then(r => {console.log(r)});*/
        }
    }
</script>

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
    .logo{
        margin-top: 15%;
        transform: translateY(0%);
        transition: transform 0.5s;
    }
    .logo.active{
        transform: translateY(-100%);
    }
    h3.title{
        font-size: 38px;
        color: #fff;
        text-align: center;
        font-weight: 400;
        margin-bottom: 20px;
    }
    span.begain{
        color: #fff;
        font-size: 20px;
        animation: fide 2s infinite;
        cursor: pointer;
    }
    span.begain:hover{
        opacity: 1;
        animation-play-state:paused;
        -webkit-animation-play-state:paused;
    }
    @keyframes fide {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.3;
        }
        100% {
            opacity: 1;
        }
    }
    .sign{
        width: 350px;
        height: 350px;
        padding: 15px 25px 0;
        background-color: #fff;
        border-radius: 10px;
        box-sizing: border-box;
        position: absolute;
        left:50%;
        top:50%;
        margin-left: -175px;
        margin-top: -175px;
        animation: move 1.2s;
    }
    @keyframes move {
        0% {
            left: 0
        }
        40% {
            left: 50%;
        }
        40%, 100% {
            -webkit-transform: translate(0, 0);
        }
        50%,
        70%,
        90% {
            -webkit-transform: translate(-5px, -5px);
        }
        60%,
        80% {
            -webkit-transform: translate(5px, 5px);
        }
    }
    .sign .title{
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }
    .sign .title span{
        width:100px;
        border-right: 1px solid #d5d5d5;
        cursor: pointer;
    }
    .sign .title span:nth-of-type(2){
        border-right: none;
    }
    .sign .title span.active{
        color: #69c8f4;
    }
    .signForm .el-input{
        margin-bottom: 15px;
    }
    .sign button{
        width:100%;
        background-color: #69c8f4;
        border: none;
        outline: none;
        height: 36px;
        color: #fff;
        border-radius: 25px;
        cursor: pointer;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .sign button:hover{
        background-color: rgba(19, 164, 192, 0.61);
        color: #fff;
    }
    .login-foot{
        width:100%;
        font-size: 12px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #d5d5d5;
    }
    .login-foot span{
        width:100px;
        height: 1px;
        background-color: #d5d5d5;
        display: inline-block;
        margin: 0 10px;
    }
</style>
