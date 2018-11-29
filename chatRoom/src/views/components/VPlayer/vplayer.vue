<template>
    <video class="video-js vjs-default-skin" :id="playerName" controls></video>
</template>
<script>
    import videojs from 'video.js';
    export default{
        data() {
            return {
            }
        },
        props: ['src'],
        computed: {
            playerName() { // 随机id
                return 'vplayer' + Math.floor((Math.random() * 1000000));
            }
        },
        mounted() {
            this.$nextTick(_ => {
                let player = videojs(this.playerName, {
                    muted: false,
                    height: 300,
                    techOrder: ['html5'],
                    sources: [
                        {
                            src: this.src,
                            type: 'video/mp4'
                        }
                    ]
                });
            })
        }
    }
</script>
<style lang="scss" scoped>
</style>