<template>
    <div class="vchat-application-main">
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.name !== 'appSpace'">
            <el-breadcrumb-item :to="{ name: v.meta.name }" v-for="(v, i) in breadcrumb" :key="i">{{v.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
    </div>
</template>

<script>
    export default{
        data() {
            return {
            }
        },
        computed: {
            breadcrumb() {
                return this.$route.matched.slice(1);
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-application-main{
        width:100%;
        height: 100%;
        padding: 10px 15px 15px;
        box-sizing: border-box;
        overflow-y: auto;
        background-color: #f7f7f7;
    }
</style>