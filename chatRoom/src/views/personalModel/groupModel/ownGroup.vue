<template>
    <div class="vchat-ownGroup vchat-noUser">
        <v-apheader title="我的群聊">
            <el-dropdown trigger="click" @command="handleCommand">
                <v-icon cursor="pointer" name="hanbaobao" color="#fff"></v-icon>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/main/personalMain/group/setGroup">新建群聊</el-dropdown-item>
                    <el-dropdown-item command="/main/personalMain/group/search">查找群聊</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </v-apheader>
        <div class="vchat-ownGroup-container" v-if="Groups.length" v-loading="loadingWait">
            <div class="group-list-box"  :class="{active: showList.indexOf('set') > -1}">
                <h3 @click="setShowList('set')">
                    <p>
                        <v-icon name="fanhui" :size="16" color="#b7b6b6" class="list-icon"></v-icon>
                        <span>我创建的</span>
                    </p>
                    <span>{{mySetGroups.length}}</span>
                </h3>
                <ul class="group-list">
                    <li v-for="v in mySetGroups" :key="v._id" @click="goGroupDetail(v.groupId._id)">
                        <a href="javascript:;">
                            <img :src="IMG_URL + v.groupId.img" alt="">
                        </a>
                        <div>
                            <p>
                                <span class="vchat-line1" :title="v.groupId.title">{{v.groupId.title}}</span>
                            </p>
                            <p>
                                <span :title="v.groupId.desc" class="vchat-line1">{{v.groupId.desc}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="group-list-box" :class="{active: showList.indexOf('join') > -1}">
                <h3 @click="setShowList('join')">
                    <p>
                        <v-icon name="fanhui" :size="16" color="#b7b6b6" class="list-icon"></v-icon>
                        <span>我加入的</span>
                    </p>
                    <span>{{myJoinGroups.length}}</span>
                </h3>
                <ul class="group-list">
                    <li v-for="v in myJoinGroups" :key="v._id" @click="goGroupDetail(v.groupId._id)">
                        <a href="javascript:;">
                            <img :src="IMG_URL + v.groupId.img" alt="">
                        </a>
                        <div>
                            <p>
                                <span class="vchat-line1" :title="v.groupId.title">{{v.groupId.title}}</span>
                            </p>
                            <p>
                                <span :title="v.groupId.desc" class="vchat-line1">{{v.groupId.desc}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <v-nodata v-else>
            <p class="vchat-no-have">
                还没有加入群聊哦，去 <router-link to="/main/personalMain/group/search">查找</router-link>， 去 <router-link to="/main/personalMain/group/setGroup">新建</router-link>。
            </p>
        </v-nodata>
    </div>
</template>

<script>
    import api from '@/api';
    import vApheader from '@/views/components/header/vApheader';
    export default{
        name: 'ownGroup',
        data() {
            return {
                is_focus: false,
                IMG_URL: process.env.IMG_URL,
                loadingWait: false,
                Groups: [], // 群聊数据
                mySetGroups: [], // 我创建的
                myJoinGroups: [],// 我加入的
                showList: ['set']
            }
        },
        components: {
            vApheader
        },
        methods: {
            handleCommand(command) {
                this.$router.push(command);
            },
            goGroupDetail(id) {
                this.$router.push({name: 'groupDetail', params: {id: id}});
            },
            getMyGroup() {
                this.loadingWait = true;
                api.getMyGroup().then(r => {
                    if (r.code === 0) {
                        this.Groups = r.data;
                        this.filterGroups();
                        this.loadingWait = false;
                    }
                });
            },
            filterGroups() {
                this.mySetGroups = this.Groups.filter(v => v.holder === 1);
                this.myJoinGroups = this.Groups.filter(v => v.holder !== 1);
            },
            setShowList(v) {
                if (this.showList.indexOf(v) > -1) {
                    this.showList.splice(this.showList.indexOf(v), 1);
                } else {
                    this.showList.push(v);
                }
            }
        },
        mounted() {
            this.getMyGroup();
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-ownGroup{
        width:100%;
        height: 100%;
        .vchat-ownGroup-container{
            width:100%;
            padding-top: 10px;
            height: calc(100% - 40px);
            overflow-y: auto;
            box-sizing: border-box;
            .group-list-box{
                margin-bottom: 10px;
                height: 32px;
                overflow: hidden;
                h3{
                    font-weight: 400;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 15px;
                    font-size: 14px;
                    color: #323232;
                    line-height: 32px;
                    margin-bottom: 5px;
                    cursor: pointer;
                    .list-icon{
                        transition: transform 0.2s;
                        transform: rotate(0deg);
                    }
                    >span{
                        color: #acabab;
                        font-size: 12px;
                    }
                }
                .group-list{
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
                                    max-width: 160px;
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
            .group-list-box.active{
                height: auto;
                h3{
                    .list-icon{
                        transform: rotate(-90deg);
                    }
                }
                .group-list{
                    animation: scaleH 0.6s cubic-bezier(.11,.74,.83,1.45);
                }
            }
            @keyframes scaleH {
                0% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(10%);
                }
                100% {
                    transform: translateY(0);
                }
            }
        }
    }
</style>