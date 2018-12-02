<template>
    <div class="vchat-news-item">
        <div class="news-detail-1" v-if="!item.imgextra"  @click="clickNews">
            <a>
                <img v-lazy="item.imgsrc" alt="">
            </a>
            <div class="info">
                <p class="title vchat-line2">{{item.title}}</p>
                <p class="mark">
                    <span class="source">{{item.source}}</span>
                    <span class="ptime">{{item.ptime}}</span>
                </p>
            </div>
        </div>
        <div class="news-detail-2" v-if="item.imgextra && item.imgextra.length > 1"  @click="clickNews">
            <p class="title vchat-line2">{{item.title}}</p>
            <div class="imgtra">
                <a v-for="(v, i) in item.imgextra" :key="i">
                    <img v-lazy="v.imgsrc" alt="">
                </a>
            </div>
            <p class="mark">
                <span class="source">{{item.source}}</span>
                <span class="ptime">{{item.ptime}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'newsItem',
        props: ['item'],
        data() {
            return {

            }
        },
        methods: {
            clickNews() {
                if (this.item.skipURL){
                    sessionStorage.detailSrc = this.item.skipURL;
                } else {
                    sessionStorage.detailSrc = this.item.url;
                }
                this.$router.push({name: 'newsDetail'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-news-item{
        width:630px;
        text-align: left;
        background-color: #fff;
        padding: 10px 15px;
        margin-bottom: 10px;
        .news-detail-1{
            width:100%;
            padding: 15px 10px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            .info{
                width:445px;
                display: flex;
                flex-flow: column;
                justify-content: space-between;
            }
        }
        .news-detail-2{
            width:100%;
            padding: 15px 10px;
            box-sizing: border-box;
        }
        a{
            display: block;
            width:140px;
            height: 88px;
            overflow: hidden;
            min-width: 140px;
            img{
                width:100%;
            }
        }
        .imgtra{
            padding: 10px 0;
            display: flex;
            justify-content: flex-start;
            a{
                margin-right: 10px;
            }
        }
        .title{
            font-size: 18px;
            color: #323232;
        }
        .source{
            display: inline-block;
            padding: 2px 10px;
            border:1px solid #f99;
            margin-right: 10px;
            font-size: 12px;
            color: #f99;
        }
        .ptime{
            font-size: 12px;
            color: #666;
        }
        .news-detail-1:hover, .news-detail-2:hover{
            background-color: #f8f8f8;
        }
    }
</style>