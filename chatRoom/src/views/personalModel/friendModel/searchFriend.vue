<template>
    <div class="vchat-searchFriend">
        <v-apheader title="添加好友" back="/main/personalMain/friendly/own"></v-apheader>
        <div class="vchat-search friend-search">
            <el-select v-model="type" placeholder="请选择搜索方式" @change="huntFriends">
                <el-option
                        v-for="item in searchOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                >
                </el-option>
            </el-select>
            <el-input
                    placeholder="搜索内容"
                    v-model="huntKey"
                    clearable
            >
                <i slot="append" class="el-input__icon el-icon-search" @click="huntFriends('click')"></i>
            </el-input>
        </div>
        <div class="vchat-linkman-container friend-container" v-loading="loadingSearch">
            <ul class="vchat-linkman-list" v-show="friendList.length">
                <li v-for="v in friendList" :key="v['_id']" @click="goFriendDetail(v['_id'])">
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
            <v-nodata v-show="!friendList.length && !loadingSearch">
                <p class="vchat-no-have">
                    没有搜索到想要的!
                </p>
            </v-nodata>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    import vApheader from '@/views/components/header/vApheader';
    export default{
        data() {
            return {
                huntKey: '', // 搜索参数
                friendList: [], // 好友列表
                loadingSearch: false, // 加载动画
                IMG_URL: process.env.IMG_URL,
                searchOptions: [
                    {
                        value: '2',
                        label: '昵称'
                    },
                    {
                        value: '1',
                        label: 'Vchat号'
                    }
                ],
                type: '2'
            }
        },
        components: {
            vApheader
        },
        watch: {
            huntKey() {
                this.huntFriends();
            }
        },
        methods: {
            goFriendDetail(id) {
                this.$router.push({name: 'friendDetail', params: {id: id}});
            },
            huntFriends(t) { // 搜索群聊
                if (this.loadingSearch) {
                    return;
                }
                if (!this.huntKey) {
                    if (t === 'click') {
                        return;
                    }
                    this.loadingSearch = true;
                    setTimeout(_ => {
                        this.friendList = [];
                        this.loadingSearch = false;
                    }, 800);
                    return;
                }
                if (this.type === '1') { // 按群号查找 需要输入3位以上字符
                    if (this.huntKey.length <= 3) {
                        this.loadingSearch = true;
                        setTimeout(_ => {
                            this.friendList = [];
                            this.loadingSearch = false;
                        }, 800);
                        return;
                    }
                }

                this.loadingSearch = true;
                let params = {
                    key: this.huntKey,
                    offset: 1,
                    limit: 8,
                    type: this.type
                };
                api.huntFriends(params).then(r => {
                    if (r.code === 0) {
                        this.friendList = r.data;
                    }
                    this.loadingSearch = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-searchFriend {
        width: 100%;
        height: 100%;
        .friend-search {
            width: 100%;
            height: 32px;
            position: relative;
            transition: all 0.5s;
            margin-bottom: 20px;
            padding: 0 15px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            .el-select {
                width: 62px;
                margin-right: 5px;
            }
            i.el-icon-search {
                width: 24px;
                height: 24px;
                position: absolute;
                right: 5px;
                top: 4px;
                text-align: center;
                line-height: 24px;
                font-size: 14px;
                display: block;
                cursor: pointer;
                color: #FFF;
                background-color: #27cac7;
                border-radius: 50%;
            }
        }
        .friend-container{
            height: calc(100% - 102px);
            overflow-y: auto;
        }
    }
</style>