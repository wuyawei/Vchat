<template>
    <div class="vChat-group">
        <div class="vChat-group-list">
            <ownGroup @tomore="toMore" v-if="isOwn"></ownGroup>
            <searchGroup v-else @back="back"></searchGroup>
        </div>
        <div class="vChat-group-chat"></div>
    </div>
</template>

<script>
    import ownGroup from '../components/ownGroup.vue';
    import searchGroup from '../components/searchGroup.vue';
    export default{
        data() {
            return {
                isOwn: true
            }
        },
        components: {
            ownGroup,
            searchGroup
        },
        methods: {
            toMore() {
                this.isOwn = false;
            },
            back() {
                this.isOwn = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vChat-group{
        width:100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        .vChat-group-list{
            width: 20%;
            min-width: 200px;
            height: 100%;
            background-color: #fff;
            box-shadow: 0 0 1px 1px #d5d5d5;
            margin-right: 50px;
        }
        .vChat-group-chat{
            width:70%;
            min-width: 800px;
            height: 100%;
            background-color: #fff;
            box-shadow: 0 0 1px 1px #d5d5d5;
        }
    }
</style>