<template>
    <i :class="['iconfont', className]" :style="{fontSize: size + 'px', color: color, cursor: cursor}"></i>
</template>
<script>
    export default{
        name: 'Icon',
        props: {
            name: {
                type: String,
                default: 'jia2'
            },
            size: {
                type: Number,
                default: 20
            },
            color: {
                type: String,
                default: '#323232'
            },
            cursor: {
                type: String,
                default: 'inherit'
            },
        },
        computed: {
            className() {
                return 'icon-' + this.name;
            }
        },
        data() {
            return {};
        }
    }
</script>
<style lang="scss" scoped>
    i{
        display: inline-block;
        margin: 0 5px;
    }
</style>