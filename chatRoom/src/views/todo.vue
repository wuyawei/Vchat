<template>
    <div class="vchat-todo">
        <vHeader :isMainHeader="false"></vHeader>
        <full-calendar :events="fcEvents" locale="zh-cn" lang="zh" @dayClick="dayClick"></full-calendar>
        <dialog-todo :visible="dialogVisible" @close="dialogVisible = false"></dialog-todo>
    </div>
</template>

<script>
    import vHeader from '@/views/components/header/vHeader';
    import dialogTodo from './dialogTodo.vue';
    export default{
        data() {
            return {
                fcEvents: [],
                dialogVisible: false
            }
        },
        components: {
            vHeader,
            dialogTodo
        },
        methods: {
            dayClick(date) {
                this.dialogVisible = true;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>