<template>
    <div class="vchat-Detail">
        <v-apheader back="-1" bgColor="transparent" class="vchat-Detail-header">
            <v-icon name="erweima" color="#f5f5f5" cursor="pointer" @clickIcon="showGroupQr = true"></v-icon>
        </v-apheader>
        <el-carousel trigger="click" height="200px" arrow="never" indicator-position="none">
            <el-carousel-item v-for="item in 1" :key="item">
                <div class="DetailImage-bg">
                    <p class="title">
                    </p>
                    <p>
                    </p>
                    <p>本群创建于</p>
                    <p>
                    </p>
                </div>
                <a class="DetailImage-a" :style="{backgroundImage: 'url('+ IMG_URL + groupInfo.img +')'}">
                </a>
            </el-carousel-item>
        </el-carousel>
        <div class="vchat-Detail-container">
            <div class="Qr-dialog" :class="{active: showQr}">
                <v-icon class="el-icon-circle-close-outline QrClose" @clickIcon="showQr = false" color="#f5f5f5" :size="28" cursor="pointer"></v-icon>
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
                showQr: false, // 二维码开关
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
                this.$router.push({name: 'applyGroup', params: {id: this.holderId}, query: {groupName: this.groupInfo.title, groupId: this.$route.params.id}});
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @import "../vchatDetail";
</style>