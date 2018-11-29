<template>
    <div :id="playerName" class="vchat-dplayer"></div>
</template>

<script>
    import 'DPlayer/dist/DPlayer.min.css';
    import Hls from 'hls.js';
    import DPlayer from 'DPlayer';
    export default{
        name: 'dplayer',
        props: ['type', 'src', 'pic'],
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
                        url: this.src,
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
                    video: {
                        url: this.src,
                        type: 'auto',
                        pic: this.pic
                    },
                    mutex: true
                });
            }
        },
        mounted() {
            this.$nextTick(_ => {
                if (this.type === 'hls') {
                    this.initHlsPlayer();
                } else if (this.type === 'mp4') {
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