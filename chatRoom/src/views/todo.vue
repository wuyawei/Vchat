<template>
    <div class="vchat-todo">
        <vHeader :isMainHeader="false"></vHeader>
        <full-calendar :events="fcEvents" locale="zh-cn" lang="zh" @dayClick="dayClick" @eventClick="eventClick">
            <template slot="fc-event-card" slot-scope="p">
                <p class="todoTitle-box">
                    <span class="vchat-line1 todoTitle">{{p.event.title}}</span>
                    <span>
                        <v-icon class="el-icon-delete" cursor="pointer" :size="14" @clickIcon="delTodo(p.event['_id'])"></v-icon>
                        <v-icon class="el-icon-edit" cursor="pointer" :size="14"></v-icon>
                    </span>
                </p>
            </template>
        </full-calendar>
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
            eventClick(e) {
                console.log(e)
            },
            sure(o) {
                this.fcEvents.push(o);
                this.dialogVisible = false;
            },
            getTodoList() {
                api.getTodoList().then(r => {
                    if (r.code === 0) {
                        this.fcEvents = r.data;
                    }
                });
            },
            upTodo() {},
            delTodo(id) {
                this.$confirm('确认删除该日程记录吗？', '确认信息')
                    .then(() => {
                        api.delTodo({'_id': id}).then(r => {
                            if (r.code === 0) {
                                this.fcEvents = this.fcEvents.filter(v => id !== v['_id']);
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: '删除失败',
                                    type: 'warning'
                                });
                            }
                        })
                    })
                    .catch(action => {
                    });
            }
        },
        mounted() {
            this.getTodoList();
        }
    }
</script>

<style lang="scss" scoped>
    .todoTitle-box{
        display: flex;
        justify-content: space-between;
        padding: 0 5px;
        box-sizing: border-box;
        i:nth-of-type(1){
            margin-right: 3px;
        }
    }
    .todoTitle{
        max-width: 100px;
        margin-right: 10px;
    }
</style>