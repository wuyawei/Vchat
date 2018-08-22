<template>
    <div class="person-means">
        <el-form ref="personForm" label-width="80px" class="personForm">
            <el-form-item label="头像">
                <el-upload
                        class="avatar-uploader"
                        action="/api/uploadInmage"
                        list-type="picture-card"
                        :show-file-list="false"
                        name="f"
                        :on-change="handleAvatarChange"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                </el-upload>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="nickname" placeholder="名称">
                </el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio v-model="sex" label="1">男</el-radio>
                <el-radio v-model="sex" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input v-model="signature" placeholder="签名">
                </el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="phone" placeholder="手机">
                </el-input>
            </el-form-item>
            <el-form-item label="电子邮箱">
                <el-input v-model="email" placeholder="电子邮箱">
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default{
        name: 'means',
        data() {
            return {
                imageUrl: process.env.IMG_URL + '/img/picture.png', // 显示图片路径
                avatar: '', // 存储地址
                nickname: '',
                signature: '',
                sex: '1',
                email: '',
                phone: ''
            }
        },
        methods: {
            handleAvatarChange(file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            handleAvatarSuccess(res, file) {
                if (res.code === 0) {
                    this.avatar = res.data;
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
            }
        }
    }
</script>
<style lang="scss" scoped>
    .person-means{
        padding: 20px 30px;
        box-sizing: border-box;
        .el-input{
            width:300px;
        }
        .avatar {
            width: 100%;
            display: block;
        }
    }
</style>