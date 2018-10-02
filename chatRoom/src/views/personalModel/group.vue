<template>
    <div class="vChat-group">
        <div class="vChat-group-list">
            <transition name="move">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import chat from '../components/chat.vue';
    export default{
        data() {
            return {
                currGroup: '' //  当前展示群聊id
            }
        },
        components: {
            chat
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .vChat-group{
        width:100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        .vChat-group-list{
            width: 100%;
            min-width: 300px;
            height: 100%;
            background-color: #fff;
            box-shadow: 0 0 1px 1px #d5d5d5;
            overflow: hidden;
            position: relative;
        }
    }
</style>