<template>
    <div class="vchat-news"></div>
</template>

<script>
    import api from '@/api';
    export default{
        name: 'news',
        data() {
            return {

            }
        },
        methods: {
            getHotNews() {
                api.getHotNews().then(r => {
//                   console.log(r);
                });
            },
            getNewsDetail() {
                api.getNewsDetail().then(r => {
//                    console.log(r);
                })
            }
        },
        mounted() {
            this.getHotNews();
            this.getNewsDetail();
        }
    }
</script>

<style lang="scss" scoped>

</style>