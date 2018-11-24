<template>
    <div class="backLog">
        <h3>
            <span>待办日程</span>
            <v-icon name="jia2" color="#ff6b6b"></v-icon>
        </h3>
    </div>
</template>

<script>
    export default{
        name: 'backLog',
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .backLog{
        width: 100%;
        h3{
            display: flex;
            justify-content: space-between;
            line-height: 36px;
            border-bottom: 1px solid #d5d5d5;
            font-weight: 400;
            color: #323232;
        }
    }
</style>