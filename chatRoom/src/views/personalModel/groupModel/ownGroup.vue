<template>
    <div class="vchat-ownGroup vchat-noUser">
        <v-apheader title="我的群聊">
            <el-dropdown trigger="click" @command="handleCommand">
                <v-icon cursor="pointer" name="hanbaobao" color="#fff"></v-icon>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/main/personalMain/group/set">新建群聊</el-dropdown-item>
                    <el-dropdown-item command="/main/personalMain/group/search">查找群聊</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </v-apheader>
        <div class="vchat-ownGroup-container" v-if="Groups.length" v-loading="loadingWait">
            <div class="vchat-linkman-container"  :class="{active: showList.indexOf('set') > -1}">
                <h3 @click="setShowList('set')">
                    <p>
                        <v-icon name="fanhui" :size="16" color="#b7b6b6" class="list-icon"></v-icon>
                        <span>我创建的</span>
                    </p>
                    <span>{{mySetGroups.length}}</span>
                </h3>
                <ul class="vchat-linkman-list">
                    <li v-for="v in mySetGroups" :key="v._id" @click="goGroupDetail(v.groupId._id)" @contextmenu="contextmenuClick($event, v.groupId)">
                        <a href="javascript:;">
                            <img :src="IMG_URL + v.groupId.img" alt="">
                        </a>
                        <div>
                            <p>
                                <span class="vchat-line1" :title="v.groupId.title">{{v.groupId.title}}</span>
                            </p>
                            <p>
                                <span :title="v.groupId.desc" class="vchat-line1">{{v.groupId.desc}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="vchat-linkman-container" :class="{active: showList.indexOf('join') > -1}">
                <h3 @click="setShowList('join')">
                    <p>
                        <v-icon name="fanhui" :size="16" color="#b7b6b6" class="list-icon"></v-icon>
                        <span>我加入的</span>
                    </p>
                    <span>{{myJoinGroups.length}}</span>
                </h3>
                <ul class="vchat-linkman-list">
                    <li v-for="v in myJoinGroups" :key="v._id" @click="goGroupDetail(v.groupId._id)" @contextmenu="contextmenuClick($event, v.groupId)">
                        <a href="javascript:;">
                            <img :src="IMG_URL + v.groupId.img" alt="">
                        </a>
                        <div>
                            <p>
                                <span class="vchat-line1" :title="v.groupId.title">{{v.groupId.title}}</span>
                            </p>
                            <p>
                                <span :title="v.groupId.desc" class="vchat-line1">{{v.groupId.desc}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <v-nodata v-else>
            <p class="vchat-no-have">
                还没有加入群聊哦，去 <router-link to="/main/personalMain/group/search">查找</router-link>， 去 <router-link to="/main/personalMain/group/set">新建</router-link>。
            </p>
        </v-nodata>
        <v-dropdown :command="currGroup" :x="x" :y="y" :visible="visible" @upVisible="upVisible">
            <v-dropdown-item slot-scope="{command}" @dropdownClick="handleConversitionList(command)" slot="dropdown">
                {{addOrDel ? '从会话列表移除' : '添加到会话列表'}}
            </v-dropdown-item>
        </v-dropdown>
    </div>
</template>

<script>
    import api from '@/api';
    import vApheader from '@/views/components/header/vApheader';
    import { mapState } from 'vuex';
    export default{
        name: 'ownGroup',
        data() {
            return {
                is_focus: false,
                IMG_URL: process.env.IMG_URL,
                loadingWait: false,
                Groups: [], // 群聊数据
                mySetGroups: [], // 我创建的
                myJoinGroups: [],// 我加入的
                showList: ['set'], // 创建or加入
                currGroup: {}, // 当前群
                visible: false, // dropdown显示
                x: '', // dropdown left
                y: '' // dropdown top
            }
        },
        components: {
            vApheader
        },
        computed: {
            ...mapState(['conversationsList']),
            addOrDel() {
                return this.conversationsList.filter(v => v.id === this.currGroup._id).length;
            }
        },
        methods: {
            handleCommand(command) {
                this.$router.push(command);
            },
            goGroupDetail(id) {
                this.$router.push({name: 'groupDetail', params: {id: id}});
            },
            getMyGroup() {
                this.loadingWait = true;
                api.getMyGroup().then(r => {
                    if (r.code === 0) {
                        this.Groups = r.data;
                        this.filterGroups();
                        this.loadingWait = false;
                    }
                });
            },
            filterGroups() {
                this.mySetGroups = this.Groups.filter(v => v.holder === 1);
                this.myJoinGroups = this.Groups.filter(v => v.holder !== 1);
            },
            setShowList(v) {
                if (this.showList.indexOf(v) > -1) {
                    this.showList.splice(this.showList.indexOf(v), 1);
                } else {
                    this.showList.push(v);
                }
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
                    this.visible = false;
                });
            }
        },
        mounted() {
            this.getMyGroup();
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-ownGroup{
        width:100%;
        height: 100%;
        .vchat-ownGroup-container{
            width:100%;
            padding-top: 10px;
            height: calc(100% - 40px);
            overflow-y: auto;
            box-sizing: border-box;
        }
    }
</style>