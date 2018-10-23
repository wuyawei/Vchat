<template>
    <div class="vchatMessage">
        <ul>
            <li v-for="v in InfoList" :key="v['_id']" v-if="v.type === 'validate'">
                <span class="vchat-line1">{{v.state === 'friend' ? '验证消息：' + v.nickname + '申请加您为好友' : '验证消息：' + v.nickname + '申请加入' + v.groupName}}</span>
                <span class="time">{{v.time}}</span>
                <el-popover
                        placement="left"
                        width="400"
                        v-model="visible">
                    <div class="Validate-mes">
                        <div class="header">
                            <a class="vchat-photo">
                                <img :src="IMGURL + v.avatar" alt="">
                            </a>
                            <p>
                                <span>{{v.nickname}}</span>
                                <span class="signature">{{v.signature}}</span>
                            </p>
                        </div>
                        <div class="info">
                            附加消息：<span>{{v.mes}}</span>
                        </div>
                        <div class="footer">
                            <button class="vchat-button-mini info" @click="refuse(v)">拒绝</button>
                            <button class="vchat-button-mini" @click="agree(v)">同意</button>
                        </div>
                    </div>
                    <span slot="reference" @click="visible = !visible" class="look">查看</span>
                </el-popover>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default{
        name: 'vchatMessage',
        data() {
            return {
                IMGURL: process.env.IMG_URL,
                visible: false,
                InfoList: []
            }
        },
        sockets: {
            getSystemMessages(r) { // 获取系统消息
                if (r.length) {
                    this.$emit('NewMes', r[r.length - 1]);
                }
                this.InfoList = r;
            },
            takeValidate(r) {
                this.$emit('NewMes', r);
                this.InfoList.push(r);
            }
        },
        watch: {
            currSation: { // 当前会话
                handler(v) {
                    if (v) {
                        this.$socket.emit('setReadStatus', {roomid: v.id, name: this.user.name});
                        this.$store.commit('setUnRead', {roomid: v.id, clear: true});
                        this.$socket.emit('getSystemMessages', {roomid: v.id});
                    }
                },
                deep: true,
                    immediate: true
            }
        },
        computed: {
            ...mapState(['user', 'Vchat'])
        },
        methods: {
            agree(v) {
                this.$socket.emit('agreeValidate', v);
                this.visible = !this.visible;
            },
            refuse() {
                this.visible = !this.visible;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchatMessage{
        width:100%;
        padding: 15px 30px 10px 15px;
        box-sizing: border-box;
        overflow-y: auto;
        li{
            text-align: left;
            color: #fff;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            padding: 5px 10px;
            margin-bottom: 5px;
            box-sizing: border-box;
            background-color: rgba(0,0,0,0.3);
            span.time {
                font-size: 12px;
                color: #aaaaaa;
                margin-left: 10px;
            }
            span.look{
                color: #27cac7;
                font-size: 12px;
                cursor: pointer;
                opacity: 0.8;
                min-width: 24px;
                margin-left: 15px;
            }
            span.look:hover{
                opacity: 1;
            }
        }
    }
</style>