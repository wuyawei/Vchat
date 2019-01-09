<template>
    <div class="vchat-todo">
        <vHeader :isMainHeader="false"></vHeader>
        <full-calendar :events="fcEvents" locale="zh-cn" lang="zh" @dayClick="dayClick"></full-calendar>
        <dialog-todo :visible="dialogVisible" @close="dialogVisible = false" @sure="sure" :date="chooseDate"></dialog-todo>
    </div>
</template>

<script>
    import vHeader from '@/views/components/header/vHeader';
    import dialogTodo from './dialogTodo.vue';
    export default{
        data() {
            return {
                fcEvents: [],
                dialogVisible: false,
                chooseDate: ''
            }
        },
        components: {
            vHeader,
            dialogTodo
        },
        methods: {
            dayClick(date) {
                this.chooseDate = date;
                this.dialogVisible = true;
            },
            sure(o) {
                this.fcEvents.push(o);
                this.dialogVisible = false;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>