<template>
    <div>conversation</div>
</template>

<script>
    import api from '@/api';
    export default{
        name: 'Jokes',
        data() {
            return {

            }
        },
        mounted() {
            api.getJokes();
        }
    }
</script>

<style lang="scss" scoped>

</style>