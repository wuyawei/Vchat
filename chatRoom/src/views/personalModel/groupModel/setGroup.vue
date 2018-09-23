<template>
    <div class="vChat-comm-list">
        <p class="back">
            <i class="iconfont icon-fanhui" @click="toOwn"></i>
            <span>新建群聊</span>
        </p>
        <el-form ref="groupForm" label-width="65px" class="groupForm" :rules="groupRules" :model="groupForm">
            <el-form-item label="群头像">
                <el-upload
                        class="avatar-uploader"
                        action="/api/uploadFile"
                        list-type="picture-card"
                        :show-file-list="false"
                        name="f"
                        :on-change="handleAvatarChange"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="群名称" prop="groupName">
                <el-input v-model="groupForm.groupName" placeholder="名称">
                </el-input>
            </el-form-item>
            <el-form-item label="群简介" prop="groupDesc">
                <el-input v-model="groupForm.groupDesc" placeholder="请输入不超过200个字符" type="textarea" aotusize resize="none" :maxlength="200">
                </el-input>
            </el-form-item>
        </el-form>
        <button @click="setUp">创建</button>
    </div>
</template>
<script>
    import api from '@/api';
    export  default {
        name: 'setGroup',
        data() {
            let validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入群名称'));
                } else {
                    let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{2,10}$/;
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
                imageUrl: '', // 显示图片路径
                groupForm: {
                    groupName: '',
                    groupDesc: ''
                },
                groupImage: '',
                groupRules: {
                    groupName: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    groupDesc: [
                        { validator: validateDesc, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleAvatarChange(file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            handleAvatarSuccess(res, file) {
                if (res.code === 0) {
                    this.groupImage = res.data;
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            toOwn() {
                this.$emit('toOwn');
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
                                this.$message.success('新建成功');
                                this.$emit('toOwn', 'setOk');
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
<style lang="scss">
    .vChat-comm-list {
        width: 100%;
        height: 100%;
        padding: 0 15px;
        box-sizing: border-box;
        .back {
            display: flex;
            justify-content: center;
            padding: 10px 15px;
            box-sizing: border-box;
            position: relative;
            margin-bottom: 10px;
            span {
                color: #27cac7;
            }
            i {
                position: absolute;
                left: 5px;
                top: 10px;
                display: inline-block;
                width: 24px;
                height: 24px;
                cursor: pointer;
            }
            i:hover {
                color: #1fbeca;
            }
        }
        button{
            width:100%;
            background-color: #1fbeca;
            border: none;
            outline: none;
            height: 36px;
            color: #fff;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        button:hover{
            background-color: rgba(19, 164, 192, 0.61);
            color: #fff;
        }
        .avatar-uploader{
            .el-upload--picture-card{
                overflow: hidden;
            }
        }
        .avatar {
            width: 100%;
            display: block;
        }
    }
</style>