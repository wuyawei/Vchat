<template>
    <div class="vChat-comm-list ownGroup">
        <h3>
            <v-icon name="qunzu" :size="26" color="#27cac7"></v-icon>我的群聊
            <el-dropdown trigger="click" >
                <v-icon cursor="pointer" :size="24"></v-icon>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>新建群聊</el-dropdown-item>
                    <el-dropdown-item>查找群聊</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </h3>
        <ul class="group-list" v-if="Groups.length">
            <li v-for="v in Groups" :key="v._id" :class="{active: currGroup === v.groupId._id}" @click="setCurrGroup(v.groupId._id)">
                <a href="javascript:;">
                    <img :src="'http://localhost:9988' + v.groupId.img" alt="">
                </a>
                <div>
                    <p>
                        <span>{{v.groupId.title}}</span>
                        <el-badge :value="12" class="item">
                        </el-badge>
                    </p>
                    <p>
                        <span>{{v.groupId.desc}}</span>
                        <span>3分钟</span>
                    </p>
                </div>
            </li>
        </ul>
        <v-nodata v-else>
            <p class="Vchat-no-have">
                还没有加入群聊哦，去 <span @click="toMore">查找</span>， 去<span @click="newSet">新建</span>。
            </p>
        </v-nodata>
    </div>
</template>

<script>
    import api from '@/api';
    export default{
        name: 'ownGroup',
        props: ['setOk'],
        data() {
            return {
                is_focus: false,
                Groups: [],
                currGroup: ''
            }
        },
        watch: {
            setOk(f) {
                if (f) {
                    this.getMyGroup();
                }
            },
            currGroup(i) {
                this.$emit('currGroup', i);
            }
        },
        methods: {
            setCurrGroup(id) {
                this.currGroup = id;
            },
            getMyGroup() {
                api.getMyGroup().then(r => {
                    if (r.code === 0) {
                        this.Groups = r.data;
                        this.currGroup = this.Groups[0] ? this.Groups[0].groupId._id : '';
                    }
                });
            },
            toMore() {
                this.$emit('tomore')
            },
            newSet() {
                this.$emit('newSet')
            }
        },
        mounted() {
            this.getMyGroup();
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
            position: relative;
            i{
                font-size: 26px;
                margin-right: 5px;
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
                    border: 1px solid #d5d5d5;
                    box-sizing: border-box;
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
            li.active{
                background-color: #cdeff8;
                opacity: 0.8;
            }
        }
    }
</style>