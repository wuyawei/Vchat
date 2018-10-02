<template>
    <div class="vchat-groupDetail">
        <v-apheader :title="groupInfo.title" back="/personalMain/group/ownGroup" bgColor="transparent" class="vchat-groupDetail-header"></v-apheader>
        <el-carousel trigger="click" height="220px" arrow="never" indicator-position="none">
            <el-carousel-item v-for="item in 1" :key="item">
                <div class="groupImage-bg"></div>
                <a class="groupImage-a" :style="{backgroundImage: 'url('+ IMG_URL + groupInfo.img +')'}">
                </a>
            </el-carousel-item>
        </el-carousel>
        <div class="vchat-groupDetail-container">
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
        .groupImage-bg{
            width:100%;
            height: 100%;
            background-color: rgba(0,0,0,0.3);
            position: absolute;
            left:0;
            top:0;
            z-index: 2;
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
    }
</style>