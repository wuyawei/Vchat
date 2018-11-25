<template>
    <div class="vchat-appSpace">
        <el-carousel trigger="click" height="100%" arrow="never" indicator-position="none"  :interval="300000">
            <el-carousel-item v-for="(item, i) in bgList" :key="i">
                <a class="DetailImage-a" :style="{backgroundImage: 'url('+ IMG_URL + item +')'}">
                </a>
            </el-carousel-item>
        </el-carousel>
        <div class="vchat-appSpace-container">
            <div class="space-item one">
                <img src="../../assets/img/film-icon.png" alt="">
                <p>看视频</p>
                <div class="bg"></div>
            </div>
            <div class="space-item two">
                <img src="../../assets/img/music-icon.png" alt="">
                <p>听音乐</p>
                <div class="bg"></div>
            </div>
            <div class="space-item thr">
                <img src="../../assets/img/game-icon.png" alt="">
                <p>玩游戏</p>
                <div class="bg"></div>
            </div>
            <div class="space-item four">
                <img src="../../assets/img/news-icon.png" alt="">
                <p>看头条</p>
                <div class="bg"></div>
            </div>
            <div class="space-item fif">
                <img src="../../assets/img/duanzi-icon.png" alt="">
                <p>聊段子</p>
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
                List: ['/img/app9.jpg', '/img/app3.jpg', '/img/app4.jpg', '/img/app5.jpg', '/img/app6.jpg', '/img/app8.jpg']
            }
        },
        computed: {
            bgList() { // 随机排序
                this.List.sort(function(){ return 0.5 - Math.random() });
                return this.List;
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