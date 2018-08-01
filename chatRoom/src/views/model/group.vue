<template>
    <div class="vChat-group">
        <div class="vChat-group-list">
            <ownGroup @tomore="toMore"
                      v-if="isOwn === 'own'"
                      @newSet="newSet"
                      :setOk="setOk"
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
        <div class="vChat-group-chat">
            <chat></chat>
        </div>
    </div>
</template>

<script>
    import ownGroup from '../components/ownGroup.vue';
    import searchGroup from '../components/searchGroup.vue';
    import setGroup from '../components/setGroup.vue';
    import chat from '../components/chat.vue';
    export default{
        data() {
            return {
                isOwn: 'own',
                setOk: false
            }
        },
        components: {
            ownGroup,
            searchGroup,
            setGroup,
            chat
        },
        methods: {
            toMore() {
                this.isOwn = 'more';
            },
            toOwn(f) {
                if (f === 'setOk') {
                    this.setOk = true;
                }
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
        justify-content: space-around;
        .vChat-group-list{
            width: 20%;
            min-width: 300px;
            height: 100%;
            background-color: #fff;
            box-shadow: 0 0 1px 1px #d5d5d5;
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