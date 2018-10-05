<template>
    <div class="vchat-item">
        <div class="vchat-item-header">
            <span :class="{active: currNav === i}" v-for="(v, i) in navList" :key="i" @click="setCurrNav(i)">{{v}}</span>
        </div>
        <div class="vchat-item-container">
            <div class="container-chat">
                <div class="chat-room"></div>
                <div class="chat-send">
                    <div class="tool">
                        <v-icon name="biaoqing1" color="#27cac7" cursor="pointer"></v-icon>
                    </div>
                    <textarea></textarea>
                    <div class="enter">
                        <button class="vchat-button-mini info">清空</button>
                        <button class="vchat-button-mini">发送</button>
                    </div>
                </div>
            </div>
            <div class="container-handel">
                <div class="handel-notice">
                    <h3>群通知</h3>
                    <ul>
                        <li class="vchat-line1">【本群须知】嗨起来 </li>
                        <li class="vchat-line1">【公告】哈哈哈哈哈 </li>
                    </ul>
                </div>
                <div class="handel-member">
                    <h3>
                        <span>群成员 ( 699 )</span>
                        <v-icon class="el-icon-search" color="#fff" :size="18" @clickIcon="spreadInput"></v-icon>
                    </h3>
                    <input type="text" v-show="spread" ref="searchMember">
                    <ul>
                        <li>
                            <a class="vchat-photo">
                                <img src="../../assets/img/zwsj5.png" alt="">
                            </a>
                            <span class="vchat-line1">江三疯</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'chatItem',
        data() {
            return {
                navList: ['聊天', '公告'],
                currNav: 0,
                spread: false
            }
        },
        methods: {
            setCurrNav(i) {
                this.currNav = i;
            },
            spreadInput() {
                this.spread = !this.spread;
                this.$nextTick(_ => {
                    this.$refs['searchMember'].focus();
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-item{
        width:100%;
        height: 100%;
        .vchat-item-header{
            width:100%;
            height: 32px;
            text-align: left;
            font-size: 16px;
            padding: 0 10px;
            box-sizing: border-box;
            background-color: rgba(0,0,0,0.2);
            span{
                display: inline-block;
                height: 100%;
                line-height: 32px;
                padding: 0 5px;
                margin-right: 10px;
                box-sizing: border-box;
                color: #cccccc;
                cursor: pointer;
                position: relative;
            }
            span:before{
                content: '';
                display: block;
                width:100%;
                height: 2px;
                background-color: #f5f5f5;
                position: absolute;
                left:0;
                bottom:0;
                transition: transform 0.2s;
                transform: scale(0);
            }
            span:hover{
                color: #fff;
            }
            span.active{
                color: #fff;
            }
            span.active:before{
                transform: scale(1);
            }
        }
        .vchat-item-container{
            width:100%;
            height: calc(100% - 32px);
            display: flex;
            justify-content: flex-start;
            .container-chat{
                width:72%;
                height: 100%;
                min-width: 423.936px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255,255,255,0.3);
                .chat-room{
                    width:100%;
                    height: 65%;
                    min-height: 252.2px;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgba(255,255,255,0.3);
                    overflow-y: auto;
                }
                .chat-send{
                    width:100%;
                    height: 35%;
                    min-height: 135.8px;
                    box-sizing: border-box;
                    .tool{
                        width:100%;
                        height: 28px;
                        line-height: 28px;
                        text-align: left;
                        background-color: rgba(0,0,0,0.3);
                        padding: 0 10px;
                        box-sizing: border-box;
                        i{
                            margin: 0 5px 0 0;
                        }
                    }
                    textarea{
                        width:100%;
                        height: calc(100% - 70px);
                        background-color: transparent;
                        resize: none;
                        outline: none;
                        color: #fff;
                        font-size: 14px;
                        padding: 5px 10px;
                        box-sizing: border-box;
                        border: none;
                    }
                    .enter{
                        width:100%;
                        height: 32px;
                        display: flex;
                        justify-content: flex-end;
                        button{
                            margin-right: 10px;
                        }
                    }
                }
            }
            .container-handel{
                width:28%;
                min-width: 164.864px;
                height: 100%;
                h3{
                    color: #fff;
                    font-weight: normal;
                    font-size: 16px;
                    text-align: left;
                    line-height: 16px;
                    margin-bottom: 5px;
                    i{
                        float: right;
                    }
                }
                .handel-notice{
                    width:100%;
                    height: 40%;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgba(255,255,255,0.3);
                    padding: 8px 10px;
                    overflow-y: auto;
                    color: #d5d5d5;
                    font-size: 12px;
                    text-align: left;
                    ul{
                        overflow-y: auto;
                        li{
                            margin-bottom: 2px;
                        }
                        li:hover{
                            padding: 2px;
                            box-sizing: border-box;
                            background-color: rgba(255,255,255,0.5);
                            cursor: default;
                        }
                    }
                }
                .handel-member{
                    width:100%;
                    height: 60%;
                    box-sizing: border-box;
                    padding: 8px 10px;
                    color: #fff;
                    font-size: 12px;
                    ul{
                        overflow-y: auto;
                    }
                    input{
                        box-sizing: border-box;
                        width:100%;
                        border: 1px solid #d5d5d5;
                        padding-left: 5px;
                        outline: none;
                        color: #323232;
                    }
                    li{
                        padding: 5px 0;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        span{
                            min-width: 110px;
                            text-align: left;
                        }
                    }
                    a{
                        width:26px;
                        min-width: 26px;
                        height: 26px;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
</style>