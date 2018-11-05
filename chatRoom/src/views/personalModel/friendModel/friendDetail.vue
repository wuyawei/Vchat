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
                <p>
                </p>
                <p>{{friendInfo.code}}</p>
            </div>
        </el-carousel>
        <div class="vchat-Detail-container">
            <div class="Qr-dialog" :class="{active: showFriendQr}">
                <v-icon class="el-icon-circle-close-outline QrClose" @clickIcon="showFriendQr = false" color="#f5f5f5" :size="28" cursor="pointer"></v-icon>
            </div>
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
            getUserInfo() {
                let params = {
                    id: this.$route.params.id
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