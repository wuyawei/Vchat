<template>
    <div class="vChat-comm-list">
        <p class="back"><i class="iconfont icon-fanhui" @click="back"></i></p>
        <div class="vChat-list-search" :class="{active: is_focus}">
            <input type="text" placeholder="查找群聊" @focus="focus" @blur="blur">
            <i class="el-icon-search"></i>
        </div>
        <ul class="group-list">
            <li v-for="v in 5" :key="v">
                <a href="javascript:;">
                    <img src="../../assets/img/7.jpg" alt="">
                </a>
                <div>
                    <p>
                        <span>飞翔的鸟 </span>
                        <el-badge :value="12" class="item">
                        </el-badge>
                    </p>
                    <p>
                        <span>德玛西亚啊啊啊</span>
                        <span>3分钟</span>
                    </p>
                </div>
            </li>
        </ul>
        <p class="new-build">
            没有找到想要的，<router-link :to="'/'"> 新建 </router-link>一个吧！
        </p>
    </div>
</template>

<script>
    export default{
        name: 'searchGroup',
        data() {
            return {
                is_focus: false
            }
        },
        methods: {
            focus() {
                this.is_focus = true;
            },
            blur() {
                this.is_focus = false;
            },
            back() {
                this.$emit('back');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vChat-comm-list{
        width:100%;
        height: 100%;
        .back{
            text-align: left;
            padding: 10px 15px;
            box-sizing: border-box;
            i{
                display: block;
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
        .new-build{
            font-size: 12px;
            text-align: left;
            padding: 5px 15px;
            box-sizing: border-box;
            a{
                color: #27cac7;
            }
        }
        .group-list{
            width:100%;
            max-height: calc(100% - 100px);
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
                    width:42px;
                    height: 42px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 10px;
                    img{
                        width:42px;
                    }
                }
                >div{
                    width:calc(100% - 52px);
                    font-size: 12px;
                    color: #a3a3a3;
                    p{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 5px;
                    }
                    p:nth-of-type(1) {
                        span:first-child{
                            font-size: 14px;
                            color: #323232;
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