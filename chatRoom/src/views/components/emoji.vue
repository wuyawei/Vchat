<template>
    <div class="vchat-emoji">
        <el-tabs type="border-card" tab-position="bottom">
            <el-tab-pane>
                <span slot="label" class="emoji-tap" :lazy="true">
                    <img :src="IMG_URL + '/expression/不二呆/00.gif'" alt="" class="emoji-tap-img">
                </span>
                <ul class="emoji-ul">
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/00.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/01.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/02.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/03.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/04.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/05.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/06.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/07.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/08.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/09.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/10.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/11.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/12.gif'" alt="">
                    </li>
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/13.gif'" alt="">
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="emoji-tap" :lazy="true">
                    <img :src="IMG_URL + '/expression/b站233/1e94fd9fb7.gif'" alt="" class="emoji-tap-img">
                </span>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="emoji-tap" :lazy="true">
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
        .emoji-ul{
            width:100%;
            height: 202px;
            overflow-y: auto;
            li{
                display: inline-block;
                padding: 5px;
                box-sizing: border-box;
                width:70px;
                height: 68px;
                overflow: hidden;
                cursor: pointer;
                img{
                    width:60px;
                }
            }
            li:hover{
                background-color: rgba(0,0,0,0.1);
            }
        }
    }
</style>