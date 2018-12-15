<template>
    <div :id="playerName" class="vchat-aplayer"></div>
</template>

<script>
    import 'aplayer/dist/APlayer.min.css';
    import APlayer from 'aplayer';
    export default{
        name: 'aplayer',
        props: ['src', 'pic'],
        data() {
            return {

            }
        },
        computed: {
            playerName() { // 随机id
                return 'aplayer-' + Math.random();
            }
        },
        methods: {
            initAPlayer() {
                const ap = new APlayer({
                    container: document.getElementById(this.playerName),
                    mini: false,
                    autoplay: false,
                    theme: '#FADFA3',
                    loop: 'all',
                    order: 'random',
                    preload: 'none',
                    volume: 0.7,
                    mutex: true,
                    listFolded: false,
                    listMaxHeight: 90,
                    audio: [
                        {
                            name: '',
                            artist: '',
                            url: this.src,
                            cover: this.pic,
                            theme: '#ebd0c2'
                        }
                    ]
                });
            }
        },
        mounted() {
            this.$nextTick(_ => {
                this.initAPlayer();
            })
        }
    }
</script>

<style lang="scss">
    .vchat-aplayer{
        width:500px;
    }
</style>