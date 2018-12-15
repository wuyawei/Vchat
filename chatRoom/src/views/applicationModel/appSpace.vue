<template>
    <div class="vchat-appSpace">
        <el-carousel trigger="click" height="100%" arrow="never" indicator-position="none"  :interval="300000">
            <el-carousel-item v-for="(item, i) in bgList" :key="i">
                <a class="DetailImage-a" :style="{backgroundImage: 'url('+ item +')'}">
                </a>
            </el-carousel-item>
        </el-carousel>
        <div class="vchat-appSpace-container">
            <div class="space-item" v-for="(v, i) in appList" :key="i" :class="[v.name]" @click="toCenter(v.link)">
                <img :src="v.src" alt="">
                <p>{{v.title}}</p>
                <div class="bg"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'appSpace',
        data() {
            return {
                IMG_URL: process.env.IMG_URL,
                List: [require('../../assets/img/app9.jpg'), require('../../assets/img/app3.jpg'), require('../../assets/img/app4.jpg'), require('../../assets/img/app5.jpg'), require('../../assets/img/app6.jpg'), require('../../assets/img/app8.jpg')],
                appList: [
                    {
                        name: 'one',
                        title: '看视频',
                        src: require('../../assets/img/film-icon.png'),
                        link: 'videoGallery'
                    },
                    {
                        name: 'two',
                        title: '听音乐',
                        src: require('../../assets/img/music-icon.png'),
                        link: ''
                    },
                    {
                        name: 'thr',
                        title: '玩游戏',
                        src: require('../../assets/img/game-icon.png'),
                        link: 'games'
                    },
                    {
                        name: 'four',
                        title: '看头条',
                        src: require('../../assets/img/news-icon.png'),
                        link: 'news'
                    },
                    {
                        name: 'fif',
                        title: '侃段子',
                        src: require('../../assets/img/duanzi-icon.png'),
                        link: 'jokes'
                    }
                ]
            }
        },
        computed: {
            bgList() { // 随机排序
                this.List.sort(function(){ return 0.5 - Math.random() });
                return this.List;
            }
        },
        methods: {
            toCenter(link) {
                this.$router.push({path: link});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-appSpace{
        width: 100%;
        height: 100%;
        position: relative;
        .el-carousel{
            width: 100%;
            height: 100%;
            position: absolute;
            left:0;
            top:0;
            z-index: 1;
        }
        .vchat-appSpace-container{
            width: 100%;
            height: 100%;
            position: absolute;
            left:0;
            top:0;
            z-index: 2;
            background-color: rgba(0,0,0,0.2);
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            padding: 10px;
            box-sizing: border-box;
            .space-item{
                background-color: rgba(0,0,0,0.3);
                text-align: center;
                color: #fff;
                font-size: 26px;
                display: flex;
                flex-flow: column;
                justify-content: center;
                align-items: center;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                border-radius: 5px;
                p{
                    line-height: 26px;
                    font-family: 'YouYuan','KaiTi';
                    transition: transform 0.5s;
                    transform: scale(1);
                }
                img{
                    width:140px;
                    margin-bottom: 20px;
                    transition: transform 0.5s;
                    transform: rotateY(0);
                }
                .bg{
                    width:100%;
                    height: 100%;
                    position: absolute;
                    left:0;
                    top:0;
                    z-index: -1;
                    transition: transform 0.3s;
                    transform: translateY(100%);
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                }
            }
            .space-item:hover .bg{
                transform: translateY(0);
            }
            .space-item:hover img{
                transform: rotateY(180deg);
            }
            .space-item:hover p{
                transform: scale(1.2);
            }
            .one{
                width: 450px;
                height: 300px;
                .bg{
                    background-image: url("../../assets/img/film.jpg");
                }
            }
            .two{
                width: 350px;
                height: 250px;
                .bg{
                    background-image: url("../../assets/img/music1.jpg");
                }
            }
            .thr{
                width: 350px;
                height: 250px;
                .bg{
                    background-image: url("../../assets/img/game.jpg");
                }
            }
            .four{
                width: 550px;
                height: 300px;
                .bg{
                    background-image: url("../../assets/img/news.jpg");
                }
            }
            .fif{
                width: 450px;
                height: 300px;
                .bg{
                    background-image: url("../../assets/img/duanzi.jpg");
                }
            }
        }
    }
</style>