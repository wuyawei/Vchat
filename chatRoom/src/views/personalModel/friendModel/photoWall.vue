<template>
    <div class="vchat-photoWall">
        <v-apheader title="照片墙" back="-1"></v-apheader>
        <ul class="photoWall-ul">
            <li v-for="(v, i) in coverList" :key="i">
                <a>
                    <img :src="IMG_URL + v" alt="">
                </a>
            </li>
            <li>
            </li>
        </ul>
    </div>
</template>

<script>
    import api from '@/api';
    import vApheader from '@/views/components/header/vApheader';
    export default{
        name: 'photoWall',
        data() {
            return {
                IMG_URL: process.env.IMG_URL,
                coverList: []
            }
        },
        components: {
            vApheader
        },
        methods: {
            getCover() {
                let params = {
                    id: this.$route.params.id
                };
                api.getUserInfo(params).then(r => {
                    if (r.code === 0) {
                        this.coverList = r.data.cover;
                    }
                })
            }
        },
        mounted() {
            this.getCover();
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-photoWall{
        width:100%;
        height: 100%;
        .photoWall-ul{
            width:100%;
            padding: 10px 15px 0;
            height: calc(100% - 40px);
            box-sizing: border-box;
            text-align: left;
            li{
                margin: 5px;
                display: inline-block;
                a{
                    display: block;
                    width:130px;
                    height: 70px;
                    border:1px solid #f5f5f5;
                    box-sizing: border-box;
                    overflow: hidden;
                    img{
                        width:100%;
                    }
                }
            }
        }
    }
</style>