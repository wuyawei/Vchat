<template>
    <div class="vChat-comm-list">
        <h3><i class="icon-qunzu iconfont"></i>我的群聊</h3>
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
        <p class="more" @click="toMore">
            更多群聊 <i class="icon-enter iconfont"></i>
        </p>
    </div>
</template>

<script>
    export default{
        name: 'ownGroup',
        data() {
            return {
                is_focus: false
            }
        },
        methods: {
            toMore() {
                this.$emit('tomore')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vChat-comm-list{
        width:100%;
        height: 100%;
        h3{
            font-size: 14px;
            color: #27cac7;
            text-align: center;
            padding: 10px 15px 15px;
            box-sizing: border-box;
            font-weight: 400;
            i{
                font-size: 26px;
                margin-right: 5px;
                vertical-align: middle;
            }
        }
        .more{
            font-size: 14px;
            text-align: right;
            padding: 5px 15px;
            box-sizing: border-box;
            line-height: 18px;
            cursor: pointer;
            i{
                font-size: 18px;
                vertical-align: text-bottom;
            }
        }
        .more:hover{
            color: #1fbeca;
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
                        span{
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
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