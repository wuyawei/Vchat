<template>
    <div class="vchat-searchGroup">
        <v-apheader title="查找群聊" back="/main/personalMain/group/own"></v-apheader>
        <div class="vchat-search group-search">
            <el-select v-model="type" placeholder="请选择搜索方式" @change="huntGroups">
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
                <i slot="append" class="el-input__icon el-icon-search" @click="huntGroups('click')"></i>
            </el-input>
        </div>
        <div class="search-contianer" v-loading="loadingSearch">
            <ul class="search-group-list" v-show="groupList.length">
                <li v-for="v in groupList" :key="v['_id']" @click="goGroupDetail(v['_id'])">
                    <a href="javascript:;">
                        <img :src="IMG_URL + v.img" alt="">
                    </a>
                    <div>
                        <p>
                            {{v.title}}
                    </p>
                        <p>
                            <i class="icon-zhanghao iconfont"></i>
                            {{v.userNum}}
                    </p>
                        <p :title="v.desc" class="vchat-line1">
                            {{v.desc}}
                    </p>
                    </div>
                </li>
            </ul>
            <v-nodata v-show="!groupList.length && !loadingSearch">
                <p class="vchat-no-have">
                    没有查询到想要的，<router-link to="/main/personalMain/group/set">新建</router-link> 一个吧！
            </p>
            </v-nodata>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    import vApheader from '@/views/components/header/vApheader';
    export default{
        name: 'searchGroup',
        data() {
            return {
                IMG_URL: process.env.IMG_URL,
                huntKey: '', // 搜索参数
                groupList: [], // 群列表
                loadingSearch: false, // 加载动画
                searchOptions: [
                    {
                        value: '2',
                        label: '群名称'
                    },
                    {
                        value: '1',
                        label: '群号'
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
                this.huntGroups();
            }
        },
        methods: {
            goGroupDetail(id) {
                this.$router.push({name: 'groupDetail', params: {id: id}});
            },
            huntGroups(t) { // 搜索群聊
                if (this.loadingSearch) {
                    return;
                }
                if (!this.huntKey) {
                    if (t === 'click') {
                        return;
                    }
                    this.loadingSearch = true;
                    setTimeout(_ => {
                        this.groupList = [];
                        this.loadingSearch = false;
                    }, 800);
                    return;
                }
                if (this.type === '1') { // 按群号查找 需要输入3位以上字符
                    if (this.huntKey.length <= 3) {
                        this.loadingSearch = true;
                        setTimeout(_ => {
                            this.groupList = [];
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
                api.huntGroups(params).then(r => {
                    if (r.code === 0) {
                        this.groupList = r.data;
                    }
                    this.loadingSearch = false;
                })
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-searchGroup{
        width:100%;
        height: 100%;
        .group-search{
            width:100%;
            height: 32px;
            position: relative;
            transition: all 0.5s;
            margin-bottom: 20px;
            padding: 0 15px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            .el-select{
                width: 62px;
                margin-right: 5px;
            }
            i.el-icon-search{
                width:24px;
                height: 24px;
                position: absolute;
                right: 5px;
                top:4px;
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
        .search-contianer{
            width:100%;
            height: calc(100% - 102px);
            overflow-y: auto;
        }
        .search-group-list{
            width:100%;
            margin-bottom: 10px;
            li{
                width:100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px 15px 6px;
                box-sizing: border-box;
                border-bottom: 1px solid #e5e5e5;
                cursor: pointer;
                >a{
                    width:46px;
                    height: 46px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 10px;
                    border: 1px solid #d5d5d5;
                    img{
                        width:46px;
                    }
                }
                >div{
                    width:calc(100% - 58px);
                    font-size: 12px;
                    color: #a3a3a3;
                    text-align: left;
                    p{
                        text-align: left;
                        margin-bottom: 5px;
                    }
                    p:nth-of-type(1) {
                        font-size: 14px;
                        color: #323232;
                    }
                    p:nth-of-type(2) {
                        background-color: #1fbeca;
                        color: #fff;
                        border-radius: 2px;
                        display: inline-block;
                        padding: 1px 6px;
                        line-height: 16px;
                        font-size: 12px;
                        i{
                            font-size: 14px;
                            vertical-align: baseline;
                        }
                    }
                }
            }
            li:hover{
                background-color: #cdeff8;
                opacity: 0.8;
            }
        }
    }
</style>