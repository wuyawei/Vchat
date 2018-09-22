<template>
    <div class="vchat-theme-set">
        <ul class="theme-list">
            <li>
                <div class="theme-style">
                    Vchat
                </div>
                <el-button :type="projectTheme === 'vchat' ? 'success' : 'info'" :loading="setThemeIng === 'vchat'" @click="setTheme('vchat')">
                    <i class="el-icon-success el-icon--right" v-if="projectTheme === 'vchat'"></i>
                    {{getText('vchat')}}
                </el-button>
            </li>
        </ul>
    </div>
</template>
<script>
    import api from '@/api';
    export default{
        data() {
            return {
                projectTheme: this.$store.state.user.projectTheme,
                setThemeIng: ''
            };
        },
        methods: {
            setTheme(t) {
                if (this.projectTheme === t) {
                    return;
                }
                this.setThemeIng = t;
                api.upUserInfo({projectTheme: t}).then(r => {
                    if (r.code === 0) {
                        this.projectTheme = t;
                        this.setThemeIng = '';
                        this.$store.commit('setUser', {projectTheme: t});
                        this.$store.dispatch('setTheme');
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        })
                    } else {
                        this.projectTheme = this.$store.state.user.projectTheme;
                        this.setThemeIng = '';
                        this.$message({
                            message: '设置失败',
                            type: 'warning'
                        })
                    }
                });
            },
            getText(t) {
                if (this.setThemeIng === t) {
                    return '激活中';
                }
                if (this.projectTheme === t) {
                    return '已激活';
                } else {
                    return '激活';
                }
            }
        },
        mounted() {
        }
    }
</script>
<style lang="scss">
    .vchat-theme-set{
        width:100%;
        .theme-list{
            width:100%;
            display: flex;
            justify-content: flex-start;
            padding: 20px 30px;
            box-sizing: border-box;
            li{
                width:220px;
                margin-right: 50px;
                .theme-style{
                    width:220px;
                    height: 220px;
                    background-color: #27cac7;
                    border-radius: 5px;
                    color: #fff;
                    font-size: 32px;
                    line-height: 200px;
                    text-align: center;
                    margin-bottom: 10px;
                }
            }
        }
    }

</style>
