<template>
    <div class="vchat-crop-box">
        <div class="vchat-crop-container">
            <div class="vchat-crop-left">
                <img :src="url" ref="avatar-image">
            </div>
            <div class="vchat-crop-right">
                <img :src="cropedUrl" alt="">
            </div>
        </div>
        <div class="vchat-crop-btn">
            <div class="choose-pic">
                <el-button size="small" type="primary">选择图片</el-button>
                <input type="file" @change="fileChange" ref="cropFile" accept="image/gif,image/jpeg,image/jpg,image/png">
            </div>
            <div>
                <el-button type="primary" @click="reset">重置</el-button>
                <el-button type="primary" @click="uploadImage">
                    <v-icon class="el-icon-loading" color="#fff" :size="14" v-if="loading"></v-icon>
                    上传
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Cropper from "cropperjs";
    import api from '@/api';
    export default{
        props: ['url'],
        data() {
            return {
                cropper: null,
                cropedUrl: '',
                cropingUrl: '',
                loading: false
            };
        },
        watch: {
            url(url) {
                if (this.cropper) {
                    this.$refs['cropFile'].value = '';
                    this.cropper.replace(url);
                }
            }
        },
        methods: {
            initCropper() {
                this.cropper = new Cropper(this.$refs['avatar-image'], {
                    viewMode:1,
                    aspectRatio: 1,
                    crop: () => {
                        this.cropedUrl = this.cropper.getCroppedCanvas().toDataURL('image/png');
                    }
                });
            },
            reset() {
                this.cropper.reset();
            },
            fileChange(e) {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = (ev) => {
                    this.cropper.replace(ev.target.result);
                }
            },
            uploadImage() {
                let bytes = window.atob(this.cropedUrl.split(',')[1]); // 这里对base64串进行操作，去掉url头，并转换为byte
                let ab = new ArrayBuffer(bytes.length); // 处理异常，将ASCII码小于0的转换为大于0，这里有两种写法
                let ia = new Uint8Array(ab);
                for(let i = 0; i < bytes.length; i++){
                    ia[i] = bytes.charCodeAt(i);
                }
                this.loading = true;
                let blob = new Blob([ab], {type: 'image/png'}); // type为图片的格式
                let formdata = new FormData();
                formdata.append('f', blob, 'f' + Date.now() + '.png');
                api.uploadFile(formdata).then(r => {
                    if (r.code === 0) {
                        this.$emit('avatar', r.data);
                    } else {
                        this.$message({
                            message: '保存失败',
                            type: 'warning'
                        })
                    }
                    this.loading = false;
                })
            }
        },
        mounted() {
            this.$nextTick(_ => {
                if (this.url) {
                    this.initCropper();
                }
            });
        }
    }
</script>
<style lang="scss">
    .vchat-crop-box{
        width:100%;
        .vchat-crop-container{
            width:100%;
            height: 400px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            .vchat-crop-left{
                width:400px;
                height: 400px;
                border: 1px solid #d5d5d5;
                overflow: hidden;
            }
            .vchat-crop-right{
                width:200px;
                height: 200px;
                border-radius: 50%;
                overflow: hidden;
                border:1px solid #d5d5d5;
                img{
                    border-radius: 50%;
                    width:100%;
                }
            }
        }
        .vchat-crop-btn{
            width:100%;
            display: flex;
            justify-content: space-between;
            .choose-pic{
                position: relative;
                width:80px;
                height: 32px;
                cursor: pointer;
                >input{
                    position: absolute;
                    left:0;
                    top:0;
                    opacity: 0;
                    width:80px;
                    height: 32px;
                }
            }
        }
    }
    @import "../../../../static/css/cropper";
</style>