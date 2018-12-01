<template>
    <div class="vchat-h2048">
        <header>
            <div class="container">
                <h1><span>2</span><span>0</span><span>4</span><span>8</span></h1>
            </div>
        </header>

        <div class="container">
            <div class="directions">
                <p><strong>如何玩：</strong> 使用鼠标方向键键移动数字方块。相邻的两个方块数字相同，它们可合并成一个！</p>
            </div>
            <div class="scores">
                <div class="score-container best-score">
                    最佳:
                    <div class="score">
                    <div id="bestScore">0</div>
                </div>
                </div>
                <div class="score-container">
                    分数:
                    <div class="score">
                    <div id="score">0</div>
                    <div class="add" id="add"></div>
                </div>
                </div>
            </div>
            <div class="game">
                <div id="tile-container" class="tile-container"></div>
                <div class="end" id="end">游戏结束<div class="monkey">🙈</div><button class="btn not-recommended__item js-restart-btn" id="try-again">再试一次</button></div>
            </div>

            <div class="not-recommended">
                <button class="btn not-recommended__item js-restart-btn" id="restart">重新启动游戏</button>
                <span class="not-recommended__annotation"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import newGameStart from './js/index'
    export default{
        data() {
            return {

            }
        },
        mounted() {
            this.$nextTick(_ => {
                newGameStart();
            })
        }
    }
</script>

<style lang="scss">
    .vchat-h2048{
        @import "css/style.scss";
    }
</style>