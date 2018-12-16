<template>
    <div class="vchat-emoji">
        <el-tabs type="border-card" tab-position="bottom" v-model="activeName">
            <el-tab-pane name="default">
                <span slot="label" class="emoji-tap" :lazy="true">
                    {{emojiJson[0]}}
                </span>
                <ul class="emoji-default">
                    <li v-for="(m, n) in emojiJson" :key="n" @click.stop="chooseEmojiDefault(m)">
                        {{m}}
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane v-for="v in myEmojiList" :key="v.code" :name="v.code + ''">
                <span slot="label" class="emoji-tap" :lazy="true">
                    <img :src="IMG_URL + v.list[0]" alt="" class="emoji-tap-img">
                </span>
                <ul class="emoji-ul" v-if="activeName === v.code + ''">
                    <li v-for="(m, n) in v.list" :key="n" @click.stop="chooseEmoji(m)">
                        <img v-lazy="IMG_URL + m">
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane name="shop">
                <span slot="label" class="emoji-tap" :lazy="true">
                    <v-icon name="jia2" color="rgba(50, 50, 50, 0.64)"></v-icon>
                </span>
                <div class="emoji-shop" v-if="activeName === 'shop'">
                    <h3>表情商城</h3>
                    <ul class="emoji-shop-ul">
                        <li v-for="(m, n) in expressionList" :key="n" @click.stop="emojiDetail(m)">
                            <a>
                                <img v-lazy="IMG_URL + m.list[0]" alt="">
                            </a>
                            <p class="vchat-line1">{{m.name}}</p>
                        </li>
                    </ul>
                    <div class="emojiDetail" :class="{active: currEmojiDetail.name}">
                        <h3>{{currEmojiDetail.name}}</h3>
                        <v-icon class="el-icon-circle-close-outline deClose" @clickIcon="currEmojiDetail = {}" color="#323232" :size="24" cursor="pointer"></v-icon>
                        <ul class="emoji-detail">
                            <li v-for="(m, n) in currEmojiDetail.list" :key="n">
                                <img v-lazy="IMG_URL + m" alt="">
                            </li>
                        </ul>
                        <p class="vchat-button addEmoji" v-if="user.emoji.indexOf(currEmojiDetail.code) === -1" @click.stop="addEmoji(currEmojiDetail.code)">添加</p>
                        <p class="vchat-button info addEmoji" v-else>已添加</p>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import api from '@/api';
    import emojiJson from '@/utils/emoji';
    import { mapState, mapGetters } from 'vuex';
    export default{
        name: 'emoji',
        data() {
            return {
                IMG_URL: process.env.IMG_URL,
                expressionList: [], // 表情商城
                myEmojiList: [], // 我的表情包
                currEmojiDetail: {}, // 表情包详情页
                emojiJson: emojiJson.data.split(','),
                activeName: 'default' // 当前选项
            }
        },
        computed: {
            ...mapState(['user'])
        },
        watch: {
            'user.emoji'() {
                this.myEmojiList = [];
                this.expressionList.forEach(v => {
                    this.user.emoji.forEach(m => {
                        if (v.code === m) {
                            this.myEmojiList.push(v);
                        }
                    });
                });
            }
        },
        methods: {
            getExpression() {
                api.getExpression().then(r => {
                    if (r.code === 0) {
                        this.myEmojiList = [];
                        this.expressionList = r.data;
                        r.data.forEach(v => {
                            this.user.emoji.forEach(m => {
                                if (v.code === m) {
                                    this.myEmojiList.push(v);
                                }
                            });
                        });
                    }
                });
            },
            chooseEmoji(url) {
                this.$emit('chooseEmoji', url);
            },
            emojiDetail(val) {
                this.currEmojiDetail = val;
            },
            chooseEmojiDefault(em) {
                this.$emit('chooseEmojiDefault', em);
            },
            addEmoji(code) { // 添加表情包
                this.user.emoji.push(code);
                let params = {
                    emoji: this.user.emoji
                };
                api.upUserInfo(params).then(r => {
                    if (r.code === 0) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        })
                    }
                });
            }
        },
        mounted() {
            if (this.user.emoji) {
                this.getExpression();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-emoji{
        width:100%;
        height: 100%;
        .emoji-tap{
            width:40px;
            height: 100%;
            padding: 0 10px;
            overflow: hidden;
            display: inline-block;
            text-align: center;
            line-height: 48px;
            .emoji-tap-img{
                width:40px;
            }
        }
        .emoji-default{
            width:100%;
            height: 202px;
            overflow-y: auto;
            li{
                display: inline-block;
                padding: 5px;
                width:22px;
                height: 22px;
                overflow: hidden;
                cursor: pointer;
            }
            li:hover{
                background-color: #d5d5d5;
            }
        }
        .emoji-ul{
            width:100%;
            height: 202px;
            overflow-y: auto;
            li{
                display: inline-block;
                padding: 2px 10px;
                width:56px;
                height: 68px;
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.3s;
                transform: scale(1);
                img{
                    width:56px;
                }
            }
            li:hover{
                transform: scale(1.4);
            }
        }
        .emoji-shop{
            position: relative;
            h3{
                font-weight: normal;
                font-size: 16px;
                color: #323232;
            }
            >h3{
                line-height: 16px;
                padding-bottom: 5px;
                border-bottom: 1px solid #d5d5d5;
                margin-bottom: 5px;
            }
        }
        .emoji-shop-ul{
            width:100%;
            height: 176px;
            overflow-y: auto;
            li{
                display: inline-block;
                padding: 2px 10px;
                cursor: pointer;
                width:56px;
                height: 80px;
                a{
                    height: 68px;
                    width:56px;
                    overflow: hidden;
                    display: block;
                    img{
                        width:56px;
                    }
                }
                p{
                    text-align: left;
                    color: #4d4d4d;
                    font-size: 12px;
                    line-height: 12px;
                }
            }
            li:hover{
                background-color: #d5d5d5;
            }
        }
        .emojiDetail{
            position: absolute;
            left:0;
            top:100%;
            width:100%;
            height: 100%;
            overflow-y: auto;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 0 2px #d5d5d5;
            transition: top 0.3s;
            text-align: right;
            h3{
                height: 30px;
                margin-bottom: 5px;
                line-height: 30px;
                text-align: center;
            }
            .deClose{
                position: absolute;
                right: 2px;
                top:2px;
            }
            .emoji-detail{
                text-align: left;
                li{
                    display: inline-block;
                    padding: 2px 10px;
                    width:56px;
                    height: 68px;
                    overflow: hidden;
                    img{
                        width:56px;
                    }
                }
            }
            .addEmoji{
                margin-bottom: 10px;
                margin-right: 20px;
            }
        }
        .emojiDetail.active{
            top:0;
        }
    }
</style>