<template>
    <div class="vchat-applyGroup">
        <v-apheader title="验证信息" back="-1">
            <router-link to="/">发送</router-link>
        </v-apheader>
    </div>
</template>

<script>
    import api from '@/api';
    import vApheader from '@/views/components/header/vApheader';
    export default{
        name: 'applyGroup',
        data() {
            return {

            }
        },
        components: {
            vApheader
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-applyGroup{
        width:100%;
    }
</style>