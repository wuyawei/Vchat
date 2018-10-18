<template>
    <div class="vchatMessage">
        <ul>
            <li>
                <span class="vchat-line1">验证消息：xxx申请加您为好友</span>
                <el-popover
                        placement="left"
                        width="400"
                        v-model="visible">
                    <div class="Validate-mes">
                        <div class="header">
                            <a class="vchat-photo">
                                <img :src="IMGURL + '/uploads/f-1537666687106-f1537666686788.png'" alt="">
                            </a>
                            <p>
                                <span>芒果</span>
                                <span class="signature">老子天下第一</span>
                            </p>
                        </div>
                        <div class="info">
                            附加消息：<span>你好，我想和你交朋友</span>
                        </div>
                        <div class="footer">
                            <button class="vchat-button-mini info" @click="visible = !visible">拒绝</button>
                            <button class="vchat-button-mini">同意</button>
                        </div>
                    </div>
                    <span slot="reference" @click="visible = !visible">查看</span>
                </el-popover>
            </li>
            <li>
                <span class="vchat-line1">验证消息：xxx申请加入天下第一群</span>
                <span>查看</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        name: 'vchatMessage',
        data() {
            return {
                IMGURL: process.env.IMG_URL,
                visible: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchatMessage{
        width:100%;
        padding: 15px 30px 10px 15px;
        box-sizing: border-box;
        overflow-y: auto;
        li{
            text-align: left;
            color: #fff;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            padding: 5px 10px;
            margin-bottom: 5px;
            box-sizing: border-box;
            background-color: rgba(0,0,0,0.3);
            span:nth-of-type(2){
                color: #27cac7;
                font-size: 12px;
                cursor: pointer;
                opacity: 0.8;
                min-width: 24px;
                margin-left: 15px;
            }
            span:nth-of-type(2):hover{
                opacity: 1;
            }
        }
    }
</style>