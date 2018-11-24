<template>
    <div class="weather-icon-box">
        <div class="weather-icon sun-shower" v-if="type === 'sun-shower'">
            <div class="cloud"></div>
            <div class="sun">
                <div class="rays"></div>
            </div>
            <div class="rain"></div>
        </div>
        <div class="weather-icon thunder-storm" v-if="type === 'thunder-storm'">
            <div class="cloud"></div>
            <div class="lightning">
                <div class="bolt"></div>
                <div class="bolt"></div>
            </div>
        </div>
        <div class="weather-icon cloudy" v-if="type === 'cloudy'">
            <div class="cloud"></div>
            <div class="cloud"></div>
        </div>
        <div class="weather-icon flurries" v-if="type === 'flurries'">
            <div class="cloud"></div>
            <div class="snow">
                <div class="flake"></div>
                <div class="flake"></div>
            </div>
        </div>
        <div class="weather-icon sunny" v-if="type === 'sunny'">
            <div class="sun">
                <div class="rays"></div>
            </div>
        </div>
        <div class="weather-icon rainy" v-if="type === 'rainy'">
            <div class="cloud"></div>
            <div class="rain"></div>
        </div>
    </div>
</template>

<script>
    export default{
        props: ['type'],
        name: 'weatherIcon',
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .weather-icon-box{
        height: 70px;
        overflow: hidden;
    }
</style>