<template>
    <div class="Vchat-crop-box">
        <div class="Vchat-crop-container">
            <div class="Vchat-crop-left">
                <img :src="url" ref="avatar-image">
            </div>
            <div class="Vchat-crop-right">
                <img :src="cropedUrl" alt="">
            </div>
        </div>
        <div class="Vchat-crop-btn">
            <div class="choose-pic">
                <el-button size="small" type="primary">选择图片</el-button>
                <input type="file" @change="fileChange" ref="cropFile" accept="image/gif,image/jpeg,image/jpg,image/png">
            </div>
            <div>
                <el-button type="primary" @click="reset">重置</el-button>
                <el-button type="primary" @click="uploadImage">上传</el-button>
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
                cropingUrl: ''
            };
        },
        watch: {
            url(url) {
                this.$refs['cropFile'].value = '';
                this.cropper.replace(url);
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
                let bytes = window.atob(this.cropedUrl.split(',')[1]);
                let ab = new ArrayBuffer(bytes.length);
                let ia = new Uint8Array(ab);
                for(let i = 0; i < bytes.length; i++){
                    ia[i] = bytes.charCodeAt(i);
                }
                let blob = new Blob([ab], {type: 'image/png'}); //type为图片的格式
                let formdata = new FormData(); //TDOD Ajax或者其他方式上传FormData对象
                formdata.append('f', blob, 'f' + Date.now() + '.png');
                api.uploadFile(formdata).then(r => {
                    if (r.code === 0) {
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                        this.$emit('avatar', r.data);
                    } else {
                        this.$message({
                            message: '上传失败',
                            type: 'success'
                        })
                    }
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
    .Vchat-crop-box{
        width:100%;
        .Vchat-crop-container{
            width:100%;
            height: 400px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            .Vchat-crop-left{
                width:400px;
                height: 400px;
                overflow: hidden;
            }
            .Vchat-crop-right{
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
        .Vchat-crop-btn{
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
    @import "../../../static/css/cropper";
</style>