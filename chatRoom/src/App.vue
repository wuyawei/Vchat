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
                    clearInterval(this.t);
//                    Notification.requestPermission(function (permission) {
//                        if (permission == "granted") {
//                            var notification = new Notification("您有一条新的消息",{
//                                dir: "auto",
//                                lang: "zh-CN",
//                                tag: "testNotice",
//                                icon:'http://192.168.16.219:80/static-server/pic/10000000/image/2018/20181129//0a3edc489efd4111ba2002345e93e0ca.png',
//                                body: '你好啊！我是蚂蚁，我在测试桌面推送'
//                            });
//                        }
//                    });
                } else {
                    document.title = '哇，又好了';
                    this.t = setTimeout(_ => {
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
