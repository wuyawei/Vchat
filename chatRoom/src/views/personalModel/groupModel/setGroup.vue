<template>
    <div class="vchat-setGroup">
        <v-apheader title="新建群聊" back="/main/personalMain/group/own"></v-apheader>

        <div class="vchat-setGroup-contianer">
            <el-form ref="groupForm" label-width="65px" class="groupForm" :rules="groupRules" :model="groupForm">
                <el-form-item label="群头像">
                    <div class="avatar-container" @click="setShowCrop">
                        <img v-if="groupImage" :src="InmageUrl + groupImage" class="avatar">
                        <i class="el-icon-plus" v-else></i>
                    </div>
                </el-form-item>
                <el-form-item label="群名称" prop="groupName">
                    <el-input v-model="groupForm.groupName" placeholder="名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="群简介" prop="groupDesc">
                    <el-input v-model="groupForm.groupDesc" placeholder="请输入不超过200个字" type="textarea" aotusize resize="none" :maxlength="200">
                    </el-input>
                </el-form-item>
            </el-form>
            <button @click="setUp" class="vchat-full-button">创建</button>
        </div>
        <el-dialog
                :visible.sync="showCrop"
                width="700px"
                :before-close="handleClose">
            <cropper :url="cropUrl" @avatar="getAvatar"></cropper>
        </el-dialog>
    </div>
</template>
<script>
    import api from '@/api';
    import cropper from '@/views/components/cropper/cropper';
    import vApheader from '@/views/components/header/vApheader';
    export  default {
        name: 'setGroup',
        data() {
            let validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入群名称'));
                } else {
                    let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9!！￥@#$,，.。？?、/;:：；|~·]{2,10}$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入2~10位中文、数字、字母、下划线'));
                        return;
                    }
                    callback();
                }
            };
            let validateDesc = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入群简介'));
                } else {
                    if (value.length > 200) {
                        callback(new Error('请输入不超过200位字符'));
                        return;
                    }
                    callback();
                }
            };
            return {
                groupForm: {
                    groupName: '',
                    groupDesc: ''
                },
                InmageUrl: process.env.IMG_URL,
                groupImage: '/img/zwsj5.png', // 显示图片路径
                groupRules: {
                    groupName: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    groupDesc: [
                        { validator: validateDesc, trigger: 'blur' }
                    ]
                },
                showCrop: false, // 裁剪框开关
                cropUrl: '' // 裁剪图片地址
            }
        },
        components: {
            cropper,
            vApheader
        },
        methods: {
            setShowCrop() { // 打开裁剪框
                this.showCrop = true;
                this.cropUrl = process.env.IMG_URL + this.groupImage;
            },
            handleClose(done) { // 关闭裁剪框清空地址
                this.cropUrl = '';
                done();
            },
            getAvatar(url) { // 裁剪后的地址
                this.groupImage = url;
                this.showCrop = false;
            },
            setUp() {
                this.$refs['groupForm'].validate((valid) => {
                    if (valid) {
                        let params = {
                            groupImage: this.groupImage,
                            groupName: this.groupForm.groupName,
                            groupDesc: this.groupForm.groupDesc,
                        };
                        api.createGroup(params).then(r => {
                            if (r.code === 0) {
                                let params = {
                                    name: this.groupForm.groupName,
                                    photo: this.groupImage,
                                    id: r.data,
                                    type: 'group'
                                };
                                api.addConversitionList(params).then(r => {
                                    if (r.code === 0) {
                                        this.$store.commit('setConversationsList', params);
                                    }
                                });
                                this.$message.success('创建成功');
                                this.$router.push('/main/personalMain/group/own');
                            } else {
                                this.$message.success('创建成功');
                            }
                        });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .vchat-setGroup {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .avatar-container{
            width:150px;
            height: 150px;
            overflow: hidden;
            background-color: #dfdfdf;
            border-radius: 4px;
            border:1px solid #d5d5d5;
            text-align: center;
            line-height: 150px;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
            .avatar {
                width: 100%;
                display: block;
            }
        }
        .avatar-container:hover{
            color: #1fbeca;
        }
        .vchat-setGroup-contianer{
            box-sizing: border-box;
            padding: 10px 15px 0;
        }
    }
</style>