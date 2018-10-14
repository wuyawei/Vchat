<template>
    <router-view/>
</template>

<!--关于多房间，socket可以同时加入多个房间但是也同时可以接收到多个房间的消息，需要自己处理数据-->
<script>
    import utils from '@/utils/utils';
    import { mapState } from 'vuex';
    export default{
        data() {
            return {
            };
        },
        watch: {
            user: {
                handler() {
                    console.log('useruser');
                    this.joinRoom();
                },
                deep: true
            },
            conversationsList: {
                handler() {
                    console.log('conversationsList');
                    this.joinRoom();
                },
                deep: true,
                immediate: true
            }
        },
        computed: {
            ...mapState(['user', 'conversationsList'])
        },
        sockets:{
            connect: function (val) {
                console.log(this.$socket.id);
                console.log('连接成功');
            },
            customEmit: function (val) {
                console.log('连接失败');
            },
            joined(OnlineUser) {
                console.log('加入了', OnlineUser);
                this.$store.commit('setOnlineUser', OnlineUser)
            },
            leaved(OnlineUser) {
                console.log('离开了', OnlineUser);
                this.$store.commit('setOnlineUser', OnlineUser)
            }
        },
        methods: {
            joinRoom() {
                if (!this.user.name) {
                    return ;
                }
                console.log('joinnnnn');
                this.conversationsList.forEach(v => {
                    let val = {
                        name: this.user.name,
                        time: utils.formatTime(new Date()),
                        avatar: this.user.photo,
                        roomid: v.id
                    };
                    this.$socket.emit('join', val);
                });
            }
        },
        mounted() {
            let conversationsList = window.localStorage.conversationsList;
            if (conversationsList) {
                this.$store.commit('setConversationsList', JSON.parse(conversationsList));
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>