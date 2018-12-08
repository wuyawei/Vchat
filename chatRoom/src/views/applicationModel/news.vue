<template>
    <div class="vchat-news vchat-application">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="v.label" :name="v.name" v-for="(v, i) in newsType" :key="i"></el-tab-pane>
        </el-tabs>

        <div class="news-content"  v-loading="loading">
            <b-scroll :data="newsList">
                <div class="content">
                    <news-item v-for="(v, i) in newsList" :key="i" :item="v"></news-item>
                    <el-button type="info" size="medium" :loading="loadMoreFlag" @click="loadMore" class="loadmore" v-if="!nodata">{{loadMoreFlag ? '加载中' : '加载更多'}}</el-button>
                    <p v-else>没有更多数据了</p>
                </div>
            </b-scroll>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    import newsItem from './sub/newsItem.vue';
    export default{
        name: 'news',
        data() {
            return {
                activeName: 'BD2A86BEwangning',
                newsType: [
                    {
                        name: 'BD2A86BEwangning',
                        label: '电视'
                    },
                    {
                        name: 'BD2A9LEIwangning',
                        label: '电影'
                    },
                    {
                        name: 'BD2AB5L9wangning',
                        label: '明星'
                    },
                    {
                        name: 'BD2AC4LMwangning',
                        label: '音乐'
                    },
                    {
                        name: 'BA8E6OEOwangning',
                        label: '体育'
                    },
                    {
                        name: 'BA8EE5GMwangning',
                        label: '财经'
                    },
                    {
                        name: 'BAI67OGGwangning',
                        label: '军事'
                    }
                ],
                loading: false,
                loadMoreFlag: false,
                page: 0,
                newsList: [],
                scroll: null,
                nodata: false
            }
        },
        components: {
            newsItem
        },
        computed: {
            limit() {
                return this.page * 10 + '-' + (this.page + 1) *10;
            }
        },
        methods: {
            handleClick() {
                this.page = 0;
                this.getHotNews();
            },
            loadMore() {
                this.page ++;
                this.loadMoreFlag = true;
                this.getHotNews(true);
            },
            getHotNews(More) {
                if (!More) { this.loading = true }
                api.getHotNews(this.activeName, this.limit).then(r => {
                    let data = JSON.parse(r.slice(r.indexOf('(') + 1, r.lastIndexOf(')'))); // 截取回调数据
                    if (!More) {
                        this.newsList = data[this.activeName];
                    } else {
                        this.newsList = this.newsList.concat(data[this.activeName]);
                    }
                    this.nodata = data[this.activeName].length === 0;
                    this.loading = false;
                    this.loadMoreFlag = false;
                });
            }
        },
        mounted() {
            this.getHotNews();
        }
    }
</script>

<style lang="scss" scoped>
    .news-content{
        height: calc(100% - 60px);
        box-sizing: border-box;
        .loadmore{
            display: block;
            margin-left: 260px;
        }
    }
</style>