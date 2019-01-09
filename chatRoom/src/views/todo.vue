<template>
    <div class="vchat-todo">
        <vHeader :isMainHeader="false"></vHeader>
        <full-calendar :events="fcEvents" locale="zh-cn" lang="zh" @dayClick="dayClick"></full-calendar>
        <dialog-todo :visible="dialogVisible" @close="dialogVisible = false" @sure="sure" :date="chooseDate"></dialog-todo>
    </div>
</template>

<script>
    import api from '@/api';
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
                this.addTodo(o);
            },
            getTodoList() {
                api.getTodoList().then(r => {
                    if (r.code === 0) {
                        this.fcEvents = r.data;
                    }
                });
            },
            addTodo(o) {
                api.addTodo(o).then(r => {
                    if (r.code === 0) {
                        this.$message({
                            message: '新建成功',
                            type: 'success'
                        });
                        this.fcEvents.push(o);
                    } else {
                        this.$message({
                            message: '新建失败',
                            type: 'warning'
                        });
                    }
                    this.dialogVisible = false;
                });
            },
            upTodo() {},
            delTodo() {}
        },
        mounted() {
            this.getTodoList();
        }
    }
</script>

<style lang="scss" scoped>

</style>