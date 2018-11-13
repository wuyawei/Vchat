<template>
    <div class="vchat-emoji">
        <el-tabs type="border-card" tab-position="bottom">
            <el-tab-pane>
                <span slot="label" class="emoji-tap">
                    <img :src="IMG_URL + '/expression/不二呆/00.gif'" alt="" class="emoji-tap-img">
                </span>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="emoji-tap">
                    <img :src="IMG_URL + '/expression/b站233/1e94fd9fb7.gif'" alt="" class="emoji-tap-img">
                </span>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="emoji-tap">
                    <img :src="IMG_URL + '/expression/文小萌/00.gif'" alt="" class="emoji-tap-img">
                </span>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default{
        name: 'emoji',
        data() {
            return {
                IMG_URL: process.env.IMG_URL
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-emoji{
        width:100%;
        height: 100%;
        .emoji-tap{
            width:40px;
            height: 100%;
            padding: 0 10px;
            overflow: hidden;
            display: inline-block;
            .emoji-tap-img{
                width:40px;
            }
        }
    }
</style>