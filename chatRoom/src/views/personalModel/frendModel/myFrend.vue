<template>
    <div class="vchat-myFrend vchat-noUser">
        <v-apheader title="我的好友">
            <el-dropdown trigger="click" @command="handleCommand">
                <v-icon cursor="pointer" name="hanbaobao" color="#fff"></v-icon>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/main/personalMain/friendly/search">添加好友</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </v-apheader>
    </div>
</template>

<script>
    import vApheader from '@/views/components/header/vApheader';
    export default{
        data() {
            return {

            }
        },
        components: {
            vApheader
        },
        methods: {
            handleCommand() {}
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-myFrend{
        width:100%;
        height: 100%;
    }
</style>