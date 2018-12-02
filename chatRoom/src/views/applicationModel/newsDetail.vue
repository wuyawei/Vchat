<template>
    <div class="vchat-newsDetail vchat-application">
        <div class="news-iframe">
            <iframe :src="detailSrc" id="newsIframe" v-if="detailSrc"></iframe>
            <p v-else>页面出错了！</p>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'newsDetail',
        data() {
            return {
                detailSrc: sessionStorage.detailSrc || ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .news-iframe{
        width: 1000px;
        height: 100%;
        margin: 0 auto;
        #newsIframe{
            width:100%;
            height: 100%;
            border: none;
            html{
                background-color: #f7f7f7;
            }
        }
    }
</style>