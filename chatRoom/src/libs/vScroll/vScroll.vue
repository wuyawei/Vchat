<template>
    <div class="vchat-scroll" v-loadMore="loadMore" :data-scrollWay="scrollWay" :data-nodata="nodata">
        <slot name="down"></slot>
        <span id="loadmoreIcon" style="overflow: hidden" v-show="!nodata">
            <v-icon class="el-icon-loading" :size="28" color="#fff"></v-icon>
        </span>
        <span v-show="nodata">{{nodataText}}</span>
        <slot name="up"></slot>
    </div>
</template>

<script>
    export default{
        name: 'vScroll',
        props: {
            scrollWay: { // up 、down
                type: String,
                default: 'up'
            },
            loadMore: {
                type: Function,
                default: function() {
                    return function() {};
                }
            },
            nodata: {
                type: Boolean,
                default: false
            },
            nodataText: {
                type: String,
                default: '没有更多数据了'
            }
        },
        data() {
            return {
                scroll: null
            }
        },
        directives: {
            'loadMore': {
                inserted(el, binding) {
                    let loadmoreIcon = document.getElementById('loadmoreIcon');
                    loadmoreIcon.style.display = 'none';
                    el.dataset.flag = 'true';
                    function elscroll() {
                        /*
                             * scrollHeight 获取元素内容高度(只读)
                             * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                             * clientHeight 读取元素的可见高度(只读)
                             * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                             * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                             */
                        if (el.dataset.nodata === 'true') {
                            el.removeEventListener('scroll', elscroll)
                        }
                        let CONDITION;
                        if (el.dataset.scrollWay === 'up') {
                            CONDITION = this.scrollTop <= 0;
                        } else {
                            CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;
                        }
                        if (CONDITION && el.dataset.flag === 'true') {
                            el.dataset.flag = 'false';
                            loadmoreIcon.style.display = 'block';
                            binding.value(() => {
                                el.dataset.flag = 'true';
                                loadmoreIcon.style.display = 'none';
                            });
                        }
                    }
                    el.addEventListener('scroll', elscroll);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-scroll{
        width: 100%;
        height: 100%;
        overflow: hidden;
        span{
            font-size: 12px;
        }
    }
</style>