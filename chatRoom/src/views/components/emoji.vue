<template>
    <div class="vchat-emoji">
        <el-tabs type="border-card" tab-position="bottom" @tab-click="addMore">
            <el-tab-pane v-for="v in myEmojiList" :key="v.code">
                <span slot="label" class="emoji-tap" :lazy="true">
                    <img :src="IMG_URL + v.list[0]" alt="" class="emoji-tap-img">
                </span>
                <ul class="emoji-ul">
                    <li v-for="(m, n) in v.list" :key="n" @click.stop="chooseEmoji(m)">
                        <img :src="IMG_URL + m" alt="">
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane name="add">
                <span slot="label" class="emoji-tap" :lazy="true">
                    <v-icon name="jia2" color="rgba(50, 50, 50, 0.64)"></v-icon>
                </span>
                <div class="emoji-shop">
                    <h3>表情商城</h3>
                </div>
                <ul class="emoji-shop-ul">
                    <li v-for="(m, n) in expressionList" :key="n" @click.stop="chooseEmoji(m)">
                        <a>
                            <img :src="IMG_URL + m.list[0]" alt="">
                        </a>
                        <p class="vchat-line1">{{m.name}}</p>
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import api from '@/api';
    import { mapState, mapGetters } from 'vuex';
    export default{
        name: 'emoji',
        data() {
            return {
                IMG_URL: process.env.IMG_URL,
                expressionList: [],
                myEmojiList: []
            }
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            getExpression() {
                this.myEmojiList = [];
                api.getExpression().then(r => {
                    if (r.code === 0) {
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
            addMore(raw) {
                if (raw.name === 'add') {

                }
            }
        },
        mounted() {
            this.getExpression();
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
            h3{
                font-weight: normal;
                font-size: 16px;
                color: #323232;
                line-height: 16px;
            }
        }
        .emoji-shop-ul{
            width:100%;
            height: 186px;
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
    }
</style>