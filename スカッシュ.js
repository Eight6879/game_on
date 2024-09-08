//変数の宣言
var ballX = 600;
var ballY = 300;
var ballXp = 10;
var ballYp = 8;
var barX = 600;
var barY = 700;
var score = 0;
var scene = 0;

//起動時の処理
function setup() {
    canvasSize(1200, 800);
    lineW(3)
    loadImg(0, "image/bg.png");
}

//メインループ
function mainloop() {
    drawImg(0, 0, 0);
    setAlp(50);
    fRect(250, 50, 700, 750, "black");
    setAlp(100);
    sRect(250, 50, 700, 760, "silver");
    sRect(barX-50,barY-10,100,20,"violet");//バー描画
    if(scene == 0){
        fText("スカッシュ",600,200,48,"cyan");
        fText("クリックでスタート",600,600,36,"gold");
        if(tapC == 1) {//タイトル
            ballX = 600;
            ballY = 300;
            ballXp = 12;
            ballYp = 8;
            score = 0;
            scene = 1;
        }
    }
    else if(scene == 1){//プレイ中
        ballX = ballX + ballXp;
        ballY = ballY + ballYp;
        if(ballX<=260 || ballX>=940) ballXp = -ballXp;
        if(ballY<=60 || ballY>=790) ballYp = -ballYp;
        if(ballY>=790)scene = 2
        if(ballXp<=0){ballXp-=0.01}
        else if(ballXp>=0){ballXp+=0.01}
        if(ballYp<=0){ballYp-=0.01}
        else if(ballYp>=0){ballYp+=0.01}
        var speed = Math.round(Math.sqrt(ballXp*ballXp + ballYp*ballYp))
        sCir(ballX, ballY, 10, "red");//球描画
        fText("speed "+ speed,500,25,36,"white");
        fText("score "+ score,700,25,36,"white");
        barX = tapX;
        if(barX < 300) barX = 300;
        if(barX > 900) barX = 900;
        if(barX-60<ballX && ballX<barX+60 && barY-30<ballY && ballY<barY-10){
        ballYp = -8-rnd(8);
        score = score + 10 * speed;
        }

    }
    else if(scene == 2){//ゲームオーバー
        fText("ゲームオーバー",600,400,36,"red")
        if(tapC == 1){
            scene = 0;
            tapC = 0;
        }
    }
}

