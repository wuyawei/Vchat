<template>
    <div class="vchat-Jokes">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="1"></el-tab-pane>
            <el-tab-pane label="视频" name="41"></el-tab-pane>
            <el-tab-pane label="图片" name="10"></el-tab-pane>
            <el-tab-pane label="段子" name="29"></el-tab-pane>
            <el-tab-pane label="声音" name="31"></el-tab-pane>
        </el-tabs>
        <div class="jokes-content"  v-loading="loading">
            <jokes-item v-for="(v, i) in jokesList" :key="i" :item="v"></jokes-item>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    import jokesItem from './jokesItem.vue';
    export default{
        name: 'Jokes',
        data() {
            return {
                activeName: '1',
                jokesList: [],
                loading: false
            }
        },
        components: {
            jokesItem
        },
        methods: {
            handleClick() {
                this.getJokes();
            },
            getJokes() {
                this.loading = true;
                api.getJokes(this.activeName).then(r => {
                    this.jokesList = r.list;
                    this.loading = false;
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
        width:100%;
        height: 100%;
        padding: 5px 15px 15px;
        box-sizing: border-box;
        overflow-y: auto;
        background-color: #f7f7f7;
        .jokes-content{
            height: calc(100% - 60px);
        }
    }
</style>