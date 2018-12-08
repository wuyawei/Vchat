<template>
    <div class="vchat-scroll" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default{
        name: 'vScroll',
        props: {
            scrollbar: { // 开启滚动条fade 为 true 表示当滚动停止的时候滚动条是否需要渐隐，interactive 表示滚动条是否可以交互。
                type: Object,
                default: function () {
                    return {
                        fade: true,
                        interactive: true
                    };
                }
            },
            mouseWheel: { // PC 端的鼠标滚轮speed 表示鼠标滚轮滚动的速度，invert 为 true 表示滚轮滚动和时机滚动方向相反，easeTime 表示滚动动画的缓动时长
                type: Object,
                default: function () {
                    return {
                        speed: 20,
                        invert: false,
                        easeTime: 300
                    };
                }
            },
            data: null
        },
        data() {
            return {
                scroll: null
            }
        },
        watch: {
            data() {
                this.$nextTick(_ => {
                    void(this.scroll ? this.refresh() : this.initScroll());
                });
            }
        },
        methods: {
            initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    scrollbar: this.scrollbar,
                    mouseWheel: this.mouseWheel
                })
            },
            pullup() { // 滚动到底部的事件
            },
            pulldown() { // 顶部下拉的事件
            },
            refresh() { // 重新计算 better-scroll
                // 代理better-scroll的refresh方法
                this.scroll && this.scroll.refresh();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-scroll{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
</style>