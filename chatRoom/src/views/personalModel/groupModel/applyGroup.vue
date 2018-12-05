<template>
    <div class="vchat-apply">
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
                let group = JSON.parse(localStorage.group);
                let val = {
                    name: this.user.name,
                    mes: this.introduce,
                    time: utils.formatTime(new Date()),
                    avatar: this.user.photo,
                    nickname: this.user.nickname,
                    signature: this.user.signature,
                    groupName: group.groupName,
                    groupId: group.groupId,
                    groupPhoto: group.groupPhoto,
                    userM: this.user.id, // 申请人id
                    read: [],
                    roomid: this.$route.params.id + '-' + this.Vchat.id.split('-')[1],
                    state: 'group',
                    type: 'validate',
                    status: '0'
                };
                console.log(val);
                this.$socket.emit('sendValidate', val);
                this.$router.push({name: 'sendGroupValidate', query: {name: 'searchGroup'}});
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @import "../vchatDetail";
</style>