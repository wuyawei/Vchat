<template>
    <div class="vchat-messageLog"
         v-loading="chatLoading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div class="messageLog-container">
            <message-item type="other" @lookPhoto="lookPhoto" :v="v" v-for="(v, i) in messageLog" :key="i" class="other" v-if="v.type !== 'org'"></message-item>
        </div>
        <div class="page" v-if="total>0">
            <el-pagination
                    layout="prev, pager, next"
                    :current-page.sync="offset"
                    @current-change="getMessageLog"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import messageItem from './messageItem.vue';
    import api from '@/api';
    export default{
        name: 'messageLog',
        props: ['currSation', 'currNav'],
        data() {
            return {
                messageLog: [],
                offset: 1,
                limit: 5,
                total: 0,
                chatLoading: false
            }
        },
        watch: {
            currSation: { // 当前会话
                handler(v) {
                    if (!v.id) {
                        this.messageLog = [];
                    }
                    if (this.currNav === 2 && (v.type === 'group' || v.type === 'friend')) {
                        this.getMessageLog();
                    }
                },
                deep: true,
                immediate: true
            },
            currNav(i) {
                if (i === 2 && this.currSation.id) {
                    this.total = 0;
                    this.getMessageLog();
                }
            }
        },
        methods: {
            lookPhoto(url) {
                this.$emit('lookPhoto', url);
            },
            getMessageLog() {
                this.chatLoading = true;
                this.messageLog = [];
                let params = {roomid: this.currSation.id, offset: this.offset, limit: this.limit};
                api.loadMoreMessages(params).then(r => {
                    if (r.code === 0) {
                        this.messageLog = r.data;
                        this.total = r.count;
                    }
                    this.chatLoading = false;
                })
            }
        },
        components: {
            messageItem
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-messageLog{
        width:100%;
        height: 100%;
        overflow-y: auto;
        padding: 15px;
        box-sizing: border-box;
        .messageLog-container{
            min-height: calc(100% - 32px);
        }
    }
</style>