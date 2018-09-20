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
                <input type="file" @change="fileChange" ref="cropFile">
            </div>
            <div>
                <el-button type="primary" @click="reset">重置</el-button>
                <el-button type="primary">上传</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import Cropper from "cropperjs";
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
            height: 300px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            .Vchat-crop-left{
                width:300px;
                height: 300px;
            }
            .Vchat-crop-right{
                width:200px;
                height: 200px;
                border-radius: 50%;
                overflow: hidden;
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