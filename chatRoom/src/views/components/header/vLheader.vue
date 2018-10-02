<template>
    <div class="vchat-little-header">
        <router-link to="/personalMain">vchat</router-link>
        <div class="avatar">
            <a href="javascipt:;">
                <img :src="avatar" alt="">
            </a>
            <span @click="loginOut" class="logout">[退出]</span>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'vLheader',
        data() {
            return {};
        },
        computed: {
            avatar() {
                return process.env.IMG_URL + this.$store.state.user.photo; // 用户头像avatar:
            }
        },
        methods: {
            loginOut() {
                api.loginOut().then(r => {
                    if (r.code === 0) {
                        this.$message.success('退出成功');
                        this.$store.commit('setUser', 'out');
                        this.$router.replace('/');
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-little-header{
        width:100%;
        height: 40px;
        padding: 0 30px;
        text-align: left;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >a{
            font-size: 20px;
            line-height: 40px;
            color: #fff;
        }
        .avatar{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            a{
                display: block;
                width:32px;
                height: 32px;
                margin-right: 10px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width:100%;
                }
            }
        }
        span{
            cursor: pointer;
        }
    }
</style>