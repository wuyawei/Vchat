<template>
    <div class="vChat-group">
        <div class="vChat-group-list">
            <ownGroup @tomore="toMore"
                      v-if="isOwn === 'own'"
                      @newSet="newSet"
            ></ownGroup>
            <searchGroup v-if="isOwn === 'more'"
                         @toOwn="toOwn"
                         @newSet="newSet"
            ></searchGroup>
            <setGroup
                    v-if="isOwn === 'set'"
                    @toOwn="toOwn"
            ></setGroup>
        </div>
        <div class="vChat-group-chat"></div>
    </div>
</template>

<script>
    import ownGroup from '../components/ownGroup.vue';
    import searchGroup from '../components/searchGroup.vue';
    import setGroup from '../components/setGroup.vue';
    export default{
        data() {
            return {
                isOwn: 'own'
            }
        },
        components: {
            ownGroup,
            searchGroup,
            setGroup
        },
        methods: {
            toMore() {
                this.isOwn = 'more';
            },
            toOwn() {
                this.isOwn = 'own';
            },
            newSet() {
                this.isOwn = 'set';
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