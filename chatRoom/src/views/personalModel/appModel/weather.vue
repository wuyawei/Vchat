<template>
    <div class="vchat-weather vchat-bg">
        <div class="weather-container">
            <div class="position">
                <v-icon name="coordinates_fill" color="#fff" :size="28"></v-icon>
                <p>北京</p>
                <span>{{getWeek(WeatherInfo[0].week)}}</span>
                <span>{{WeatherInfo[0].nightTemp}}℃ ~ {{WeatherInfo[0].dayTemp}}℃</span>
            </div>
            <ul class="weather-list">
                <li>
                    <p>发布时间：{{LiveWeather.reportTime}}</p>
                    <p class="temperature">
                        <span>{{LiveWeather.temperature}}</span>℃
                        {{LiveWeather.weather}}
                    </p>
                    <weather-icon :type="type"></weather-icon>
                    <p>空气湿度：{{LiveWeather.humidity}}%</p>
                    <p>风向：{{LiveWeather.windDirection}}； 风力：{{LiveWeather.windPower}}</p>
                </li>
                <template v-for="(v, i) in WeatherInfo">
                    <li v-if="i > 0">
                        <p>{{getWeek(v.week)}}</p>
                        <p>{{v.date}}</p>
                        <p>
                            <v-icon :name="getWeatherType(v.dayWeather, '2')" color="#fff" :size="36"></v-icon>
                        </p>
                        <p>{{v.nightTemp}}℃ ~ {{v.dayTemp}}℃</p>
                        <p>{{v.dayWeather}}</p>
                        <p>风向：{{v.dayWindDir}}</p>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
    import AMap from 'AMap';
    import weatherIcon from './weather-icon.vue';
    export default{
        data() {
            return {
                WeatherInfo: [{}],
                LiveWeather: {},
                type: 'sunny' // 天气类型
            }
        },
        components: {
            weatherIcon
        },
        methods: {
            initWeather(city) {
                let that = this;
                AMap.plugin('AMap.Weather', function() {
                    //创建天气查询实例
                    let weather = new AMap.Weather();
                    //执行实时天气信息查询
                    weather.getLive(city, function(err, data) {
                        console.log(err, data);
                        that.LiveWeather = data;
                        that.getWeatherType(data.weather);
                    });
                    // 查询三天天气
                    weather.getForecast(city, function(err, data) {
                        console.log(err, data);
                        that.WeatherInfo = data.forecasts;
                    });
                });
            },
            getWeek(k) {
                let week = '';
                switch(k) {
                    case '1':
                        week = '星期一';
                        break;
                    case '2':
                        week = '星期二';
                        break;
                    case '3':
                        week = '星期三';
                        break;
                    case '4':
                        week = '星期四';
                        break;
                    case '5':
                        week = '星期五';
                        break;
                    case '6':
                        week = '星期六';
                        break;
                    case '7':
                        week = '星期日';
                        break;
                }
                return week;
            },
            getWeatherType(t, type='1') {
                let reg1 = /多云|阴/;
                let reg2 = /雷/;
                let reg3 = /雨/;
                let reg4 = /晴/;
                let reg5 = /雪/;
                if (reg1.test(t)) {
                    if (type === '1') {
                        this.type = 'cloudy';
                    } else {
                        return 'yintian';
                    }
                } else if (reg2.test(t)) {
                    if (type === '1') {
                        this.type = 'thunder-storm';
                    } else {
                        return 'leidian';
                    }
                } else if (reg3.test(t)) {
                    if (type === '1') {
                        this.type = 'rainy';
                    } else {
                        return 'xiaoyu';
                    }
                } else if (reg4.test(t)) {
                    if (type === '1') {
                        this.type = 'sunny';
                    } else {
                        return 'qing';
                    }
                } else if (reg5.test(t)) {
                    if (type === '1') {
                        this.type = 'flurries';
                    } else {
                        return 'xue';
                    }
                }
            }
        },
        mounted() {
            this.initWeather('北京');
        }
    }
</script>

<style lang="scss" scoped>
.vchat-weather{
    width: 100%;
    height: 250px;
    background-image: url("../../../assets/img/weather_b1.jpg");
    position: relative;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    .weather-container{
        position: absolute;
        top:0;
        width:100%;
        height: 100%;
        z-index: 1;
        text-align: left;
        color: #fff;
        padding: 10px;
        box-sizing: border-box;
        .position{
            margin-bottom: 10px;
            p{
                display: inline-block;
                margin-right: 10px;
            }
            span{
                font-size: 12px;
                margin-right: 5px;
            }
        }
    }
    .weather-list{
        color: #fff;
        font-size: 13px;
        display: flex;
        justify-content: flex-start;
        align-content: center;
        li{
            width:200px;
            margin-right: 20px;
            text-align: center;
            .temperature{
                span{
                    font-size: 30px;
                    font-weight: 600;
                }
            }
            p{
                margin-bottom: 5px;
            }
        }
    }
}
.vchat-weather:before{
    display: block;
    content: '';
    position: absolute;
    background: linear-gradient(left top, rgba(22,22,22,1), rgba(0,0,0,0));
    left:0;
    top:0;
    width:100%;
    height: 100%;
}
</style>