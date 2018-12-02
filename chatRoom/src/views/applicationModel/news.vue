<template>
    <div class="vchat-news vchat-application">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="v.label" :name="v.name" v-for="(v, i) in newsType" :key="i"></el-tab-pane>
        </el-tabs>

        <div class="news-content"  v-loading="loading">
            <news-item v-for="(v, i) in newsList" :key="i" :item="v"></news-item>
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
                page: 1,
                newsList: []
            }
        },
        components: {
            newsItem
        },
        methods: {
            handleClick() {
                this.getHotNews();
            },
            getHotNews() {
                this.loading = true;
                api.getHotNews(this.activeName).then(r => {
                    let data = JSON.parse(r.slice(r.indexOf('(') + 1, r.lastIndexOf(')'))); // 截取回调数据
                    this.newsList = data[this.activeName];
                    this.loading = false;
                });
            },
            getNewsDetail() {
                api.getNewsDetail().then(r => {
//                    console.log(r);
                })
            }
        },
        mounted() {
            this.getHotNews();
            this.getNewsDetail();
        }
    }
</script>

<style lang="scss" scoped>
    .news-content{
        height: calc(100% - 60px);
        padding-bottom: 20px;
        overflow-y: auto;
    }
</style>