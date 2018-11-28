<template>
    <div :id="playerName" class="vchat-dplayer"></div>
</template>

<script>
    import 'DPlayer/dist/DPlayer.min.css';
    import Hls from 'hls.js';
    import DPlayer from 'DPlayer';
    export default{
        name: 'dplayer',
        props: [],
        data() {
            return {

            }
        },
        computed: {
            playerName() { // 随机id
                return 'dplayer-' + Math.random();
            }
        },
        methods: {
            initHlsPlayer() {
                const dp = new DPlayer({
                    container: document.getElementById(this.playerName),
                    video: {
                        url: 'http://tvideo.spriteapp.cn/video/2018/1127/3d84d7e0f1f411e8857f842b2b4c75ab_wpd.mp4',
                        type: 'customHls',
                        customType: {
                            'customHls': function (video, player) {
                                const hls = new Hls();
                                hls.loadSource(video.src);
                                hls.attachMedia(video);
                            }
                        }
                    }
                });
            },
            initMp4Player() {
                const dp = new DPlayer({
                    container: document.getElementById(this.playerName),
                    screenshot: true,
                    video: {
                        url: 'http://tvideo.spriteapp.cn/video/2018/1127/3d84d7e0f1f411e8857f842b2b4c75ab_wpd.mp4',
                        pic: 'http://wimg.spriteapp.cn/picture/2018/1127/28940047_688.jpg'
                    }
                });
            }
        },
        mounted() {
            this.$nextTick(_ => {
                this.initHlsPlayer();
            })
        }
    }
</script>

<style lang="scss">
    .vchat-dplayer{
        width:500px;
    }
</style>