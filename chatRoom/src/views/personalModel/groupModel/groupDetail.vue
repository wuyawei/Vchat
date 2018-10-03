<template>
    <div class="vchat-groupDetail">
        <v-apheader back="/personalMain/group/ownGroup" bgColor="transparent" class="vchat-groupDetail-header">
            <v-icon name="erweima" class="groupQr" color="#f5f5f5" cursor="pointer" @clickIcon="showGroupQr = true"></v-icon>
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
                    <p>
                        简介：{{groupInfo.desc}}
                    </p>
                </div>
                <a class="groupImage-a" :style="{backgroundImage: 'url('+ IMG_URL + groupInfo.img +')'}">
                </a>
            </el-carousel-item>
        </el-carousel>
        <div class="vchat-groupDetail-container">
        </div>
        <div class="groupQr-dialog" :class="{active: showGroupQr}">
            <v-icon class="el-icon-circle-close-outline QrClose" @clickIcon="showGroupQr = false" color="#f5f5f5" :size="28" cursor="pointer"></v-icon>
        </div>
    </div>
</template>

<script>
    import vApheader from '@/views/components/header/vApheader';
    import api from '@/api';
    export default{
        data() {
            return {
                groupInfo: {},
                groupUsers: [],
                IMG_URL: process.env.IMG_URL,
                showGroupQr: false // 二维码开关
            };
        },
        components: {
            vApheader
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
                    }
                })
            }
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
        .vchat-groupDetail-header{
            position: absolute;
            left:0;
            top:0;
            z-index: 3;
        }
        .groupQr{
            position: absolute;
            right: 15px;
            top:10px;
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
        .vchat-groupDetail-container{
            width:100%;
            padding: 0 15px;
            box-sizing: border-box;
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
    }
</style>