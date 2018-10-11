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

            }
        },
        watch: {
            user: {
                handler() {
                    this.joinRoom();
                },
                deep: true
            }
        },
        computed: {
            ...mapState(['user'])
        },
        sockets:{
            connect: function (val) {
                console.log(this.$socket.id);
                console.log('连接成功');
            },
            customEmit: function (val) {
                console.log('连接失败');
            },
            joined(r) {
                console.log('加入了', r);
            },
            leaved(r) {
                console.log('离开了', r);
            }
        },
        methods: {
            joinRoom() {
                if (!this.user.name) {
                    return ;
                }
                let val = {
                    name: this.user.name,
                    time: utils.formatTime(new Date()),
                    avatar: this.$store.state.user.photo,
                    roomid: '11111'
                };
                this.$socket.emit('join', val);
            }
        },
        mounted() {
            this.joinRoom();
        }
    }
</script>

<style lang="scss" scoped>

</style>