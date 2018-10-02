<template>
    <div class="vchat-groupDetail">
        <v-apheader title="群聊" back="/personalMain/group/ownGroup"></v-apheader>
        <div class="vchat-groupDetail-container">

        </div>
    </div>
</template>

<script>
    import vApheader from '@/views/components/header/vApheader';
    export default{
        data() {
            return {};
        },
        components: {
            vApheader
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-groupDetail{
        width:100%;
        height: 100%;
        .vchat-groupDetail-container{
            width:100%;
            padding: 0 15px;
        }
    }
</style>