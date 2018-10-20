<template>
    <div class="vchat-applyGroup">
        <v-apheader title="验证信息" back="-1">
            <!--<router-link :to="{name: 'sendGroupValidate'}">发送</router-link>-->
            <span @click="send">发送</span>
        </v-apheader>
        <el-form label-width="80px" class="introduceForm">
            <el-form-item label="个人介绍">
                <el-input v-model="introduce" placeholder="请输入不超过90个字" type="textarea" aotusize resize="none" :maxlength="90">
                </el-input>
            </el-form-item>
        </el-form>
        <i>{{introduce.length}}/90</i>
        <span>加群成功以后，个人介绍将展示给群友。</span>
    </div>
</template>

<script>
    import api from '@/api';
    import vApheader from '@/views/components/header/vApheader';
    import { mapState } from 'vuex';
    import utils from '@/utils/utils';
    export default{
        name: 'applyGroup',
        data() {
            return {
                introduce: ''
            }
        },
        computed: {
            ...mapState(['user', 'Vchat'])
        },
        components: {
            vApheader
        },
        methods: {
            send() {
                let val = {
                    name: this.user.name,
                    mes: this.introduce,
                    time: utils.formatTime(new Date()),
                    avatar: this.user.photo,
                    nickname: this.user.nickname,
                    signature: this.user.signature,
                    groupName: this.$route.query.groupName,
                    groupId: this.$route.query.groupId,
                    read: [],
                    roomid: this.$route.params.id + '-' + this.Vchat.id.split('-')[1],
                    state: 'group',
                    type: 'validate'
                };
                this.$socket.emit('sendValidate', val);
                this.$router.push({name: 'sendGroupValidate'});
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-applyGroup{
        width:100%;
        height: 100%;
        background-color: #f7f7f7;
        text-align: left;
        .introduceForm{
            .el-form-item{
                margin-bottom: 0;
            }
            .el-form-item__label{
                font-size: 12px;
                color: #d5d5d5;
            }
        }
        span{
            font-size: 13px;
            color: #b7b7b7;
            padding-left: 15px;
        }
        i{
            display: block;
            padding-right: 10px;
            box-sizing: border-box;
            font-style: normal;
            color: #6c6c6c;
            text-align: right;
        }
    }
</style>