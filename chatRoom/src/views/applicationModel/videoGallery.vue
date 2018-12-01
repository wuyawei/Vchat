<template>
    <div class="vchat-videoGallery vchat-application">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="电视频道" name="1"></el-tab-pane>
        </el-tabs>
        <div class="videoGallery-content"  v-loading="loading">
            <el-row class="tac">
                <el-col :span="3" class="tac">
            <el-menu
                    default-active="0"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#27c2bf"
                    @select="selectMenu"
            >
                <el-menu-item :index="i + ''" v-for="(v, i) in videoList" :key="i">
                    <span slot="title">{{v.name}}</span>
                </el-menu-item>
            </el-menu>
                </el-col>
                <el-col :span="15">
                    <div class="video-container">
                        <dplayer :videoInfo="videoInfo"></dplayer>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import dplayer from '@/views/components/DPlayer/dplayer';
    export default{
        name: 'videoGallery',
        data() {
            return {
                activeName: '1',
                activeMenu: 0,
                loading: false,
                currVideo: 'http://ivi.bupt.edu.cn/hls/zjhd.m3u8',
                videoList: [
                    {
                        name: 'CCTV-6',
                        url: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8'
                    },
                    {
                        name: 'CCTV-5',
                        url: 'http://ivi.bupt.edu.cn/hls/cctv5hd.m3u8'
                    },
                    {
                        name: 'CCTV-1',
                        url: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'
                    },
                    {
                        name: 'CCTV-3',
                        url: 'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8'
                    },
                    {
                        name: 'CCTV-8',
                        url: 'http://ivi.bupt.edu.cn/hls/cctv8hd.m3u8'
                    },
                    {
                        name: '北京卫视',
                        url: 'http://ivi.bupt.edu.cn/hls/btv1hd.m3u8'
                    },
                    {
                        name: '湖南卫视',
                        url: 'http://ivi.bupt.edu.cn/hls/hunanhd.m3u8'
                    },
                    {
                        name: '浙江卫视',
                        url: 'http://ivi.bupt.edu.cn/hls/zjhd.m3u8'
                    },
                    {
                        name: '江苏卫视',
                        url: 'http://ivi.bupt.edu.cn/hls/jshd.m3u8'
                    },
                    {
                        name: '东方卫视',
                        url: 'http://ivi.bupt.edu.cn/hls/dfhd.m3u8'
                    },
                    {
                        name: '辽宁卫视',
                        url: 'http://ivi.bupt.edu.cn/hls/lnhd.m3u8'
                    }
                ]
            }
        },
        computed: {
            videoInfo() {
                return {
                    src: this.videoList[this.activeMenu].url,
                    type: 'hls',
                    autoplay: true
                }
            }
        },
        methods: {
            handleClick() {
            },
            selectMenu(index) {
                this.activeMenu = Number(index);
            }
        },
        components: {
            dplayer
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-videoGallery{
        .videoGallery-content{
            height: calc(100% - 60px);
        }
        .tac{
            height: 100%;
            overflow-y: auto;
            ::-webkit-scrollbar
            {
                width: 4px;
                background-color: #F5F5F5;
                border-radius: 10px;
            }
        }
        .video-container{
            width:800px;
            margin-left: 20px;
        }
    }
</style>