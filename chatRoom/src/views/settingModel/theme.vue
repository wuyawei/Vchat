<template>
    <div class="vchat-theme-set">
        <ul class="theme-list">
            <li>
                <div class="theme-style">
                    Vchat
                </div>
                <el-button type="info" :loading="false">
                    <i class="el-icon-success el-icon--right"></i>
                    已激活
                </el-button>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data() {
            return {};
        },
        methods: {},
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
