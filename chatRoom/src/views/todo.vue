<template>
    <div class="vchat-todo">
        <vHeader :isMainHeader="false"></vHeader>
        <full-calendar :events="fcEvents" locale="zh-cn" lang="zh"></full-calendar>
    </div>
</template>

<script>
    import vHeader from '@/views/components/header/vHeader';
    export default{
        data() {
            return {
                fcEvents: []
            }
        },
        components: {
            vHeader
        }
    }
</script>

<style lang="scss" scoped>

</style>