<template>
    <div class="backLog">
        <h3>
            <span>待办日程</span>
            <v-icon name="jia2" color="#ff6b6b" cursor="pointer" title="前往日程管理"></v-icon>
        </h3>
        <div class="todoList">
            <ul v-if="todoList.length">
                <li v-for="(v, i) in todoList" :key="i">
                    <p class="title">{{v.title}}</p>
                    <p class="date">{{v.date}}</p>
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
    export default{
        name: 'backLog',
        data() {
            return {
                bg: bg,
                todoList: [
                    {
                        title: '码字2小时',
                        date: '11月25日'
                    }
                ]
            }
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
            }
            .date{
                font-size: 12px;
                color: #888;
            }
        }
    }
</style>