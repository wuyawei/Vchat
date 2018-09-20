<template>
    <div class="person-means">
        <el-form ref="personForm" label-width="80px" class="personForm" :model="personForm" :rules="personRules">
            <el-form-item label="头像">
                <div class="avatar" @click="setShowCrop">
                    <img :src="imageUrl">
                </div>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio v-model="personForm.sex" label="1">男</el-radio>
                <el-radio v-model="personForm.sex" label="2">女</el-radio>
                <el-radio v-model="personForm.sex" label="3">保密</el-radio>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="personForm.nickname" placeholder="名称">
                </el-input>
            </el-form-item>
            <el-form-item label="个性签名" prop="signature">
                <el-input v-model="personForm.signature" placeholder="签名">
                </el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
                <el-input v-model="personForm.phone" placeholder="手机">
                </el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="personForm.email" placeholder="电子邮箱">
                </el-input>
            </el-form-item>
        </el-form>
        <el-dialog
                :visible.sync="showCrop"
                width="600px"
                :before-close="handleClose">
            <cropper :url="cropUrl"></cropper>
        </el-dialog>
    </div>
</template>
<script>
    import cropper from '../components/cropper';
    export default{
        name: 'means',
        data() {
            return {
                imageUrl: process.env.IMG_URL + this.$store.state.user.photo, // 显示图片路径
                avatar: '', // 存储地址
                personForm: {
                    nickname: '',
                    signature: '',
                    sex: '1',
                    email: '',
                    phone: ''
                },
                showCrop: false,
                cropUrl: '', // 裁剪地址
                personRules: {
                }
            }
        },
        components: {
            cropper
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
            },
            handleClose(done) {
                this.cropUrl = '';
                done();
            },
            setShowCrop() {
                this.showCrop = true;
                this.cropUrl = this.imageUrl;
            }
        },
        mounted() {
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
            width: 120px;
            height: 120px;
            border: 1px solid #ddd;
            border-radius: 50%;
            overflow: hidden;
            img{
                width:100%;
            }
        }
    }
</style>