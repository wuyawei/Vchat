<template>
    <div class="crop-box">
        <img :src="url" ref="avatar-image">
    </div>
</template>
<script>
    import Cropper from "cropperjs";
    export default{
        props: ['url'],
        data() {
            return {
                cropper: null
            };
        },
        watch: {
            url() {
                this.initCropper();
            }
        },
        methods: {
            initCropper() {
                this.cropper = new Cropper(this.$refs['avatar-image'], {
                    viewMode:1,
                    crop: function (e) {
                        console.log(e.detail.x);
                        console.log(e.detail.y);
                        console.log(e.detail.width);
                        console.log(e.detail.height);
                        console.log(e.detail.rotate);
                        console.log(e.detail.scaleX);
                        console.log(e.detail.scaleY);
                    }
                });
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
    @import "../../../static/css/cropper";
</style>