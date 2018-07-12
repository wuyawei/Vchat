<template>
    <div class="login">
        <div class="logo" :class="{active: showSign}">
            <h3 class="title">Hi, vChat !</h3>
            <span class="begain" @click="experience">立即体验</span>
        </div>
        <div class="sign" v-if="showSign">
            <div class="title">
                <span :class="{active: islogin}" @click="choose(true)">登录</span>
                <span :class="{active: !islogin}" @click="choose(false)">注册</span>
            </div>
            <el-form ref="signForm" label-width="80px" class="signForm">
                <el-input v-model="name" placeholder="账号">
                    <i class="iconfont icon-zhanghao" slot="prepend"></i>
                </el-input>
                <el-input v-model="pass" placeholder="密码">
                    <i class="iconfont icon-mima3" slot="prepend"></i>
                </el-input>
                <el-input v-model="repass" placeholder="确认密码" v-if="!islogin">
                    <i class="iconfont icon-mima2" slot="prepend"></i>
                </el-input>
            </el-form>
            <button @click="enter(islogin)">{{islogin ? '登录' : '注册'}}</button>
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
                name: '',
                pass: '',
                repass: '',
                islogin: true, // 登录 or 注册
                showSign: false // 登录框显示
            }
        },
        methods: {
            choose(flag) {
                this.islogin = flag;
            },
            experience() {
                this.showSign = true;
            },
            enter(f) {
                if (f) {
                    this.$router.push('/roomList');
                } else {}
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

<style scoped lang="scss">
    .logo{
        margin-top: 15%;
        transform: translateY(0%);
        transition: transform 0.5s;
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
    }
    .logo.active{
        transform: translateY(-100%);
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
