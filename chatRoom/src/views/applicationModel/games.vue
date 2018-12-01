<template>
    <div class="vchat-games">
        <ul>
            <li class="vchat-games-item" v-for="(v, i) in gamesList" :key="i">
                <router-link :to="{name: v.name}">
                    <img :src="v.url" alt="" class="pd">
                    <div class="pd">
                        <p class="title">{{v.title}}</p>
                        <p>进入游戏</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import h2048 from '../../assets/img/2048.png';
    export default{
        data() {
            return {
                gamesList: [
                    {
                        title: '2048',
                        url: h2048,
                        name: 'h2048'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-games{
        width:100%;
        height: 100%;
        ul{
            width:100%;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            overflow-y: auto;
        }
        .vchat-games-item{
            width:300px;
            height: 169px;
            margin: 20px;
            overflow: hidden;
            .pd{
                width:100%;
                height: 100%;
                position: absolute;
                left:0;
                top:0;
            }
            a{
                display: block;
                width:100%;
                height: 100%;
                position: relative;
                img{
                    width:100%;
                    z-index: 1;
                }
            }
            div{
                z-index: 2;
                transition: transform 0.3s;
                transform: scale(0);
                color: #fff;
                background-color: rgba(0,0,0,0.5);
                padding-top: 50px;
                box-sizing: border-box;
                .title{
                    font-size: 18px;
                    margin-bottom: 5px;
                }
            }
        }
        .vchat-games-item:hover{
            div{
                transform: scale(1);
            }
        }
    }
</style>