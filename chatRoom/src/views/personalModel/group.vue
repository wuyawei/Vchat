<template>
    <div class="vChat-group">
        <div class="vChat-group-list">
            <transition name="move">
                <ownGroup @tomore="toMore"
                          v-show="isOwn === 'own'"
                          @newSet="newSet"
                          @currGroup="getCurrGroup"
                          :setOk="setOk"
                ></ownGroup>
            </transition>
            <transition name="move">
                <searchGroup v-show="isOwn === 'more'"
                             @toOwn="toOwn"
                             @newSet="newSet"
                ></searchGroup>
            </transition>
            <transition name="move">
                <setGroup
                        v-show="isOwn === 'set'"
                        @toOwn="toOwn"
                ></setGroup>
            </transition>
            <router-view></router-view>
        </div>
        <div class="vChat-group-chat">
            <chat :currGroup="currGroup"></chat>
        </div>
    </div>
</template>

<script>
    import ownGroup from './groupModel/ownGroup.vue';
    import searchGroup from './groupModel/searchGroup.vue';
    import setGroup from './groupModel/setGroup.vue';
    import chat from '../components/chat.vue';
    export default{
        data() {
            return {
                isOwn: 'own',
                setOk: false,
                currGroup: '' //  当前展示群聊id
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
            },
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