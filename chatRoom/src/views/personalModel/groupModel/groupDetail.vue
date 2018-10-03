<template>
    <div class="vchat-groupDetail">
        <v-apheader back="-1" bgColor="transparent" class="vchat-groupDetail-header">
            <v-icon name="erweima" color="#f5f5f5" cursor="pointer" @clickIcon="showGroupQr = true"></v-icon>
        </v-apheader>
        <el-carousel trigger="click" height="200px" arrow="never" indicator-position="none">
            <el-carousel-item v-for="item in 1" :key="item">
                <div class="groupImage-bg">
                    <p class="title">
                        {{groupInfo.title}}
                    </p>
                    <p>
                        {{groupInfo.code}}
                    </p>
                    <p>本群创建于{{createDate}}</p>
                    <p>
                        {{groupInfo.desc}}
                    </p>
                </div>
                <a class="groupImage-a" :style="{backgroundImage: 'url('+ IMG_URL + groupInfo.img +')'}">
                </a>
            </el-carousel-item>
        </el-carousel>
        <div class="vchat-groupDetail-container">
            <div class="group-users">
                <h3 class="group-users-title group-item">
                    <span>群聊成员</span>
                    <p class="many">
                        <span>共5人</span>
                        <v-icon name="enter" color="#d5d5d5"></v-icon>
                    </p>
                </h3>
                <ul class="group-users-liitte-list">
                    <li v-for="(v, i) in groupUsers" :key="v.code" v-if="i < 9">
                        <a class="vchat-photo">
                            <img :src="v.userId.photo" alt="">
                        </a>
                        <span class="vchat-line1">{{v.userId.nickname}}</span>
                    </li>
                </ul>
            </div>
            <div class="group-card group-item">
                <span>我的群名片</span>
                <p class="many">
                    <span>别跟我比可爱</span>
                    <v-icon name="enter" color="#d5d5d5"></v-icon>
                </p>
            </div>
            <div class="group-tag group-item">
                <span>群标签</span>
                <p>
                    <el-tag v-for="(v, i) in groupTag" :key="i" v-if="i < 3">{{v}}</el-tag>
                    <v-icon name="enter" color="#d5d5d5"></v-icon>
                </p>
            </div>
            <div class="group-managers group-item">
                <div>
                    <span>管理员</span>
                    <a v-for="(v, i) in managers" :key="v['_id']" class="vchat-photo" v-if="i < 3">
                        <img :src="v.userId.photo" alt="">
                    </a>
                </div>
                <p class="many">
                    <span>共5人</span>
                    <v-icon name="enter" color="#d5d5d5"></v-icon>
                </p>
            </div>

            <div class="group-button">
                <button @click="apply" class="vchat-full-button" v-if="true">申请加群</button>
                <button @click="quit" class="vchat-full-button" style="background-color: #f56c6c" v-else>退出群聊</button>
            </div>
        </div>
        <div class="groupQr-dialog" :class="{active: showGroupQr}">
            <v-icon class="el-icon-circle-close-outline QrClose" @clickIcon="showGroupQr = false" color="#f5f5f5" :size="28" cursor="pointer"></v-icon>
        </div>
    </div>
</template>

<script>
    import vApheader from '@/views/components/header/vApheader';
    import api from '@/api';
    import utils from '@/utils/utils';
    export default{
        data() {
            return {
                groupInfo: {},
                groupUsers: [],
                IMG_URL: process.env.IMG_URL,
                showGroupQr: false, // 二维码开关
                managers: [],
                groupTag: [] // 群标签
            };
        },
        components: {
            vApheader
        },
        computed: {
            createDate() {
                return utils.formatDate(new Date(this.groupInfo.createDate));
            }
        },
        methods: {
            getGroupInfo() {
                let params = {
                    groupId: this.$route.params.id
                };
                api.getGroupInfo(params).then(r => {
                    if (r.code === 0) {
                        this.groupInfo = r.data;
                        this.groupUsers = r.users;
                        this.managers = this.groupUsers.filter(v => v.holder === 1 || v.manager === 1);
                    }
                })
            },
            apply() {
                this.$router.push({name: 'applyGroup', params: {id: this.$route.params.id}});
            },
            quit() {}
        },
        mounted() {
            this.getGroupInfo();
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-groupDetail{
        width:100%;
        height: 100%;
        position: relative;
        background-color: #f5f5f5;
        .vchat-groupDetail-header{
            position: absolute;
            left:0;
            top:0;
            z-index: 3;
        }
        .groupImage-bg{
            width:100%;
            height: 100%;
            background-color: rgba(0,0,0,0.3);
            position: absolute;
            left:0;
            top:0;
            z-index: 2;
            padding: 50px 15px 0;
            box-sizing: border-box;
            p{
                color: #fff;
                font-size: 12px;
                text-align: left;
                margin-bottom: 5px;
            }
            p.title{
                font-size: 18px;
            }
        }
        .groupImage-a{
            width:100%;
            height: 100%;
            display: block;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
        .groupQr-dialog{
            width:100%;
            height: 0;
            overflow: hidden;
            background-color: rgba(0,0,0,0.6);
            position: absolute;
            left:0;
            top:0;
            z-index: 5;
            transition: height 0.5s cubic-bezier(0,.97,0,.98);
            .QrClose{
                position: absolute;
                right: 30px;
                top: 30px;
            }
        }
        .groupQr-dialog.active{
            height: 100%;
        }
        .vchat-groupDetail-container{
            width:100%;
            .group-item{
                display: flex;
                height: 38px;
                justify-content: space-between;
                align-items: center;
                font-weight: 400;
                padding: 8px 10px 8px 15px;
                box-sizing: border-box;
                background-color: #fff;
                i{
                    margin: 0;
                }
                .many{
                    color: #6D6D6D;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    span{
                        margin-right: 2px;
                    }
                }
            }
            .group-users{
                width:100%;
                background-color: #fff;
                color: #323232;
                box-sizing: border-box;
                margin-bottom: 5px;
                .group-users-title{
                    border-bottom: 1px solid #f5f5f5;
                    margin-bottom: 10px;
                    >span{
                        font-size: 16px;
                    }
                }
                .group-users-liitte-list{
                    width:100%;
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    li{
                        width:64px;
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 10px;
                        span{
                            max-width: 64px;
                            font-size: 12px;
                            color: #6D6D6D;
                        }
                    }
                }
            }
            .group-card{
                margin-bottom: 5px;
            }
            .group-tag{
                margin-bottom: 5px;
                >span{
                    font-size: 16px;
                    color: #323232;
                }
                >p{
                    display: flex;
                    justify-content: flex-start;
                }
            }
            .group-managers{
                justify-content: space-between;
                >div{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    a{
                        width:28px;
                        height: 28px;
                        margin-right: 5px;
                    }
                    span{
                        font-size: 16px;
                        color: #323232;
                        margin-right: 15px;
                    }
                }
            }
            .group-button{
                padding: 0 15px;
                box-sizing: border-box;
            }
        }
    }
</style>