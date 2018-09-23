<template>
    <div class="vChat-group">
        <div class="vChat-group-list">
            <transition name="move">
                <router-view @currGroup="getCurrGroup"></router-view>
            </transition>
        </div>
        <div class="vChat-group-chat">
            <chat :currGroup="currGroup"></chat>
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
            getCurrGroup(id) {
                this.currGroup = id;
            }
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
            width: 20%;
            min-width: 300px;
            height: 100%;
            background-color: #fff;
            box-shadow: 0 0 1px 1px #d5d5d5;
            overflow: hidden;
            position: relative;
        }
        .vChat-group-chat{
            width:74%;
            min-width: 820px;
            height: 100%;
            background-color: #fff;
            box-shadow: 0 0 1px 1px #d5d5d5;
        }
    }
</style>