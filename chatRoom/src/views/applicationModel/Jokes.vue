<template>
    <div class="vchat-Jokes">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="1"></el-tab-pane>
            <el-tab-pane label="视频" name="41"></el-tab-pane>
            <el-tab-pane label="图片" name="10"></el-tab-pane>
            <el-tab-pane label="段子" name="29"></el-tab-pane>
            <el-tab-pane label="声音" name="31"></el-tab-pane>
        </el-tabs>
        <dplayer></dplayer>
        <aplayer></aplayer>
    </div>
</template>

<script>
    import api from '@/api';
    import dplayer from '@/views/components/DPlayer/dplayer';
    import aplayer from '@/views/components/APlayer/aplayer';
    export default{
        name: 'Jokes',
        data() {
            return {
                activeName: '1'
            }
        },
        components: {
            dplayer,
            aplayer
        },
        methods: {
            handleClick() {}
        },
        mounted() {
            api.getJokes('31');
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-Jokes{
        width:100%;
        height: 100%;
        padding: 5px 15px 15px;
        box-sizing: border-box;
    }
</style>