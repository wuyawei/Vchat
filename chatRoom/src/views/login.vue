<template>
    <div class="vchat-login">
        <div class="logo" :class="{active: showSign}">
            <h3 class="title">Hi, vChat !</h3>
            <span class="begain" @click="experience">立即体验</span>
        </div>
        <div class="sign" v-if="showSign">
            <div class="title">
                <span :class="{active: islogin}" @click="choose(true)">登录</span>
                <span :class="{active: !islogin}" @click="choose(false)">注册</span>
            </div>
            <el-form ref="signForm" label-width="80px" class="signForm" :rules="signRules" :model="signForm">
                <el-form-item prop="name">
                    <el-input v-model="signForm.name" placeholder="账号">
                        <i class="iconfont icon-zhanghao" slot="prepend"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="pass">
                    <el-input v-model="signForm.pass" placeholder="密码" type="password">
                        <i class="iconfont icon-mima3" slot="prepend"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="repass" v-if="!islogin">
                    <el-input v-model="signForm.repass" placeholder="确认密码" type="password">
                        <i class="iconfont icon-mima2" slot="prepend"></i>
                    </el-input>
                </el-form-item>
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
            let validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    let reg = /^[a-zA-Z0-9_]{2,8}$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入2~8位数字字母下划线'));
                        return;
                    }
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    let reg = /^[a-zA-Z0-9]{6,12}$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入6~12位数字字母组合'));
                        return;
                    }
                    callback();
                }
            };
            let validateRePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else {
                    if (value === this.signForm.pass) {
                        callback(new Error('两次密码输入不一致'));
                        return;
                    }
                    callback();
                }
            };
            return {
                signForm: {
                    name: '',
                    pass: '',
                    repass: ''
                },
                islogin: true, // 登录 or 注册
                showSign: false, // 登录框显示
                signRules: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    repass: [
                        { validator: validateRePass, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            choose(flag) {
                this.$refs['signForm'].resetFields();
                this.islogin = flag;
            },
            experience() {
                this.showSign = true;
            },
            enter(f) {
                this.$refs['signForm'].validate((valid) => {
                    if (valid) {
                        if (f) {
                        } else {
                            this.signUp();
                        }
                    } else {
                        return false;
                    }
                });
            },
            login() {
                let params = {
                    name: this.name
                };
                api.login(params).then(r => {
                    if (r.code === 0) {
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
                this.$router.push('/personalMain');
            },
            signUp() {
                let params = {
                    name: this.name,
                    pass: this.pass
                };
                api.signUp(params).then(r => {
                    if (r.code === 0) {
                        this.$message.success('注册成功');
                    } else if (r.code === 1) {
                        this.$message.error('账号已存在')
                    } else {
                        this.$message.error('注册失败')
                    }
                });
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
    .vchat-login{
        width:100%;
        height: 100%;
        background-image: url(../assets/img/1.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position-y: -140px;
        overflow: hidden;
    }
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
        color: #1fbeca;
    }
    .sign button{
        width:100%;
        background-color: #1fbeca;
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
