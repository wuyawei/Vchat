<template>
    <div class="vchat-txz">
        <div class="game">
            <div id="msg"></div>
            <canvas id="canvas" width="560" height="560"></canvas>
            <p class="vchat-button" ref="pre">上一关</p>
            <p class="vchat-button" ref="next">下一关</p>
            <p class="vchat-button minor" ref="replay">重玩本关</p>
            <p class="vchat-button info" ref="help">游戏说明</p>
        </div>
    </div>
</template>

<script>
    import { levels } from './js/mapdata100';
    export default{
        data() {
            return {

            }
        },
        mounted() {
            this.$nextTick(_ => {
                var can = document.getElementById("canvas");
                var msg = document.getElementById("msg");
                var cxt = can.getContext("2d");
                var w = 35,h = 35;
                var curMap;//当前的地图
                var curLevel;//当前等级的地图
                var curMan;//初始化小人
                var iCurlevel = 0;//关卡数
                var moveTimes = 0;//移动了多少次
                //预加载所有图片
                var oImgs = {
                    "block" : require("./images/block.gif"),
                    "wall" : require("./images/wall.png"),
                    "box" : require("./images/box.png"),
                    "ball" : require("./images/ball.png"),
                    "up" : require("./images/up.png"),
                    "down" : require("./images/down.png"),
                    "left" : require("./images/left.png"),
                    "right" : require("./images/right.png")
                }
                function imgPreload(srcs,callback){
                    var count = 0,imgNum = 0,images = {};

                    for(let src in srcs){
                        imgNum++;
                    }
                    for(let src in srcs ){
                        images[src] = new Image();
                        images[src].onload = function(){
                            //判断是否所有的图片都预加载完成
                            if (++count >= imgNum)
                            {
                                callback(images);
                            }
                        }
                        images[src].src = srcs[src];
                    }
                }
                var block,wall,box,ball,up,down,left,right;
                imgPreload(oImgs,function(images){
                    block = images.block;
                    wall = images.wall;
                    box = images.box;
                    ball = images.ball;
                    up = images.up;
                    down = images.down;
                    left = images.left;
                    right = images.right;
                    init();
                });
                //初始化游戏
                function init(){
                    //InitMap();
                    //DrawMap(levels[0]);
                    initLevel();//初始化对应等级的游戏
                    showMoveInfo();//初始化对应等级的游戏数据
                }
                //绘制地板
                function InitMap(){
                    for (var i=0;i<16 ;i++ )
                    {
                        for (var j=0;j<16 ;j++ )
                        {
                            if (block) {
                                cxt.drawImage(block,w*j,h*i,w,h);
                            }
                        }
                    }
                }
                //小人位置坐标
                function Point(x,y){
                    this.x = x;
                    this.y = y;
                }
                var perPosition = new Point(5,5);//小人的初始标值
                //绘制每个游戏关卡地图
                function DrawMap(level){
                    for (var i=0;i<level.length ;i++ )
                    {
                        for (var j=0;j<level[i].length ;j++ )
                        {
                            var pic = block;//初始图片
                            switch (level[i][j])
                            {
                                case 1://绘制墙壁
                                    pic = wall;
                                    break;
                                case 2://绘制陷进
                                    pic = ball;
                                    break;
                                case 3://绘制箱子
                                    pic = box;
                                    break;
                                case 4://绘制小人
                                    pic = curMan;//小人有四个方向 具体显示哪个图片需要和上下左右方位值关联
                                    //获取小人的坐标位置
                                    perPosition.x = i;
                                    perPosition.y = j;
                                    break;
                                case 5://绘制箱子及陷进位置
                                    pic = box;
                                    break;
                            }
                            //每个图片不一样宽 需要在对应地板的中心绘制地图
                            if (pic) {
                                cxt.drawImage(pic,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height)
                            }
                        }
                    }
                }
                //初始化游戏等级
                function initLevel(){
                    curMap = copyArray(levels[iCurlevel]);//当前移动过的游戏地图
                    curLevel = levels[iCurlevel];//当前等级的初始地图
                    curMan = down;//初始化小人
                    InitMap();//初始化地板
                    DrawMap(curMap);//绘制出当前等级的地图
                }
                //下一关
                function NextLevel(i){
                    //iCurlevel当前的地图关数
                    iCurlevel = iCurlevel + i;
                    if (iCurlevel<0)
                    {
                        iCurlevel = 0;
                        return;
                    }
                    var len = levels.length;
                    if (iCurlevel > len-1)
                    {
                        iCurlevel = len-1;
                    }
                    initLevel();//初始当前等级关卡
                    moveTimes = 0;//游戏关卡移动步数清零
                    showMoveInfo();//初始化当前关卡数据
                }
                //小人移动
                function go(dir){
                    var p1,p2;
                    switch (dir)
                    {
                        case "up":
                            curMan = up;
                            //获取小人前面的两个坐标位置来进行判断小人是否能够移动
                            p1 = new Point(perPosition.x-1,perPosition.y);
                            p2 = new Point(perPosition.x-2,perPosition.y);
                            break;
                        case "down":
                            curMan = down;
                            p1 = new Point(perPosition.x+1,perPosition.y);
                            p2 = new Point(perPosition.x+2,perPosition.y);
                            break;
                        case "left":
                            curMan = left;
                            p1 = new Point(perPosition.x,perPosition.y-1);
                            p2 = new Point(perPosition.x,perPosition.y-2);
                            break;
                        case "right":
                            curMan = right;
                            p1 = new Point(perPosition.x,perPosition.y+1);
                            p2 = new Point(perPosition.x,perPosition.y+2);
                            break;
                    }
                    //若果小人能够移动的话，更新游戏数据，并重绘地图
                    if (Trygo(p1,p2))
                    {
                        moveTimes ++;
                        showMoveInfo();
                    }
                    //重绘地板
                    InitMap();
                    //重绘当前更新了数据的地图
                    DrawMap(curMap);
                    //若果移动完成了进入下一关
                    if (checkFinish())
                    {
                        alert("恭喜过关！！");
                        NextLevel(1);
                    }
                }
                //判断是否推成功
                function checkFinish(){
                    for (var i=0;i<curMap.length ;i++ )
                    {
                        for (var j=0;j<curMap[i].length ;j++ )
                        {
                            //当前移动过的地图和初始地图进行比较，若果初始地图上的陷进参数在移动之后不是箱子的话就指代没推成功
                            if (curLevel[i][j] == 2 && curMap[i][j] != 3 || curLevel[i][j] == 5 && curMap[i][j] != 3)
                            {
                                return false;
                            }
                        }
                    }
                    return true;
                }
                //判断小人是否能够移动
                function Trygo(p1,p2){
                    if(p1.x<0) return false;//若果超出地图的上边，不通过
                    if(p1.y<0) return false;//若果超出地图的左边，不通过
                    if(p1.x>curMap.length) return false;//若果超出地图的下边，不通过
                    if(p1.y>curMap[0].length) return false;//若果超出地图的右边，不通过
                    if(curMap[p1.x][p1.y]==1) return false;//若果前面是墙，不通过
                    if (curMap[p1.x][p1.y]==3 || curMap[p1.x][p1.y]==5)
                    {//若果小人前面是箱子那就还需要判断箱子前面有没有障碍物(箱子/墙)
                        if (curMap[p2.x][p2.y]==1 || curMap[p2.x][p2.y]==3)
                        {
                            return false;
                        }
                        //若果判断不成功小人前面的箱子前进一步
                        curMap[p2.x][p2.y] = 3;//更改地图对应坐标点的值
                        //console.log(curMap[p2.x][p2.y]);
                    }
                    //若果都没判断成功小人前进一步
                    curMap[p1.x][p1.y] = 4;//更改地图对应坐标点的值
                    //若果小人前进了一步，小人原来的位置如何显示
                    var v = curLevel[perPosition.x][perPosition.y];
                    if (v!=2)//若果刚开始小人位置不是陷进的话
                    {
                        if (v==5)//可能是5 既有箱子又陷进
                        {
                            v=2;//若果小人本身就在陷进里面的话移开之后还是显示陷进
                        }else{
                            v=0;//小人移开之后之前小人的位置改为地板
                        }
                    }
                    //重置小人位置的地图参数
                    curMap[perPosition.x][perPosition.y] = v;
                    //若果判断小人前进了一步，更新坐标值
                    perPosition = p1;
                    //若果小动了 返回true 指代能够移动小人
                    return true;
                }
                //判断是否推成功

                //完善关卡数据及游戏说明
                function showMoveInfo(){
                    msg.innerHTML = "第" + (iCurlevel+1) +"关 移动次数: "+ moveTimes;
                }

                //克隆二维数组
                function copyArray(arr){
                    var b=[];//每次移动更新地图数据都先清空再添加新的地图
                    for (var i=0;i<arr.length ;i++ )
                    {
                        b[i] = arr[i].concat();//链接两个数组
                    }
                    return b;
                }
                //与键盘上的上下左右键关联
                document.body.onkeydown=function (event) {
                    switch (event.keyCode)
                    {
                        case 37://左键头
                            go("left");
                            break;
                        case 38://上键头
                            go("up");
                            break;
                        case 39://右箭头
                            go("right");
                            break;
                        case 40://下箭头
                            go("down");
                            break;
                    }
                };
                //游戏说明
                var showhelp = false;
                function showHelp(){
                    showhelp = !showhelp;
                    if (showhelp)
                    {
                        msg.innerHTML = "用键盘上的上、下、左、右键移动小人，把箱子全部推到小球的位置即可过关。箱子只可向前推，不能往后拉，并且小人一次只能推动一个箱子。";
                    }else{
                        showMoveInfo();
                    }
                }
                this.$refs['pre'].onclick=() => {
                    NextLevel(-1);
                };
                this.$refs['next'].onclick=() => {
                    NextLevel(1);
                };
                this.$refs['replay'].onclick=() => {
                    NextLevel(0);
                };
                this.$refs['help'].onclick=() => {
                    showHelp();
                };
            })
        }
    }
</script>

<style lang="scss" scoped>
    .game{
        width:560px;
        margin:0 auto;
        #msg{
            color: #323232;
            padding-bottom: 5px;
        }
        p{
            line-height: 32px;
        }
    }
</style>