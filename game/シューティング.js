//起動時の処理
function setup(){
    canvasSize(1000,400);
    loadImg(1,"image/自機2.png")
    loadImg(2,"image/missile.png")
    loadImg(0,"image/背景.jpg")
    loadImg(3,"image/バード.png")
    loadImg(4,"image/敵弾.png")
    loadImg(5,"image/explode.png")
    loadImg(6,"image/enemy3.png")
    loadImg(7,"image/enemy2.png")
    loadImg(8,"image/item0.png")
    loadImg(9,"image/item1.png")
    loadImg(10,"image/item2.png")
    loadImg(11,"image/laser.png")
    loadImg(12,"image/enemy4.png")
    // initSShip();
    // initMissile();
    // initObject();
    // initEffect();
}
var timer = 0;
var energy = 10;
var muteki = 0;
var score = 0;
var フェイズ = 0;
var boss = 0;
var PU = 0;
//メインループ
function mainloop(){
    drawBG(1+PU);
    //fText(フェイズ,200,50,36,"black")
    if(フェイズ == 0){
        fText("bagn_bagn_shooting",200,50,36,"black" );
        fText("click to start",200,250,36,"black");
        PU = 0
        if(tapC == 1){
            フェイズ=1;
            timer = 0;
            energy = 10;
            muteki = 0;
            score = 0;
            boss = 0;
            laser = 0;
            weapon = 0;
            initSShip();
            initMissile();
            initObject();
            initEffect();
        }
    }
    else if(フェイズ == 1 ){
        timer++;
        if(timer%30 == 0) setObject(1,3,1000,rnd(400),-5-PU,0,0,1+PU);
        if(timer%100 == 0) setObject(1,6,1000,rnd(400),-8-PU,0,0,2+PU);
        if(timer%200 == 0) setObject(1,7,1000,rnd(400),-2-PU,0,0,3+PU);
        if(timer%1000 == 0) PU++
        // if(boss == 0){
        //     //if(timer != 0){
        //         if(timer%300 == 50) {
        //             setObject(1,12,1000,200,-8,0,0,100);
        //             boss=2;
        //         };
        //     //}
        // };
        moveSShip();
        moveMissile();
        moveObject();
        for(i=0; i<10; i++) fRect(20+i*25,360,15,25,"red");
        for(i=0; i<energy; i++) fRect(20+i*25,360,15,25,colorRGB(160-16*i,240-12*i,24*i));
        drawEffect();
        fText("SCORE "+score,200,50,36,"black")
        fText("TIME "+timer,400,50,36,"black")
        if(energy == 0){
            フェイズ = 2;
        }
    }
    else if(フェイズ == 2){
        fText("GAME OVER",400,150,36,"red");
        fText("Put space to go title",400,250,36,"red");
        if (key[32]++ == 1){フェイズ=0}
    };
 
}

//背景のスクロール
var bgX = 0;
function drawBG(spd) {
    bgX=(bgX+spd)%1000;
    drawImg(0,-bgX,0);
    drawImg(0,1000-bgX,0)
}

//自機の管理
var ssX = 0;
var ssY = 0;

function initSShip() {
    ssX = 250;
    ssY = 200;
    energy = 10;
}

function moveSShip() {
    if(key[37] > 0 && ssX > 50) ssX -= 20;
    if(key[39] > 0 && ssX < 750) ssX += 20;
    if(key[38] > 0 && ssY > 40) ssY -= 20;
    if(key[40] > 0 && ssY < 360) ssY += 20;
    if(key[32]++ == 1 )   {setWeapon();}
    if(muteki%2 == 0) drawImgC(1, ssX, ssY);
    if(muteki > 0) muteki--
}

function setMissile(x,y,xp,yp){
        mslX[mslNum] = x;
        mslY[mslNum] = y;
        mslXp[mslNum] = xp;
        mslYp[mslNum] = yp;
        mslF[mslNum] = true;
        mslImg[mslNum] = 2;
        if(laser > 0) {
            laser--;
            mslImg[mslNum]=11;
        }
        mslNum = (mslNum+1)%MSL_MAX;
}

function moveMissile(){
    for(var i=0; i<MSL_MAX; i++) {
        if(mslF[i] == true) {
            mslX[i] = mslX[i] + mslXp[i];
            mslY[i] = mslY[i] + mslYp[i];
            if(laser > 0)drawImgC(11,mslX[i],mslY[i])
            else drawImgC(2, mslX[i], mslY[i]);
            if(mslX[i] > 1000) mslF[i] = false;
        }
    }
}

var MSL_MAX = 100;
var mslX = new Array(MSL_MAX);
var mslY = new Array(MSL_MAX);
var mslXp = new Array(MSL_MAX);
var mslYp = new Array(MSL_MAX);
var mslF = new Array(MSL_MAX);
var mslImg = new Array(MSL_MAX)
var mslNum = 0;
var laser = 0;

function initMissile() {
    for(var i=0; i<MSL_MAX; i++) mslF[i] = false;
    mslNum = 0;
}

var OBJ_MAX = 100;
var objX = new Array(OBJ_MAX);
var objType = new Array(OBJ_MAX);//0=敵の弾　1=敵機 2=アイテム
var objImg = new Array(OBJ_MAX);
var objY = new Array(OBJ_MAX);
var objXp = new Array(OBJ_MAX);
var objYp = new Array(OBJ_MAX);
var objF = new Array(OBJ_MAX);
var p = new Array(OBJ_MAX);
var Ang = new Array(OBJ_MAX);
var objLife = new Array(OBJ_MAX);
var tekimuteki = new Array(OBJ_MAX);
var objNum = 0;
var wait = new Array(OBJ_MAX);

function initObject() {
    for(var i=0; i<OBJ_MAX; i++) objF[i] = false;
    objNum = 0;
}

var Wait = 0;

function setObject(typ,png,x,y,xp,yp,ang,Life){
    objType[objNum] = typ;
    objImg[objNum] = png;
    objX[objNum] = x;
    objY[objNum] = y;
    objXp[objNum] = xp;
    objYp[objNum] = yp;
    objF[objNum] = true;
    p[objNum] = 0;
    Ang[objNum] = ang;
    objLife[objNum] = Life
    tekimuteki[objNum] = 0;
    objNum = (objNum+1)%OBJ_MAX;
    wait[objNum] = 0;
}

function moveObject(){
    for(var i=0; i<OBJ_MAX; i++) {
        if(objF[i] == true) {
            if(objImg[i] == 12){
                objX[i] = objX[i] + objXp[i];
                if(objXp[i]<0)objXp[i]+=0.5;
            }
            else objX[i] = objX[i] + objXp[i];
            if(objType[i] == 1){
                objY[i] = objY[i] + objYp[i] +sin(p[i]);//-5 +rnd(10);
                p[i]+=5
            }
            else objY[i] = objY[i] + objYp[i];
            drawImgR(objImg[i], objX[i], objY[i],Ang[i]);
            if(objImg[i] == 3 && rnd(100) < 1) setObject(0,4,objX[i],objY[i],-10,0,0,1)
                else if(objImg[i] == 6 && rnd(100) < 1) {
                    for(var a=0; a<16; a++){
                        setObject(0,4,objX[i],objY[i],sin(a*22.5)*10,-cos(a*22.5)*10,a*22.5+90)
                    };
                    objF[i] = false;
                }else if(objImg[i] == 7 && rnd(100) < 1) {
                    for(var a=0; a<8; a++){
                        setObject(0,4,objX[i],objY[i]-rnd(100)+50,-20,rnd(3)-2,0)
                    };
                    objF[i] = false;
                }//else if(objImg[i] == 12 && timer%10 == 0) {
                //     Ang[i] += 45;
                //     setObject(0,4,objX[i],objY[i]+rnd(200)-100,-15,0,0,0);
                //};
            if(objX[i] < 0) objF[i] = false;
            if(objY[i] < 0) objF[i] = false;
            if(objX[i] > 1000) objF[i] = false;
            if(objY[i] > 400) objF[i] = false;
            //自機が打った球との当たり判定
            if(tekimuteki[i] == 0) {
                if(objType[i] == 1) {//敵機
                    var r = 12+(img[objImg[i]].width+img[objImg[i]].height)/4;
                    for(var n=0; n<MSL_MAX; n++){
                        if(mslF[n] == true) {
                            if(getDis(objX[i],objY[i],mslX[n],mslY[n]) < r) {
                                if(mslImg[n] == 2) mslF[n] = false;
                                objLife[i]--
                                if (objLife[i] == 0) {
                                    setEffect(objX[i],objY[i],9);
                                    //if(rnd(100)<40 )energy++
                                    if(rnd(100)<5)setObject(2,8,objX[i],objY[i],-2,0,0,0);
                                    else if(rnd(100)<5)setObject(2,9,objX[i],objY[i],-2,0,0,0);
                                    else if(rnd(100)<5)setObject(2,10,objX[i],objY[i],-2,0,0,0);
                                    score = score + objImg[i];
                                    objF[i] = false;
                                }
                                else{
                                    setEffect(objX[i],objY[i],3);
                                    tekimuteki[i] = 15;
                                }
                            }
                        }
                    }
                }
            }
            else tekimuteki[i]--
            //自機との当たり判定
            var r = 30+(img[objImg[i]].width+img[objImg[i]].height)/4;
            if(getDis(objX[i],objY[i],ssX,ssY) < r) {
                if(objType[i] <= 1 && muteki == 0){
                    objF[i] = false;
                    energy--;
                    muteki = 30;
                }
                if(objType[i] == 2) {//アイテム
                    objF[i] = false;
                    if(objImg[i] == 8 && energy < 10) energy++;
                    if(objImg[i] == 9) weapon++;
                    if(objImg[i] == 10) laser = laser + 100;
                }
            }
        }
    }
}
//エフェクトの管理
var EFCT_MAX = 100;
var efctX = new Array(EFCT_MAX)
var efctY = new Array(EFCT_MAX)
var efctN = new Array(EFCT_MAX)
var efctNum = 0;

function initEffect() {
    for(var i=0; i<EFCT_MAX; i++) efctN[i] = 0;
    efctNum = 0;
}

function setEffect(x,y,n) {
    efctX[efctNum] = x;
    efctY[efctNum] = y;
    efctN[efctNum] = n;
    efctNum = (efctNum+1)%EFCT_MAX;
}

function drawEffect() {
    for(var i=0; i<EFCT_MAX; i++){
        if(efctN[i] > 0){
            drawImgTS(5,(9-efctN[i])*128,0,128,128,efctX[i]-64,efctY[i]-64,128,128)
            efctN[i]--;
        }
    }
}

function setWeapon() {
    var n = weapon;
    if(n>8)n=8;
    for(var i=0; i<=n; i++) {
        setMissile(ssX+40,ssY-n*6+i*12,40,int((i-n/2)*2))
    }
}

var weapon = 0;

