<template>
    <div class="backLog">
        <h3>
            <span>待办日程</span>
            <v-icon name="jia2" color="#ff6b6b" cursor="pointer" title="前往日程管理" @clickIcon="$router.push({name: 'todo'})"></v-icon>
        </h3>
        <div class="todoList">
            <ul v-if="todoList.length">
                <li v-for="(v, i) in todoList" :key="i">
                    <p class="title">{{v.title}}</p>
                    <p class="content">
                        <v-icon name="clock" color="#686868" :size="18"></v-icon>： {{v.content}}
                    </p>
                    <p class="info">
                        <span><i class="address">{{v.address}} </i> {{formatTime(v.start)}} 至 {{formatTime(v.end)}}</span>
                        <span>
                            <v-icon class="el-icon-delete" cursor="pointer" :size="14" @clickIcon="delTodo(v['_id'])"></v-icon>
                            <!--<v-icon class="el-icon-edit" cursor="pointer" :size="14"></v-icon>-->
                        </span>
                    </p>
                </li>
            </ul>
            <v-nodata :url="bg" v-else>
                <p class="vchat-no-have">
                    暂无日程安排哟!
                </p>
            </v-nodata>
        </div>
    </div>
</template>

<script>
    import bg from '../../../assets/img/zwsj4.png';
    import api from '@/api';
    import utils from '@/utils/utils';
    export default{
        name: 'backLog',
        data() {
            return {
                bg: bg,
                todoList: []
            }
        },
        methods: {
            getTodoList() {
                api.getTodoList().then(r => {
                    if (r.code === 0) {
                        this.todoList = r.data;
                    }
                });
            },
            formatTime(t) {
                return utils.formatTime(new Date(t));
            },
            delTodo(id) {
                this.$confirm('确认删除该日程记录吗？', '确认信息')
                    .then(() => {
                        api.delTodo({'_id': id}).then(r => {
                            if (r.code === 0) {
                                this.todoList = this.todoList.filter(v => id !== v['_id']);
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
    .backLog{
        width: 100%;
        height: calc(100% - 250px);
        overflow-y: auto;
        box-sizing: border-box;
        h3{
            display: flex;
            justify-content: space-between;
            line-height: 36px;
            border-bottom: 1px solid #d5d5d5;
            padding: 0 10px;
            box-sizing: border-box;
            font-weight: 400;
            color: #84c2c5;
            background-color: #fff;
        }
        .todoList{
            li{
                text-align: left;
                background-color: #fff;
                padding: 5px 10px;
                box-sizing: border-box;
                margin-bottom: 10px;
            }
            .title{
                font-size: 16px;
                color: #161616;
                margin-bottom: 5px;
                border-left: 3px solid #28828f;
                padding-left: 5px;
            }
            .content{
                font-size: 14px;
                color: #686868;
                margin-bottom: 5px;
            }
            .info{
                font-size: 12px;
                color: #9a9a9a;
                font-family: "Times New Roman", Times, serif;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .address{
                    color: #ff714f;
                    font-style: normal;
                    display: inline-block;
                    border: 1px solid #ff714f;
                    padding: 1px 5px;
                }
                i{
                    margin-right: 6px;
                }
                span:nth-of-type(2) {
                    display: none;
                }
                i:nth-of-type(1):hover{
                    color: #ff2b3a !important;
                }
                i:nth-of-type(2):hover{
                    color: #1fbeca !important;
                }
            }
            li:hover{
                background-color: #f8f8f8;
            }
            li:hover span:nth-of-type(2) {
                display: block;
            }
        }
    }
</style>