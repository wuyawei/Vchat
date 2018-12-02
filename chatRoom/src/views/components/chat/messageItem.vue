<template>
    <div class="vchat-messageItem mes-box">
        <p v-if="type === 'other'" class="avatar">
            <img :src="IMG_URL + v.avatar" alt="">
        </p>
        <div v-if="type === 'other' || type === 'mine'" class="messageInfo">
            <p class="info">
                <span>{{v.nickname}}</span>
                <i>{{v.time}}</i>
            </p>
            <p v-if="v.style === 'emoji'" class="emoji">
                <img v-lazy="IMG_URL + v.emoji" alt="">
            </p>
            <p v-if="v.style === 'img'" class="image">
                <img v-lazy="IMG_URL + v.emoji" alt="" @dblclick="$emit('lookPhoto', v.emoji)" title="双击查看原图">
            </p>
            <div v-if="v.style === 'file'" class="file">
                <img src="../../../assets/img/file.png" alt="">
                <div>
                    <p :title="v.mes">{{v.mes.lastIndexOf('.') > 12 ? v.mes.slice(0, 12) + '...' + v.mes.slice(v.mes.lastIndexOf('.')) : v.mes}}</p>
                    <a :href="v.emoji" download v-if="type === 'other'">下载</a>
                    <p v-if="type === 'mine'">
                        发送成功
                        <v-icon class="el-icon-circle-check-outline" color="#67C23A"></v-icon>
                    </p>
                </div>
            </div>
            <p class="mes" v-if="v.style === 'mess'">{{v.mes}}</p>
        </div>
        <p v-if="type === 'mine'" class="avatar">
            <img :src="IMG_URL + v.avatar" alt="">
        </p>
    </div>
</template>

<script>
    export default{
        name: 'messageItem',
        props: ['type', 'v'],
        data() {
            return {
                IMG_URL: process.env.IMG_URL
            }
        }
    }
</script>

<style lang="scss">
</style>