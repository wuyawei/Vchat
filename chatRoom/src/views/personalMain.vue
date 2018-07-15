<template>
    <div class="vchat-personalMain">
    </div>
</template>
<script>
    export default{
        name: '',
        data() {
            return {
            }
        },
        sockets:{
            connect: function(val){
                console.log(this.$socket.id);
                console.log('连接成功');
            },
            customEmit: function(val){
                console.log('连接失败');
            }
        },
        methods: {
        }
    }
</script>
<style scoped>
</style>