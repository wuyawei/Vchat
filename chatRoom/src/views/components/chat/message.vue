<template>
    <ul ref="msglist" class="vchat-message">
        <li :class="[{other: v.type==='other'},{mine: v.type==='mine'},{org: v.type==='org'}]" v-for="(v, i) in chatList" :key="i">
            <template v-if="v.type==='other'">
                <div class="mes-box">
                    <p>
                        <img :src="IMG_URL + v.avatar" alt="">
                    </p>
                    <div>
                        <p class="info">
                            <span>{{v.nickname}}</span>
                            <i>{{v.time}}</i>
                        </p>
                        <p v-if="v.style === 'emoji'" class="emoji">
                            <img :src="IMG_URL + v.emoji" alt="">
                        </p>
                        <p v-if="v.style === 'img'" class="image">
                            <img :src="IMG_URL + v.emoji" alt="" @dblclick="lookPhoto(v.emoji)" title="双击查看原图">
                        </p>
                        <div v-if="v.style === 'file'" class="file">
                            <img src="../../../assets/img/file.png" alt="">
                            <div>
                                <p :title="v.mes">{{v.mes.lastIndexOf('.') > 12 ? v.mes.slice(0, 12) + '...' + v.mes.slice(v.mes.lastIndexOf('.')) : v.mes}}</p>
                                <a :href="v.emoji" download>下载</a>
                            </div>
                        </div>
                        <p class="mes" v-if="v.style === 'mess'">{{v.mes}}</p>
                    </div>
                </div>
            </template>
            <template v-if="v.type==='mine'">
                <div class="mes-box">
                    <div>
                        <p class="info">
                            <span>{{v.nickname}}</span>
                            <i>{{v.time}}</i>
                        </p>
                        <p v-if="v.style === 'emoji'" class="emoji">
                            <img :src="IMG_URL + v.emoji" alt="">
                        </p>
                        <p v-if="v.style === 'img'" class="image">
                            <img :src="IMG_URL + v.emoji" alt="" @dblclick="lookPhoto(v.emoji)" title="双击查看原图">
                        </p>
                        <div v-if="v.style === 'file'" class="file">
                            <img src="../../../assets/img/file.png" alt="">
                            <div>
                                <p :title="v.mes">{{v.mes.lastIndexOf('.') > 12 ? v.mes.slice(0, 12) + '...' + v.mes.slice(v.mes.lastIndexOf('.')) : v.mes}}</p>
                                <p>
                                    发送成功
                                    <v-icon class="el-icon-circle-check-outline" color="#67C23A"></v-icon>
                                </p>
                            </div>
                        </div>
                        <p class="mes"  v-if="v.style === 'mess'">{{v.mes}}</p>
                    </div>
                    <p>
                        <img :src="IMG_URL + v.avatar" alt="">
                    </p>
                </div>
            </template>
            <template v-if="v.type==='org'">
                系统消息：<span>{{v.nickname}}</span>加入群聊！
            </template>
        </li>
    </ul>
</template>

<script>
    export default{
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-message{

    }
</style>