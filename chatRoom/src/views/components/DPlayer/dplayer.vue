<template>
    <div :id="playerName" class="vchat-dplayer"></div>
</template>

<script>
    import 'dplayer/dist/DPlayer.min.css';
    import Hls from 'hls.js';
    import DPlayer from 'dplayer';
    export default{
        name: 'dplayer',
        props: ['videoInfo'],
        data() {
            return {
                dp: null,
                hls: null
            }
        },
        watch: {
            'videoInfo.src': { // 切换视频
                handler(src) {
                    if (this.videoInfo.type === 'hls') {
                        if (this.hls) {
                            this.hls.destroy();
                        }
                        this.dp.switchVideo({
                            url: src,
                            type: 'customHls',
                            customType: {
                                'customHls': (video, player) => {
                                    this.hls = new Hls();
                                    this.hls.loadSource(video.src);
                                    this.hls.attachMedia(video);
                                }
                            }
                        });
                        this.dp.on('canplaythrough', () => {
                            this.dp.play();
                        });
                    }
                }
            }
        },
        beforeDestroy() { // 离开页面销毁播放器
            if (this.hls) {
                this.hls.destroy();
            }
            this.dp.destroy();
        },
        computed: {
            playerName() { // 随机id
                return 'dplayer-' + Math.random();
            }
        },
        methods: {
            initHlsPlayer() {
                this.dp = new DPlayer({
                    container: document.getElementById(this.playerName),
                    autoplay: this.videoInfo.autoplay || false,
                    video: {
                        url: this.videoInfo.src,
                        type: 'customHls',
                        customType: {
                            'customHls': (video, player) => {
                                this.hls = new Hls();
                                this.hls.loadSource(video.src);
                                this.hls.attachMedia(video);
                            }
                        }
                    }
                });
            },
            initMp4Player() {
                this.dp = new DPlayer({
                    container: document.getElementById(this.playerName),
                    autoplay: this.videoInfo.autoplay || false,
                    preload: 'none',
                    video: {
                        url: this.videoInfo.src,
                        type: 'auto',
                        pic: this.videoInfo.pic
                    },
                    mutex: true
                });
            }
        },
        mounted() {
            this.$nextTick(_ => {
                if (this.videoInfo.type === 'hls') {
                    this.initHlsPlayer();
                } else if (this.videoInfo.type === 'mp4') {
                    this.initMp4Player();
                }
            })
        }
    }
</script>

<style lang="scss">
    .vchat-dplayer{
        width:100%;
    }
</style>