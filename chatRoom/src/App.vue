<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        created() {
            this.$store.dispatch('getUserInfo');
        },
        mounted() {
            document.addEventListener('visibilitychange', function() {
                if (document.visibilityState === 'hidden') {
                    document.title = '咦，页面崩溃了';
                } else {
                    document.title = '哇，又好了';
                    setTimeout(_ => {
                        document.title = 'Vchat';
                    }, 2000)
                }
            });
        }
    }
</script>

<style lang="scss">
    @import "../static/css/base";
    @import "../static/theme/index";
    .Validate-mes {
        .header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 10px;
            a {
                margin-right: 10px;
            }
            p{
                display: flex;
                flex-flow: column;
                justify-content: space-around;
                height: 40px;
                .signature{
                    font-size: 12px;
                    color: #aaaaaa;
                }
            }
        }
        .info {
            margin-bottom: 10px;
            font-size: 13px;
            span{
                font-size: 12px;
                color: #aaaaaa;
            }
        }
        .footer {
            display: flex;
            justify-content: flex-end;
            button {
                margin-left: 10px;
            }
        }
    }
</style>
