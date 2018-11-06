<template>
    <div class="vchat-Detail">
        <v-apheader back="-1" bgColor="transparent" class="vchat-Detail-header">
            <v-icon name="erweima" color="#f5f5f5" cursor="pointer" @clickIcon="showFriendQr = true"></v-icon>
        </v-apheader>
        <el-carousel trigger="click" height="200px" arrow="never" indicator-position :autoplay="false">
            <el-carousel-item v-for="item in friendInfo.cover" :key="item">
                <a class="DetailImage-a" :style="{backgroundImage: 'url('+ IMG_URL + item +')'}">
                </a>
            </el-carousel-item>
            <div class="DetailImage-bg">
                <p class="title">
                    {{friendInfo.nickname}}
                </p>
                <p>{{friendInfo.signature}}</p>
            </div>
        </el-carousel>
        <div class="vchat-Detail-container friend-detail-container">
            <a class="detail-avatar">
                <img :src="IMG_URL + friendInfo.photo" alt="">
            </a>
            <div class="firend-info">
                <p>
                    Vchat：{{friendInfo.code}}
                </p>
                <p>
                    性别：{{friendInfo.sex === '1' ? '男' : friendInfo.sex === '2' ? '女' : '保密'}}
                </p>
                <p>
                    职业：学生
                </p>
            </div>
            <div class="detail-item">
                <span>照片墙</span>
                <p>
                    <v-icon name="enter" color="#d5d5d5"></v-icon>
                </p>
            </div>
            <div class="detail-button">
                <button @click="apply" class="vchat-full-button minor" v-if="!friendInfo.friend">加为好友</button>
                <button @click="remove" class="vchat-full-button error" v-else>删除好友</button>
            </div>
        </div>
        <div class="Qr-dialog" :class="{active: showFriendQr}">
            <v-icon class="el-icon-circle-close-outline QrClose" @clickIcon="showFriendQr = false" color="#f5f5f5" :size="28" cursor="pointer"></v-icon>
        </div>
    </div>
</template>

<script>
    import vApheader from '@/views/components/header/vApheader';
    import api from '@/api';
    import utils from '@/utils/utils';
    import { mapState } from 'vuex';
    export default{
        data() {
            return {
                IMG_URL: process.env.IMG_URL,
                friendInfo: {}, // user详情
                showFriendQr: false // 二维码开关
            }
        },
        components: {
            vApheader
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            apply() {
                this.$router.push({name: 'applyFriend', params: {id: this.holderId}, query: {}});
            },
            remove() {
            },
            getUserInfo() {
                let params = {
                    id: this.$route.params.id,
                    friend: true
                };
                api.getUserInfo(params).then(r => {
                    if (r.code === 0) {
                        this.friendInfo = r.data;
                    }
                })
            }
        },
        mounted() {
            this.getUserInfo();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../vchatDetail";
</style>