<template>
    <div class="vChat-comm-list">
        <p class="back">
            <router-link to="/personalMain/group/ownGroup">
                <v-icon name="fanhui" cursor="pointer"></v-icon>
            </router-link>
            <span>查找群聊</span>
        </p>
        <div class="vChat-list-search" :class="{active: is_focus}">
            <input type="text" placeholder="群号 / 群名称" @focus="focus" @blur="blur" v-model="huntKey">
            <i class="el-icon-search"></i>
        </div>
        <ul class="search-group-list">
            <li v-for="v in 5" :key="v">
                <a href="javascript:;">
                    <img src="../../../assets/img/1.jpg" alt="">
                </a>
                <div>
                    <p>
                        飞翔的鸟
                    </p>
                    <p>
                        <i class="icon-zhanghao iconfont"></i>
                        1221
                    </p>
                    <p>
                        德玛西亚大道群啊啊啊
                    </p>
                </div>
            </li>
        </ul>
        <p class="Vchat-no-have">
            没有找到想要的，<router-link to="/personalMain/group/setGroup">新建</router-link> 一个吧！
        </p>
    </div>
</template>

<script>
    import api from '@/api';
    export default{
        name: 'searchGroup',
        data() {
            return {
                is_focus: false,
                huntKey: '' // 搜索参数
            }
        },
        methods: {
            focus() {
                this.is_focus = true;
            },
            blur() {
                this.is_focus = false;
            },
            huntGroups() {
                let params = {
                    key: this.huntKey,
                    offset: 1,
                    limit: 8
                };
                api.huntGroups(params).then(r => {

                })
            }
        },
        mounted() {
            this.huntGroups();
        }
    }
</script>

<style lang="scss" scoped>
    .vChat-comm-list{
        width:100%;
        height: 100%;
        .back{
            display: flex;
            justify-content: center;
            padding: 10px 15px;
            box-sizing: border-box;
            position: relative;
            margin-bottom: 10px;
            span{
                color: #27cac7;
            }
            i{
                position: absolute;
                left:5px;
                top:10px;
                display: inline-block;
                width:24px;
                height: 24px;
                cursor: pointer;
            }
            i:hover{
                color: #1fbeca;
            }
        }
        .vChat-list-search{
            width:80%;
            height: 42px;
            position: relative;
            transition: all 0.5s;
            margin-bottom: 20px;
            input{
                position: absolute;
                left:0;
                width:calc(100% - 21px);
                height: 100%;
                border: none;
                border-bottom: 1px solid #d5d5d5;
                outline: none;
                padding-left: 10px;
                box-sizing: border-box;
            }
            i{
                width:42px;
                height: 42px;
                position: absolute;
                right: 0;
                top:0;
                text-align: center;
                line-height: 42px;
                font-size: 24px;
                display: block;
                cursor: pointer;
                color: #FFF;
                background-color: #27cac7;
                border-radius: 50%;
            }
        }
        .vChat-list-search.active{
            width:100%;
        }
        .search-group-list{
            width:100%;
            max-height: calc(100% - 150px);
            overflow-y: auto;
            margin-bottom: 10px;
            li{
                width:100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px 15px 6px;
                box-sizing: border-box;
                border-bottom: 1px solid #e5e5e5;
                cursor: pointer;
                >a{
                    width:46px;
                    height: 46px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 10px;
                    border: 1px solid #d5d5d5;
                    img{
                        width:46px;
                    }
                }
                >div{
                    width:calc(100% - 52px);
                    font-size: 12px;
                    color: #a3a3a3;
                    text-align: left;
                    p{
                        text-align: left;
                        margin-bottom: 5px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    p:nth-of-type(1) {
                        font-size: 14px;
                        color: #323232;
                    }
                    p:nth-of-type(2) {
                        background-color: #1fbeca;
                        color: #fff;
                        border-radius: 2px;
                        display: inline-block;
                        padding: 1px 5px;
                        line-height: 16px;
                        font-size: 12px;
                        i{
                            font-size: 14px;
                            vertical-align: middle;
                        }
                    }
                }
            }
            li:hover{
                background-color: #cdeff8;
                opacity: 0.8;
            }
        }
    }
</style>