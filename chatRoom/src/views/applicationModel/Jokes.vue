<template>
    <div class="vchat-Jokes vchat-application">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="1"></el-tab-pane>
            <el-tab-pane label="视频" name="41"></el-tab-pane>
            <el-tab-pane label="图片" name="10"></el-tab-pane>
            <el-tab-pane label="段子" name="29"></el-tab-pane>
            <el-tab-pane label="声音" name="31"></el-tab-pane>
        </el-tabs>
        <div class="jokes-content"  v-loading="loading">
            <jokes-item v-for="(v, i) in jokesList" :key="i" :item="v"></jokes-item>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page.sync="page"
                    @current-change="getJokes"
                    v-if="count > 0"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    import jokesItem from './sub/jokesItem.vue';
    export default{
        name: 'Jokes',
        data() {
            return {
                activeName: '1',
                jokesList: [],
                loading: false,
                page: 1,
                maxtime: '',
                count: 0
            }
        },
        components: {
            jokesItem
        },
        methods: {
            handleClick() {
                this.page = 1;
                this.maxtime = '';
                this.getJokes();
            },
            getJokes() {
                this.loading = true;
                this.count = 0;
                this.jokesList = [];
                api.getJokes(this.activeName, this.page, this.maxtime).then(r => {
                    this.jokesList = r.list;
                    this.loading = false;
                    this.maxtime = r.info.maxtime;
                    this.count = r.info.count;
                });
            }
        },
        mounted() {
            this.getJokes();
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-Jokes{
        .jokes-content{
            height: calc(100% - 60px);
        }
    }
</style>