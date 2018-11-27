<template>
    <div :id="playerName" class="vchat-aplayer"></div>
</template>

<script>
    import 'APlayer/dist/APlayer.min.css';
    import APlayer from 'APlayer';
    export default{
        name: 'aplayer',
        props: [],
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
                    preload: 'auto',
                    volume: 0.7,
                    mutex: true,
                    listFolded: false,
                    listMaxHeight: 90,
                    lrcType: 3,
                    audio: [
                        {
                            name: '音乐汇',
                            artist: '音乐汇',
                            url: 'http://wvoice.spriteapp.cn/voice/2018/1104/5bdf1680b98f5.mp3',
                            cover: 'http://wimg.spriteapp.cn/picture/2018/1104/5bdf1680ade30.jpg',
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