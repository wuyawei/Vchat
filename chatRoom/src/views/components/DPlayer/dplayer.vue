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
                        url: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',
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