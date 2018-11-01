<template>
    <div class="vchat-myFriend vchat-noUser">
        <v-apheader title="我的好友">
            <el-dropdown trigger="click" @command="handleCommand">
                <v-icon cursor="pointer" name="hanbaobao" color="#fff"></v-icon>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/main/personalMain/friendly/search">添加好友</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </v-apheader>
        <div class="vchat-myFriend-container">
            <div class="vchat-linkman-container" :class="{active: showList.indexOf('mine') > -1}">
                <h3 @click="setShowList('mine')">
                    <p>
                        <v-icon name="fanhui" :size="16" color="#b7b6b6" class="list-icon"></v-icon>
                        <span>我的好友</span>
                    </p>
                    <span>{{friendList.length}}</span>
                </h3>
                <ul class="vchat-linkman-list">
                    <li v-for="v in friendList" :key="v._id" @click="goFriendDetail(v.id)" @contextmenu="contextmenuClick($event, v.id)">
                        <a href="javascript:;">
                            <img :src="IMG_URL + v.photo" alt="">
                        </a>
                        <div>
                            <p>
                                <span class="vchat-line1" :title="v.nickname">{{v.nickname}}</span>
                            </p>
                            <p>
                                <span :title="v.signature" class="vchat-line1">{{v.signature}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <v-dropdown :command="currFriend" :x="x" :y="y" :visible="visible" @upVisible="upVisible">
            <v-dropdown-item slot-scope="{command}" @dropdownClick="handleConversitionList(command)" slot="dropdown">
                {{addOrDel ? '从会话列表移除' : '添加到会话列表'}}
            </v-dropdown-item>
        </v-dropdown>
    </div>
</template>

<script>
    import vApheader from '@/views/components/header/vApheader';
    import { mapState } from 'vuex';
    import api from '@/api';
    export default{
        data() {
            return {
                friendList: [],
                IMG_URL: process.env.IMG_URL,
                showList: ['mine'], // 分组 备用
                visible: false, // dropdown显示
                currFriend: {},
                x: '', // dropdown left
                y: '' // dropdown top
            }
        },
        components: {
            vApheader
        },
        computed: {
            ...mapState(['conversationsList', 'user']),
            addOrDel() {
                return this.conversationsList.filter(v => v.id === this.currFriend._id).length;
            }
        },
        methods: {
            handleCommand(command) {
                this.$router.push(command);
            },
            goFriendDetail(id) {
                this.$router.push({name: 'friendDetail', params: {id: id}});
            },
            setShowList(v) {
                if (this.showList.indexOf(v) > -1) {
                    this.showList.splice(this.showList.indexOf(v), 1);
                } else {
                    this.showList.push(v);
                }
                console.log(this.showList);
            },
            upVisible(f) {
                this.visible = f;
            },
            contextmenuClick(e, v) {
                e.preventDefault();
                e.stopPropagation();
                this.currGroup = v;
                this.visible = true;
                this.x = e.clientX;
                this.y = e.clientY;
            },
            handleConversitionList(v) {
                if (!this.addOrDel) {
                    this.addConversitionList(v);
                } else {
                    this.removeConversitionList(v);
                }
            },
            addConversitionList(v) { // 加入会话列表
                let params = {
                    name: v.title,
                    photo: v.img,
                    id: v._id,
                    type: 'group'
                };
                api.addConversitionList(params).then(r => {
                    if (r.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.$store.commit('setConversationsList', params);
                    } else {
                        this.$message({
                            type: 'success',
                            message: '添加失败'
                        });
                    }
                    this.visible = false;
                });
            },
            removeConversitionList(v) {
                let params = {
                    id: v._id
                };
                api.removeConversitionList(params).then(r => {
                    if (r.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '移除成功'
                        });
                        this.$store.commit('setConversationsList', Object.assign({}, params, {d: true}));
                    } else {
                        this.$message({
                            type: 'success',
                            message: '移除失败'
                        });
                    }
                });
            },
            findMyfriends() {
                let params = {
                    userId: this.user.id
                };
                api.findMyfriends(params).then(r => {
                    if (r.code === 0) {
                        this.friendList = r.data;
                    }
                })
            }
        },
        mounted() {
            this.findMyfriends();
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-myFriend{
        width:100%;
        height: 100%;
        .vchat-myFriend-container{
            width:100%;
            padding-top: 10px;
            height: calc(100% - 40px);
            overflow-y: auto;
            box-sizing: border-box;
        }
    }
</style>