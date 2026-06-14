// update akshare
// pip install --upgrade akshare
// Get elements
// ______元素变量 elements variables____________________________________________________________________________
// 代码输入口对象 code input port obj
const codeShort = document.getElementById('codeShort');
const refreshBtn = document.getElementById('refreshBtn');
// main chart window
const MAINcanvas = document.getElementById('Mainchart');
const MAINctx = MAINcanvas.getContext('2d');
// sub chart window
const SUBcanvas = document.getElementById('SUBchart');
const SUBctx = SUBcanvas.getContext('2d');
// mask chart window
const MASKcanvas = document.getElementById('MASKchart');
const MASKctx = MASKcanvas.getContext('2d');
// const MASKctx  = MASKcanvas.getContext('webgl') || MASKcanvas.getContext('experimental-webgl');
// Date window
const DateChart = document.getElementById('DateChart');
// mins chart window
const MinsLinecanvas = document.getElementById('Minschart');
const MinsLinectx = MinsLinecanvas.getContext('2d');
// focus item info window
const CrossInfo = document.getElementById("CrossInfo")
// // point date
// const pointDate = document.getElementById("pointDate")
// // point price
// const pointPrice = document.getElementById("pointPrice")
// point date
const QuanJuZhangDie = document.getElementById("QuanJuZhangDie")
// point price
const DuanQiZhangDie = document.getElementById("DuanQiZhangDie")
// point price change rate
const pointPriceChange = document.getElementById("pointPriceChange")
// select show five chart
const fiveChartCheckbox = document.getElementById("fiveChartCheckbox")
// select review modle
const reviewModleCheckbox = document.getElementById("reviewModleCheckbox")
// local_ip
const local_ip = document.getElementById("local_ip")

// ______指令变量 older variables____________________________________________________________________________
var dayWeekChoice = "日K";//周日K switch
// var dateFromChoice = "2024-06-01";//from when to start
var dateFromChoice = "2024-06-01";//from when to start
// IV V or W
const IVbase = 1;//IV w or not [1,10]

// ______限位变量 limit position variables____________________________________________________________________________
// basic variable1_________
// start draw honriztal position "left right gap"
var drawGap = 10;
// one chart items size
var chartItemWidth = 60;
var SimChartItemWidth = chartItemWidth/2;
// Mainchart size info
var MainchartWidth;
var MainchartHeight;
// Subchart size info
var SubchartWidth;
var SubchartHeight;
var MaskchartHeight;
// basic variable2_________
// chart window length
var windowLength = 0;
// basic data length
var basicDataLength = 0;
// sub data length
var subDataLength = 0;
// FinalSub data length
var FinalSubDataLength = 0;//作废处理
// max start index limit
var maxStartIndex = 0;//indexable
// move limit variable__________
// start index for drag and ..
var startIndex = 0;//indexable//[-1,availableStartIndex]
// sub data index
var subEndIndex = 0;//indexable//[0,subDataLength]+1
// point index for show point info and visible vriable part
var pointIndex = 0;//indexable[-1,basicDataLength-1]
// available start index limit
var availableStartIndex = 0;//indexable//[-1,maxStartIndex]
// temp storagy variable__________
// use to show temp data carraier
let VisibleData;
// data from server temporarily staragy
let responseLocal =[];
// temporary IV data
let TempIv = [[]];
// other variable__________
let crossIdx = 0;
// 用于记录上次触摸的时间
let lastTouchTime = 0; 
// 双击时间阈值（毫秒）
const doubleTapThreshold = 300;
const longTapThreshold = 1100;
//current X of mouse and touch
// let currentX = 0;
//long press X of mouse and touch
let long_pressX = 0;

let offsetX = 0; // Horizontal offset for translation
let currentOffsetXFive = -1;//48*3+1=145

let currentOffsetXMaxForScroll = 0;
let offsetXMaxForScroll = 0;
let offsetXMaxForALL = 0;
let currentOffsetX = 0;
let VisibleMax = -1;

let UsedWidth = 0;

let isDragging = false; // Whether the user is dragging
let dragStartX = 0; // Where the drag started

let responseFiveCopy = {};
let responseFiveMinsLineCopy ={};
let KdataVisible;
let IVdataVisible;

var temponce = 0;


//tredemechine
const EleToltalCapitalisation = document.getElementById("ToltalCapitalisation")
const EleMoneyNeed = document.getElementById("MoneyNeed")
const EleAveragePrice = document.getElementById("AveragePrice")
const EleToltalProfit = document.getElementById("ToltalProfit")
// const EleTodayProfit = document.getElementById("TodayProfit")
const EleTodayProfitMoney = document.getElementById("TodayProfitMoney")
const EleToltalProfitMoney = document.getElementById("ToltalProfitMoney")
const EleUseableMoney = document.getElementById("UseableMoney")
const EleToltalValue = document.getElementById("ToltalValue")
const EleUnlockedNum = document.getElementById("UnlockedNum")
const EleLockedNum = document.getElementById("LockedNum")
const EleWillBuy = document.getElementById("WillBuy")
const EleWillSale = document.getElementById("WillSale")
const EleChangeUseableMoney = document.getElementById("changeUseableMoney")
//
const BT_nextDay = document.getElementById("btn_nextDay")
const BT_nextFive = document.getElementById("btn_nextFive")
const clcBuy = document.getElementById("clcBuy")
const clcSale = document.getElementById("clcSale")

let startDate = document.getElementById("startDate")
let ontime = document.getElementById("ontime")
let endDate = document.getElementById("endDate")

const timeList = ['9:35','9:40', '9:45', '9:50', '9:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35',
    '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '13:05',
    '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05',
    '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00']

//MOVELINE VARS
let downloadList = document.getElementById("downloadList")

var moveLineDatas = []
var moveUnitWidth = 1//auto set
var moveStep = 0
var moveStepSeconds = 0
var incrase = 0;
var yushu = 0;


var positive = 0
var negative = 0
var SumPositiveNegative = 0
var turnPS = 0
var turnNG = 0
var win = 0
var loss = 0
var ping = 0
var winRate = 0
var lossRate = 0
var simple = []

var simpleOfZD = []

var duanZhangDie = 0

// var simpleCap = 4000*20// 1000//simple cap
// var simpleCap = 1000// 1000//simple cap
var simpleCap = 4000*5// 1000//simple cap
var unitCount = 345
// var unitCount = 20
var pauseStep = 170
var moveStepSecondsStep = 10;
const routeTime = 10;

var geuss = 0;

// 单选类 radioCL 
let radioCL = document.getElementsByClassName("radioCL")
                      //初值随机  系统随机  系统循环  空防  空攻  多攻  多防  geuss
                      //[0,       1        2,       3,    4,   5,    6,    7]  
var radioCLValueArray = [0,       0,       1,       0,    1,   1,    0,    0] 
// 数字类 numCL
let numCL = document.getElementsByClassName("numCL")
                      //初值  随时范围-  随机范围+  随机中值  空防   空防半随机  空攻  空攻半随机   多攻  多攻半随机  多防  多防半随机   定时器        分秒                   全局涨跌  当下涨跌
                      //[ 0,  1,        2,        3,        4,      5,        6,      7,        8,      9,       10，    11,       12,          13                     14,      15]
var numCLValueArray = [7000,  0,        6,        4995,     10,     3,        10,     100,      10,     90,       10,     3,       routeTime,   moveStepSecondsStep,   0,       0]
                                                //4995  2500
var tempBansui =[]
// 实际攻防类
let numBSJ = document.getElementsByClassName("numBSJ")
              // 空防  空攻  多攻  多防  空防半随机  空攻半随机   多攻半随机   多防半随机
              //[0,    1,    2,    3,    4,        5,          6,         7]
var gongFang =  [0,    0,    0,    0,    0,        0,          0,         0]

// 涨跌类
            //o,  c,  h,  l
            //0,  1,  2,  3
var kdata = [0,   0,  0,  0]
var KKKKdata = []

                //猜涨   猜跌   不知   空赚   多赚   赚   空亏   多亏  亏   盈利   亏损
                //[ 0,   1,    2,     3,    4,     5,   6,     7,   8,   9,     10]
var geussInfo = [0,      0,    0,     0,     0,    0,   0,     0,   0,   0,     0]

const modal = document.getElementById('myModal');
const closeButton = document.querySelector('.close');
const moreButton = document.getElementById('moreButton');
const emptyButton = document.getElementById('emptyButton');
const unknownButton = document.getElementById('unknownButton');

const chuzhi = document.getElementById("chuzhi")
// ______鼠标事件处理 manager____________________________________________________________________________
{
//鼠标按下
// Mouse down event
MASKcanvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragStartX = e.clientX; // Store where the drag started, taking into account current offset
  MAINcanvas.style.cursor = 'grabbing'; // Change cursor to grabbing when dragging starts on effect
//  CrossInfo.innerHTML = "mousedown";
});
//鼠标移动
// Mouse move event
MASKcanvas.addEventListener('mousemove', (e) => {
  if (isDragging && false) {
    // console.log((dragStartX - e.clientX)/1000,Num_round((dragStartX - e.clientX)/1000),0)
    // console.log("ok",dragStartX - e.clientX)
    if((dragStartX - e.clientX) >= 5){
      dragStartX = e.clientX
      if(startIndex>=availableStartIndex){startIndex = availableStartIndex}
      else{
        startIndex += 1
        refreshDraw(Switches); // Redraw the canvas with the updated offset
      }
    }
    else if((dragStartX - e.clientX) <= -5){
      dragStartX = e.clientX
      if(startIndex<=0){}
      else{
        startIndex -= 1
        refreshDraw(Switches);; // Redraw the canvas with the updated offset
      }
    }
    // offsetX = offsetX - Num_round((dragStartX - e.clientX)/10,0); // Calculate new offset based on mouse movement
    // dragStartX = e.clientX
    // refreshDraw(responseLocal,offsetX); // Redraw the canvas with the updated offset
  }
  else{
    crossLines(2*(e.clientX-12),2*(e.clientY-12),20)
  }
  //console.log("mouse move",e.clientX,dragStartX,e.clientY);
  //CrossInfo.innerHTML = "mouse move";
});
//鼠标抬起
// Mouse up event
MASKcanvas.addEventListener('mouseup', () => {
  isDragging = false; // Stop dragging
  MAINcanvas.style.cursor = 'grab'; // Reset cursor to grab
});
//鼠标移出
// Mouse out event
MASKcanvas.addEventListener('mouseout', () => {
  isDragging = false; // Stop dragging
  MAINcanvas.style.cursor = 'grab'; // Reset cursor to grab
  CrossInfo.innerHTML = ""
  crossIdx = -1
});
//鼠标双击
// Mouse dblclick event
MASKcanvas.addEventListener('dblclick', function(event) {
  console.log("crossIdx",crossIdx)//,"index",startIndex+crossIdx)
  if(crossIdx!=-1 && VisibleData[0][crossIdx][0] == VisibleData[1][crossIdx][0]){
    MinsLinectx.clearRect(0,0,MinsLinecanvas.width,MinsLinecanvas.height)
    cut = false
    if(VisibleData[0][crossIdx][0] == responseLocal[1][pointIndex][0]){cut = true}
    fiveMinsLine(VisibleData[0][crossIdx],1,cutout = cut)
  }
});
}
// ______键盘事件处理 manager____________________________________________________________________________
{
  document.addEventListener('keydown', function(event) {
    // console.log('event.keyCode:', event.keyCode);
    // console.log('event.key:', event.key);
    // 检查是否按下了 Enter 键
    if (event.key === 'm') {
      nextDay(60);
    }
    if (event.key === 'n') {
      nextDay(1);
    }
    if (event.key === 'k') {
      ToBuy();
    }
    if (event.key === 'l') {
      ToSale();
    }
    if (event.key === 'o') {
      if(reviewModleCheckbox.checked){
        reviewModleCheckbox.checked = false;
      }else{
        reviewModleCheckbox.checked = true;
      }
    }
    if (event.key === 'p') {
      SUBctx.clearRect(0,0,SUBcanvas.width,SUBcanvas.height);
      MinsLinectx.clearRect(0,0,MinsLinecanvas.width,MinsLinecanvas.height);
      getSoketData()
    }
    if (event.key === 'y' || event.key === 'a') {
      select__ = select__y
      selectrefreshDraw(select__,1,"blue")
    }
    if (event.key === 'u' || event.key === 's') {
      select__ = select__u
      selectrefreshDraw(select__,1,"yellow")
    }
    if (event.key === 'i' || event.key === 'd') {
      select__ = select__i
      selectrefreshDraw(select__,1,"purple")
    }


    if (event.key === 'h') {
      selectrefreshDraw(select__,1,"green")
    }
    if (event.key === 'j') {
      selectrefreshDraw(select__,1,"green")
    }

    if (event.key === 'b') {
      limitPriceSale()
    }
  });
}
// refresh with select function
{
function selectrefreshDraw(needIndexs,id,color){
  {
    // for(var i = 0;i<Switches.length;i++){
    //   if (Switches[i] >0 || needIndexs[i] >0){
    //     Switches[i] = 1
    //   }
    // }
    refreshDraw(needIndexs)
    refreshDraw(Switches)
  
    var snl = []
    for(var i = 0;i<VisibleData[0].length;i++){
      snl.push(1)
    }
  }
    switch(id){
      case 1:selectNormal(needIndexs,snl);break
    }
    // console.log("snl",snl)
    // drawStickToCTX(snl,SUBctx,SubchartHeight,100,["green","red","blue"],1,8,0);
    SUBctx.fillStyle = color
    var width = 8
    for(var i = 0;i<snl.length;i++){
      if(snl[i]==1){
        SUBctx.fillRect(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2-width/2,0, width,20);
      }
    }
}
function selectNormal(needIndexs,snl){
  var endTill = startIndex+VisibleData[0].length;
  var j = 0
  // console.log("startIndex",startIndex,"endTill",endTill)
  //VOLUME,drawAverageLine,IVCD,BBI,BTX,BIAS_QL,NKD,RSIS,OPENVOL,CAT
  //0         1             2     3   4   5       6   7，   8     9
  // VOLUME
  if(needIndexs[0]==1){
    for(var i = 0;i<Volume_G_data[0].length;i++){
      if(Volume_G_data[1][i]>Volume_G_data[2][i] && snl[i]==1){
        snl[i] = 1
      }else{
        snl[i] = 0
      }
    }
  }
  // anverage
  if(needIndexs[1]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      if(Price_Average_Line[0][1][i]>Price_Average_Line[1][1][i] && snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
  }
  // I_V
  if(needIndexs[2]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      if(IVCD_data[0][4][i]>IVCD_data[0][5][i] && snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
  }
  // BBI
  if(needIndexs[3]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      if(BB_Index[0][4][i]<BB_Index[1][4][i] && snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
  }
  // // BTX
  // BIAS_QL
  if(needIndexs[5]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      if(BIAS_QLs_S_MA[0][2][i]>BIAS_QLs_S_MA[0][1][i] && snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
  }
  // KDJ
  if(needIndexs[6]==1){
    for(var i = snl.length-KDJ_data[0].length;i<KDJ_data[0].length;i++){
      if(KDJ_data[3][i]>KDJ_data[1][i] && snl[i]==1){
        snl[i] = 1
      }else{
        snl[i] = 0
      }
    }
  }
  //RSI
  if(needIndexs[7]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      if(RSI_SMA[0][2][i]>RSI_SMA[2][2][i] && snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
  }
  //XZC
  // console.log("XZC_data",XZC_data)
  if(needIndexs[8]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      if(XZC_data[0][2][i]>XZC_data[0][3][i] && XZC_data[0][4][i]>XZC_data[0][2][i] &&snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
  }
  // // PRE
  // // TST
  //YYX YYX_data[0][1][i]>YYX_data[0][0][i] && 
  if(needIndexs[10]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      // if(YYX_data[0][1][i]>YYX_data[0][0][i] && snl[j]==1 && YYX_data[0][4][i]>0){
      // if(YYX_data[0][1][i]>YYX_data[0][0][i] && snl[j]==1 ){
      // if(snl[j]==1 && responseLocal[1][i-1][7]<2  && responseLocal[1][i-1][7]>-2){
      if(YYX_data[0][5][i]>0 && snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
    // var pos = 0
    // for(var i = 0;i<YYX_data[0][5].length;i++){
    //   if(YYX_data[0][5][i]>0){pos+=1}
    // }
    // for(var i = startIndex;i<=pointIndex;i++){
    //   if(YYX_data[0][5][i]>0){pos+=1}
    // }
    // console.log("start",startIndex,"end",pointIndex,"winN",pos,"within",pointIndex-startIndex+1,"WIN RATE:",pos/(pointIndex-startIndex+1));
    
    // var bs = [pointIndex/4,pointIndex/2,10,5]
    // var step = [[0,bs[0]],[bs[0],2*bs[0]],[2*bs[0],3*bs[0]],[3*bs[0],pointIndex],[0,pointIndex/2],[pointIndex/2,pointIndex],[0,pointIndex]]
    // var rst = []
    // for(var j = 0;j<step.length;j++){
  // 限价概率
  {
    var rst = {}
    // all 
    coutRateNO1(0,pointIndex,rst,"all")
    // half
    coutRateNO1(0,pointIndex/2,rst,"quarter")
    coutRateNO1(pointIndex/2,pointIndex,rst,"quarter")
    // quarter
    coutRateNO1(0,pointIndex/4,rst,"quarter")
    coutRateNO1(pointIndex/4,pointIndex/2,rst,"quarter")
    coutRateNO1(pointIndex/2,pointIndex/2*3,rst,"quarter")
    coutRateNO1(pointIndex/4*3,pointIndex,rst,"quarter")
    // ten
    coutRateNO1(0,10,rst,"ten")
    coutRateNO1(10,20,rst,"ten")
    coutRateNO1(100,110,rst,"ten")
    coutRateNO1(110,120,rst,"ten")
    coutRateNO1(pointIndex-10,pointIndex,rst,"ten")
    coutRateNO1(pointIndex-20,pointIndex-10,rst,"ten")
    // five
    coutRateNO1(0,5,rst,"five")
    coutRateNO1(5,10,rst,"five")
    coutRateNO1(100,105,rst,"five")
    coutRateNO1(105,110,rst,"five")
    coutRateNO1(pointIndex-5,pointIndex,rst,"five")
    coutRateNO1(pointIndex-10,pointIndex-5,rst,"five")
    
    console.log(responseLocal[3],responseLocal[3],responseLocal[3])
    console.log("overlapRate",overlapRate,"overlapMinPrice",overlapMinPrice)
    console.log("rst",rst)
  }
  // return
  // YYX限价概率
  {
    var redL = 0
    var greenL = 0
    var redA = 0
    var greenA = 0
    for(var i = 1;i<pointIndex+1;i++){
      // if(YYX_data[0][0][i]>YYXProiod/2){
      // if(Price_Average_Line[0][1][i]>Price_Average_Line[1][1][i]){
      if(responseLocal[1][i-1][7]<2){
        redA++
        if(YYX_data[0][5][i]>0){
          redL++
        }
      }
      // if(YYX_data[0][1][i]>YYXProiod/2){
      // if(Price_Average_Line[0][1][i]<Price_Average_Line[1][1][i]){
      if(responseLocal[1][i-1][7]>2){
        // console.log(responseLocal[1][i][0],responseLocal[1][i-1][7])
        greenA++
        if(YYX_data[0][5][i]>0){
          greenL++
        }
      }
    }
    console.log("redL",redL,"redA",redA,redL/redA,"greenL",greenL,"greenA",greenA,greenL/greenA) 
  }
  }
}
function coutRateNO1(start,end,reslut,info){
    end = Num_round(end,0)
    start = Num_round(start,0)
    leng = (end-start+1)
    var pos = 0
    var rt = 0
    for(var i = start;i<=end;i++){
      if(YYX_data[0][5][i]>0){pos+=1}
    }
    rt = pos/leng
    reslut[info+" "+(end-start+1)+" A "+start+"-"+end] = rt
    // console.log("start",start,"end",end,"winN",pos,"within",leng,"WIN RATE:",rt);
    return rt
}
}
// ______事件处理 函数____________________________________________________________________________
// function radioCLHandleChange(radio){
//   switch (radio.id) {
//     case "SuiJiChuZhi":if()break;
// }
// // 关闭模态框
//   closeButton.addEventListener('click', function() {
//     modal.style.display = 'none';
// });

// 按钮点击事件
moreButton.addEventListener('click', function() {
    //alert('你选择了“多”');
    modal.style.display = 'none';
    geuss = 1;
});

emptyButton.addEventListener('click', function() {
    //alert('你选择了“空”');
    modal.style.display = 'none';
    geuss = -1;
});

unknownButton.addEventListener('click', function() {
    //alert('你选择了“不知道”');
    modal.style.display = 'none';
    geuss = 0;
});

// // 点击模态框外部关闭
// window.addEventListener('click', function(event) {
//     if (event.target === modal) {
//         modal.style.display = 'none';
//     }
// });



// ______定时期 manager____________________________________________________________________________
setInterval(function() {
  // 单元结算
  if((moveStep == unitCount)){ //系统循环 
    // console.log("im fine1");
    moveStep++;      
    if (numCLValueArray[14]>0 ) {
      win++;
      winRate += numCLValueArray[14]
    }
    else if (numCLValueArray[14]<0 ){
      loss++;
      lossRate += numCLValueArray[14]
    }
    else if (numCLValueArray[14]==0 ){ping++}

    // downloadCanvasAsImage("MASKchart", win+loss+ping+"MinsLineCanvas.png");
    console.log("上一单元结算","初值",moveLineDatas[0],"次数",win+loss+ping,"simple容量"
      ,simple.length,"涨跌",numCLValueArray[14],"震幅",numCLValueArray[15]);
   // console.log(unitReport());
    simpleOfZD.push([moveLineDatas[0],numCLValueArray[14]])//涨跌样本
    downloadCanvasAsImage('Minschart', win+loss+ping+'涨跌'+numCLValueArray[14]
      +'MinsLineCanvas.png',unitReport());
    // var positive = 0
    // var negative = 0
  }
  //开启新循环
  if(radioCLValueArray[2] == 1 && (moveStep == unitCount || moveStep-1 == unitCount) && simple.length<simpleCap){ //系统循环 
      KKKKdata = []
      moveStep = 0;
      yushu = 0;
      duanZhangDie = 0;
      switch(getRandomInt(0,2)){
        case 0:break;
        case 1:temponce = numCLValueArray[7];
        numCLValueArray[7] = numCLValueArray[9];
        numCLValueArray[9] = temponce;break;
        case 2:temponce = numCLValueArray[7];
        numCLValueArray[7] = tempBansui[0];
        tempBansui[0] = temponce/////////
        temponce = numCLValueArray[9];
        numCLValueArray[9] = tempBansui[1];
        tempBansui[1] = temponce;break;
      }
      geuss = 0;
  }
  // 最终结算报告
  if(simple.length>=simpleCap && moveStep-1 == unitCount){
    console.log("\n\n报告");
    SpecialInfo("报告");
    moveStep*=2;
    const p = document.createElement('p');
    p.style.color = "white"
    p.innerHTML = ressultReport();
    downloadList.appendChild(p);
    downloadList.style.display = "flex"
  }//SpecialInfo("报告");}

  // 运行图表
  if(moveStep<unitCount && geuss != 10){
    moveStepSeconds+=numCLValueArray[13];
    if(moveStepSeconds >= 60){
      KKKKdata.push([])
      moveStepSeconds = 0;
      moveStep++;
      incrase = 0;
      if(moveStep == pauseStep && radioCLValueArray[7] == 1){modal.style.display = 'block';geuss = 10;}
  
      //PrintBASICVariables("setInterval");
    }
    doFrameManager();
    var currentTime = new Date();
    //CrossInfo.innerHTML = currentTime;
    //CrossInfo.innerHTML = moveUnitWidth;
    //CrossInfo.innerHTML = moveLineDatas[moveStep] + "  " + moveStepSeconds;
    //Console.log("moveLineDatas",moveLineDatas);
    MinsLinectx.clearRect(0,0,MinsLinectx.width,MinsLinectx.height)
    drawLines(MinsLinectx,moveLineDatas,MainchartHeight,moveUnitWidth,moveStep,0,0,"white","black");
  }
  //console.log(getRandomInt(-5, 5))
}, numCLValueArray[12]);



// ______frame manager____________________________________________________________________________
{
  function doFrameManager() {
  if(moveStep == 0){ //moveStep == 239
    //moveStep = 0;
    clearChart(MinsLinectx)
    if(radioCLValueArray[0] == 0){moveLineDatas[moveStep] = numCLValueArray[0];} //初值固定)}
    else{
      moveLineDatas[moveStep] = getRandomInt(1,10000)
      chuzhi.value = moveLineDatas[moveStep]
    } //初值随机)}
    kdata[0] = moveLineDatas[0]
    //console.log(moveStepSeconds);
    //console.log("初值",moveLineDatas[0],"次数",win+loss+ping,"simple容量",simple.length);
    // if(moveStepSeconds == 40){console.log("初值",moveLineDatas[0],"次数",win+loss+ping+1,"simple容量",simple.length,"上次涨跌",numCLValueArray[14]);simpleOfZD.push([moveLineDatas[0],numCLValueArray[14]])}
  }else{
    if(radioCLValueArray[1] == 1){
      incrase += getRandomIntWithSign(numCLValueArray[1],numCLValueArray[2]); //系统随机    
    }else{
      // 半随机数
      for (var i = 3; i < radioCL.length-1; i++) {
        if (radioCL[i].checked) {
          temponce = getRandomInt(0,numCLValueArray[2*i-1]);
          if(Math.random()>=numCLValueArray[3]/10000){
            //console.log("半随机数",temponce,temponce/50);
            temponce = Math.ceil(temponce/(numCLValueArray[7]/2));
          }
          simple.push(temponce)
          gongFang[i+1] = temponce;
          // gongFang[i+1] = getRandomInt(0,numCLValueArray[2*i-1]);
          // console.log(numBSJ,gongFang,gongFang[i+1],i+1,"im fine");
          // console.log(numBSJ[i-3],i-3,"im fine");
          numBSJ[i-3].value = gongFang[i+1];
        } else {
          gongFang[i+1] = 0;
          numBSJ[i-3].value = 0;
        }
      }
      gongFang[1] = numCLValueArray[6] + gongFang[5]; //
      gongFang[2] = numCLValueArray[8] + gongFang[6]; //
      if(yushu > 0){
        gongFang[1] += yushu; 
      }else if(yushu < 0){
        gongFang[2] -= yushu;
      }
      // console.log("random suiji");
      // console.log("gongFang",gongFang);
      //moveLineDatas[moveStep] = 0;
      if(gongFang[1]-gongFang[2]<0){//多大于空
        //console.log("specail suiji","1xxxxx");
        incrase += Math.ceil(gongFang[2] / gongFang[1])
        yushu = gongFang[2] % gongFang[1];
      }else if(gongFang[1]-gongFang[2]>0){//空大于多
        //console.log("specail suiji","2xxxxx");
        incrase -= Math.ceil(gongFang[1] / gongFang[2])
        yushu = -(gongFang[1] % gongFang[2]);
      }else{
        //console.log("specail suiji","3xxxxx");
        incrase += 0;
        yushu = 0;
      }
      //numCL[6].value = numCLValueArray[6];
      //numCL[8].value = numCLValueArray[8];
      //moveLineDatas[moveStep] = moveLineDatas[moveStep-1]+incrase
      //incrase += getRandomIntWithSign(numCLValueArray[1],numCLValueArray[2])
      // console.log("specail suiji",incrase);
      // CrossInfo.innerHTML = "空攻  " + gongFang[1] + "  " + "多攻  " + gongFang[2];

    }
    //console.log(KKKKdata,moveLineDatas[moveStep-1]+incrase)
    // console.log(moveLineDatas[moveStep-1]+incrase)
    KKKKdata[moveStep-1].push(moveLineDatas[moveStep-1]+incrase)//
    moveLineDatas[moveStep] = moveLineDatas[moveStep-1]+incrase//第一个为初值
    //涨跌
    numCLValueArray[14] = Num_round((moveLineDatas[moveStep]-moveLineDatas[0])/moveLineDatas[0]*100,2); //全局涨跌
    QuanJuZhangDie.innerHTML = numCLValueArray[14] + "%";
    if (numCLValueArray[14] > 0) {
      QuanJuZhangDie.style.color = "red";
    }else if (numCLValueArray[14] < 0) {
      QuanJuZhangDie.style.color = "green";
    }else{
      QuanJuZhangDie.style.color = "white";
    }

    var max = 0
    var min = moveLineDatas[0]
    for(var i =0;i<moveStep;i++){
      if(moveLineDatas[i]>max){max = moveLineDatas[i]}
      if(moveLineDatas[i]<min){min = moveLineDatas[i]}
    }

    numCLValueArray[15] = Num_round((max-min)/min*100,2); //当下涨跌

    // var duanZhangDie = Num_round((moveLineDatas[moveStep]-moveLineDatas[moveStep-1])/moveLineDatas[moveStep-1]*100,2);
    //var duanZhangDie = 0// = Num_round((moveLineDatas[moveStep]-moveLineDatas[moveStep-1])/moveLineDatas[moveStep-1]*100,2);
    if(geuss != 10 && geuss != 0){duanZhangDie = geuss * Num_round((moveLineDatas[moveStep]-moveLineDatas[pauseStep])/moveLineDatas[pauseStep]*100,2);}
    DuanQiZhangDie.innerHTML = duanZhangDie+"%";
    if (duanZhangDie> 0) {
      DuanQiZhangDie.style.color = "red";
    }else if (duanZhangDie < 0) {
      DuanQiZhangDie.style.color = "green";
    }else{
      DuanQiZhangDie.style.color = "white";
    }
    
    // var innerHTMLText = ""
    // if (numCLValueArray[14] > 0) {
    //   innerHTMLText += '<span style="color: #FF2222;">';
    // } else   if (numCLValueArray[14] < 0) {
    //   innerHTMLText += '<span style="color: rgb(41, 158, 12);">';
    // } else {
    //   innerHTMLText += '<span style="color: grey;">';
    // }
    // innerHTMLText += "涨跌："+ numCLValueArray[14] + "%"
  
    // innerHTMLText += '<span style="color: grey;">';
    // innerHTMLText += "   振幅："+ numCLValueArray[15] +"</span>" + "</div>"
  
    // if (duanZhangDie > 0) {
    //   innerHTMLText += '<span style="color: #FF2222;">';
    // } else   if (duanZhangDie < 0) {
    //   innerHTMLText += '<span style="color: rgb(41, 158, 12);">';
    // } else {
    //   innerHTMLText += '<span style="color: grey;">';
    // }
    // innerHTMLText += "   变化："+ duanZhangDie + "%"
    // CrossInfo.innerHTML = innerHTMLText

    kdata[1] = moveLineDatas[moveStep]
    kdata[2] = max
    kdata[3] = min

  }
  //CrossInfo.innerHTML = "moveStep: " + moveStep + "  moveStepSeconds:  " + moveStepSeconds  + "  price:  " + moveLineDatas[moveStep] + "  incrase:  " + incrase + "  positive:  " + positive + "  negative:  " + negative;
}

// function generateDataInFakeRandom() {
//   //初值
//   if(moveStep == 0){
//     moveLineDatas[moveStep] = Math.abs(getRandomIntWithSign(1,10000))
//   }else{
//     moveLineDatas[moveStep] = moveLineDatas[moveStep-1]+getRandomIntWithSign(0,5)
//   }
// }

function getRandomInt(min, max) { //[min,max]闭区间
  min = Math.ceil(min); // 向上取整
  max = Math.floor(max); // 向下取整
  var rtl = Math.floor(Math.random() * (max - min + 1)) + min;
  return rtl;
}
function getRandomIntWithSign(min, max) { //[min,max]闭区间
  min = Math.ceil(min); // 向上取整
  max = Math.floor(max); // 向下取整
  var rtl = Math.floor(Math.random() * (max - min + 1)) + min;
  // console.log(rtl,rtl);
  // if(simple.length<simpleCap){simple.push(rtl)}

  if(Math.random()>=numCLValueArray[3]/10000){
    rtl = -rtl;
    negative++
  }else{
    positive++
  }
  simple.push(rtl)
  SumPositiveNegative += rtl
  return rtl;
}

function downloadCanvasAsImage(canvasId, fileName,info) {
  const canvas = document.getElementById(canvasId);
  const dataURL = canvas.toDataURL('image/png'); // 将 Canvas 内容转换为 Base64 编码的 PNG 图片

  // 创建图片元素
  const img = document.createElement('img');
  img.src = dataURL;
  img.alt = fileName || 'canvas_image.png';
  img.style.width = '43vw'; // 设置图片宽度为 86vw
  img.style.height = 'auto'; // 保持长宽比
  img.style.border = '1px solid white'; // 添加白色边框

  // 创建 a 标签
  const a = document.createElement('a');
  a.style.fontSize = "10px"
  a.href = dataURL;
  a.download = fileName || 'canvas_image.png';
  // a.textContent = fileName || 'canvas_image.png';
  a.textContent = "下载图片"
  // a.style.marginLeft = '10px'; // 设置 a 标签的左边距
  a.style.textAlign = 'left'; // 设置内容靠左对齐
  a.style.display = 'block'; // 确保 a 标签占满整行
  //a.style.verticalAlign = 'left'; // 对齐方式

  // 创建 p 标签
  const p = document.createElement('p');
  p.style.fontSize = "10px"
  p.style.color = "white"
  // p.textContent = info || 'Additional information'; // 设置 p 标签的文本内容
  // p.innerHTML = "<a href="+dataURL+">"+"下载图片"+"</a><br>"+info || 'Additional information'; // 设置 p 标签的文本内容
  p.innerHTML = info || 'Additional information'; // 设置 p 标签的文本内容
  p.style.marginLeft = '10px'; // 设置 p 标签的左边距
  //p.style.verticalAlign = 'left'; // 对齐方式


  // 创建一个容器 div
  const infoBar = document.createElement('div');
  // infoBar.style.width = '48.5vw'; // 设置图片宽度为 86vw
  // infoBar.style.border = '1px solid white'; // 添加白色边框
  // infoBar.style.marginTop = '10px'; // 设置容器的上边距
  // infoBar.style.marginBottom = '10px'; // 设置容器的上边距
  infoBar.style.flexDirection = 'column';
  infoBar.style.display = 'flex';
  infoBar.style.alignItems = 'center';
  infoBar.appendChild(a);
  infoBar.appendChild(p);
  //infoBar.appendChild(p);

  // 创建一个容器 div
  const container = document.createElement('div');
  container.style.width = '48.5vw'; // 设置图片宽度为 86vw
  container.style.border = '1px solid white'; // 添加白色边框
  container.style.marginTop = '10px'; // 设置容器的上边距
  container.style.marginBottom = '10px'; // 设置容器的上边距

  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.appendChild(img);
  //container.appendChild(a);
  //container.appendChild(p);
  container.appendChild(infoBar);

  // 获取或创建 downloadList
  if (!downloadList) {
      downloadList = document.createElement('div');
      downloadList.id = 'downloadList';
      document.body.appendChild(downloadList);
  }
  // 将容器添加到 downloadList
  downloadList.appendChild(container);

  // 触发下载
  // a.click();
}
}

// ______结算报告____________________________________________________________________________
{
// single report
function unitReport(){
  // var rpt = "单元结算:\n"+"<br>\n次数:"+(win+loss+ping)

  var cai= (function(){
      var c = ""
      if(geuss>0 && geuss!=10){c="多";geussInfo[0]+=1;}
      else if(geuss<0){c="空";geussInfo[1]+=1;}
      else {c="不知";geussInfo[2]+=1;}

      if(duanZhangDie>0 && geuss!=10){
        if(geuss>0 && geuss!=10){geussInfo[4]+=1;}
        else if(geuss<0){geussInfo[3]+=1;}
        geussInfo[9] += duanZhangDie
        return c+"赚"
      }
      // else if(geuss*numCLValueArray[14]<0){
      else if(duanZhangDie<0){
        if(geuss>0 && geuss!=10){geussInfo[7]+=1;}
        else if(geuss<0){geussInfo[6]+=1;}
        geussInfo[10] += duanZhangDie
        return c+"亏"
      }else return c+"平"
      
    })()
    geussInfo[5] = geussInfo[3] + geussInfo[4]
    geussInfo[8] = geussInfo[6] + geussInfo[7]


    console.log("duanZhangDie",duanZhangDie,cai );

  return "单元结算:\n"
  +"<br>\n次数:"+(win+loss+ping)
  +"<br>\n猜:"+cai
  +"<br>\n盈亏:"+duanZhangDie+"%"
  +"<br>\n<br>\n涨跌:"+numCLValueArray[14]+"%"
  +"<br>\n震幅:"+numCLValueArray[15]+"%"
  +"<br>\n<br>\n初值:"+moveLineDatas[0]
  +"<br>\nsimple容量："+simple.length
  +"<br>\n随机范围:"+numCLValueArray[1]+"--"+numCLValueArray[2]
  +"<br>\n随机中值:"+numCLValueArray[3]
  +"<br>\n空随:"+numCLValueArray[7]
  +"<br>\n攻随:"+numCLValueArray[9]
}
// mutiple report
function ressultReport(){
  var rslt = ""  
  rslt += "<br>\n猜涨"+geussInfo[0]+"  猜跌"+geussInfo[1]+"  不知"+geussInfo[2]  
  rslt += "<br>\n空赚"+geussInfo[3]+"  空赚"+geussInfo[4]+"  盈利"+geussInfo[9]+"%"
  rslt += "<br>\n空亏"+geussInfo[6]+"  多亏"+geussInfo[7]+"  亏损"+Num_round(geussInfo[10],2)+"%"
  rslt += "<br>\n赚"+geussInfo[5]+"  亏"+geussInfo[8]+"  胜率"+100*Num_round(geussInfo[5]/(geussInfo[5]+geussInfo[8]),2)+"%"


  rslt += "<br><br>\n负值"+negative+"  正值"+positive+"  总和"+SumPositiveNegative  
  rslt += "<br>\n盈"+win+"  亏"+loss+"  平"+ping+"  总和"+(win+loss+ping)+"  盈利"+Num_round(winRate,2)+"  亏损"+Num_round(lossRate,2)
  rslt += "<br>\n盈率"+Num_round(win/(win+loss+ping)*100,2)+"%"+"亏率"+Num_round(loss/(win+loss+ping)*100,2)+"%"+"  平率"+Num_round(ping/(win+loss+ping)*100,2)+"%"
  rslt += "<br><br>\nSMPLE样本"+simple

  //console.log("simple",simple,"simple.length",simple.length);
  var ssm = 0;
  for(var i = -numCLValueArray[2];i<=numCLValueArray[2];i++){
    var sum = 0
    for(var j = 0;j<simple.length;j++){
      if(simple[j] == i){
        sum++
      }
    }
    rslt += "<br>\n次数"+"     "+i+"     "+sum+"     "+Num_round(sum/simple.length*100,2)+"%"
    ssm += sum;
  }
  rslt += "<br>\n样本容量"+simple.length+"  验证次数"+ssm

  sum = 0;
  for(var i = 0;i<simple.length;i++){
    sum += simple[i];
  }
  rslt += "<br>\nsimple值总和"+sum
  rslt += "<br><br>\nmoveLineDatas"+moveLineDatas
  rslt += "<br><br>\n涨跌样本"+simpleOfZD

  return rslt
}

}

// ______indexes chart draw functions____________________________________________________________________________
{
// 5分钟
// draw five minutes line_____FUNCTION
function fiveMinsLine(dataRaw,index,cutoutt=true){
  data = []
  data2 = []
  data.push(dataRaw[1])
  for (i = 1; i < dataRaw.length; i+=5) {
    if(dataRaw[i+index]==0){break;}
    data.push(dataRaw[i+index])
    data2.push(dataRaw.slice(i,i+5))
    if(data.length>=subEndIndex+1 && cutoutt ){break;}
  } 
  // console.log("data,data.length,subEndIndex,subEndIndex+1",data,data.length,subEndIndex,subEndIndex+1);

  max = data[0]
  min = data[0]
  for (i = 0; i < data.length; i++) {
    if(data[i]>max){max = data[i]}
    if(data[i]<min){min = data[i]}
  }
  if(max==min){
    max = 1.5*max
    min = 0.5*min
  }
  average = Num_round((MainchartHeight) / (max - min),4)
  gap = MainchartWidth/(subDataLength-1)

  // MinsLinecanvas.height = Math.ceil(MainchartHeight) 
  // MinsLinecanvas.width = MainchartWidth

  MinsLinectx.lineWidth = 1.5
  MinsLinectx.strokeStyle = "white"

  MinsLinectx.fillRect(0,0,MainchartWidth,MainchartHeight)

  MinsLinectx.beginPath()
  data[0] = Num_round((MainchartHeight) - (data[0]-min)*average,1)
  MinsLinectx.moveTo(0,data[0])
  
  // console.log("fiveMinsLine data.length,data",data.length,data)
  for(var i = 1;i<data.length;i++){
    data[i] =  Num_round((MainchartHeight) - (data[i]-min)*average,1)
    MinsLinectx.lineTo(i*gap,data[i])
  }
  MinsLinectx.stroke()

  if(subEndIndex<48){
    data2.unshift(dataRaw[0])
    console.log("getSoketTempIV","subEndIndex",subEndIndex,"++++++++++++++++++++++")
    $.ajax({
      url: '/getSoketTempIV',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({"data":[data2],"type":dayWeekChoice}),  // 打包为JSON格式
      success: function(response) {
        // console.log("response",response)
        TempIv = response
        // console.log("getSoketTempIV  TempIv[0]",TempIv[0])
        // console.log(TempIv);
        // draw
        refreshDraw(Switches);
      },
      error: function(error) {
          console.log("getSoketTempIV wrong",error)
          TempIv = []
      }
    });
  }
}
// 聚焦信息
// draw focus item info_____FUNCTION
function crossInfo(crossIdx,visibleMax){
  // print("0,date,  1,open,  2,close,  3,high,  4,low,    5,volume,
  //        6,turn,  7,pctChg,  8,peTTM, 9,pbMRQ, 10,psTTM,
  //        11,pcfNcfTTM, 12,isST, 13,preclose")
  // console.log(VisibleData[1][crossIdx])
  text = ""
  text += "<div><b>日期："+VisibleData[1][crossIdx][0]
  text += "\n开盘："+VisibleData[1][crossIdx][1]
  text += "\n最高："+VisibleData[1][crossIdx][3]
  text += "\n最低："+VisibleData[1][crossIdx][4]  

  if (crossIdx > 0) {
    if (VisibleData[1][crossIdx][2] > VisibleData[1][crossIdx - 1][2]) {
        text += '<span style="color: #FF2222;">';
    } else if (VisibleData[1][crossIdx][2] < VisibleData[1][crossIdx - 1][2]) {
        text += '<span style="color: rgb(41, 158, 12);">';
    } else {
        text += '<span style="color: grey;">';
    }
  }else{
      text += "<span>";
  }
  // console.log(((VisibleData[1][crossIdx][2]-VisibleData[1][crossIdx - 1][2])/VisibleData[1][crossIdx - 1][2])*100)
  // console.log((((VisibleData[1][crossIdx][2]-VisibleData[1][crossIdx - 1][2])/VisibleData[1][crossIdx - 1][2])*100).toFixed(3))
  // text += "\n\n涨跌："+(((VisibleData[1][crossIdx][2]-VisibleData[1][crossIdx - 1][2])/VisibleData[1][crossIdx - 1][2])*100).toFixed(3) + "%"

  text += "\n涨跌："+ VisibleData[1][crossIdx][7] + "%\n"
  text += "\n收盘："+VisibleData[1][crossIdx][2] +"</span>" + "</div>"

  text += "<div>\n\nQ  1："+VisibleData[2][crossIdx][Bx_On_Use[0]]
  text += '<span style="color: rgb(188, 146, 7);">'+"\nMDL："+VisibleData[2][crossIdx][Bx_On_Use[1]]+"</span>"
  text += "\nQ  3："+VisibleData[2][crossIdx][Bx_On_Use[2]]
  text += "\nMIN："+VisibleData[2][crossIdx][Bx_On_Use[3]]
  text += "\nMAX："+VisibleData[2][crossIdx][Bx_On_Use[4]] + "</div>"
  text += "\n成交："+VisibleData[1][crossIdx][5]
  text += "\n换手："+VisibleData[1][crossIdx][6] + "%"
  // print("0,date,  1,open,  2,close,  3,high,  4,low,    5,volume,
  //        6,turn,  7,pctChg,  8,peTTM, 9,pbMRQ, 10,psTTM,
  //        11,pcfNcfTTM, 12,isST, 13,preclose")
  switch (true) {
    case VisibleData[1][crossIdx][13]<20:
      text += '<span style="color: red;">\n市盈：'+VisibleData[1][crossIdx][13] +"</span>"
      break
    case VisibleData[1][crossIdx][13]>20 && VisibleData[1][crossIdx][13]<40:
      text += '<span style="color: orangered;">\n市盈：'+VisibleData[1][crossIdx][13] +"</span>"
      break
    default:
      text += '<span style="color: rgb(41, 158, 12);">\n市盈：'+VisibleData[1][crossIdx][13] +"<b></span>"
  }
  text += "\n市盈："+VisibleData[1][crossIdx][8] + "%"
  text += "\n市净："+VisibleData[1][crossIdx][9] + "%"
  text += "\n市销："+VisibleData[1][crossIdx][10] + "%"

  if(crossIdx>=(windowLength/2)){
    CrossInfo.style.right = ""
    CrossInfo.style.left = "0"
    CrossInfo.innerHTML = text
  }else{
    // CrossInfo.style.whiteSpace = 'pre';
    CrossInfo.style.left = ""
    CrossInfo.style.right = "0"
    CrossInfo.innerHTML = text
  }
}
// volume成交量
// draw volume line_____FUNCTION
function Volume(width,dataIndex,averangeDraw,saveTo=Volume_G_data){
  console.log("Volume start:+++++++++++++++++++++++")
  Volume_G_data = []
  var volumeData = []
  for(var i = 0;i<VisibleData[1].length;i++){
    volumeData.push(VisibleData[1][i][dataIndex])
  }
  // console.log("volumeData",volumeData)
  max = Math.max.apply(null, volumeData);
  for(var i = 0;i<volumeData.length;i++){
    color = (function(){
      if(VisibleData[1][i][2]>=VisibleData[1][i][1])return "#DD1144"
      else return "#00FFFF"
    })()
    var heightData = Num_round((volumeData[i]/max)*SubchartHeight,2)
    // console.log("heightData",heightData,"i",i)
    SUBctx.fillStyle = color;
    SUBctx.fillRect(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2-width/2, SubchartHeight-heightData, width,heightData);
  }
  Volume_G_data.push(volumeData)
  if(averangeDraw == "draw"){
    Vaverage = Num_round(SubchartHeight / (max - 0),15)
    // console.log("Vaverage",Vaverage,"SubchartHeight",SubchartHeight,(max - 0),(max - 0));
    drawAverageLine(5,1,5,0,Vaverage,"#FFFF00",SUBctx,SubchartHeight,"draw","normal",saveTo=Volume_G_data)
    drawAverageLine(10,1,5,0,Vaverage,"#FF00FF",SUBctx,SubchartHeight,"draw","normal",saveTo=Volume_G_data)
  }
  console.log("Volume end:--------------------------")
  // console.log("Volume_G_data volumeData",volumeData)
  return max
}
// volume average line 成交量均线
// draw volume average line_____FUNCTION
function drawAverageLineVolume(data,dataIndex,maxPV,indexStart,heightAverage,sumAverage,boxWidth,color,fiveFlag){
  boxWidth = boxWidth/2
  lineData = []
  indexEnd = offsetX+1+KdataVisible.length
  if(indexEnd>data.length+1){indexEnd = data.length+1}

  while(indexStart<sumAverage-1){
    lineData.push(0)
    indexStart += 1
  }
  if(fiveFlag){indexEnd--}
  while(indexStart<indexEnd-1){
    sum = 0
    for(var i = indexStart+1-sumAverage;i<indexStart+1;i++){
      sum += data[i][dataIndex]
    }
    lineData.push(2*(Num_round(SubchartHeight - SubchartHeight*(sum/sumAverage)/maxPV,2)))
    indexStart+=1
  }

  SUBctx.lineWidth = 2;
  SUBctx.strokeStyle = color;
  SUBctx.beginPath();
  dataIndex = 0
  // console.log("4th",lineData)
  while(lineData[dataIndex]==0){dataIndex+=1}
  SUBctx.moveTo(2*(5+dataIndex*20+boxWidth / 2),lineData[dataIndex])
  dataIndex+=1
  while(dataIndex<lineData.length){
    SUBctx.lineTo(2*(5+dataIndex*20+boxWidth / 2),lineData[dataIndex])
    dataIndex+=1
  }
  SUBctx.stroke();
}

}


// _______basic draw fun___________________________________________________________________________
{
  // average line 均线
// draw price average line_____FUNCTION
function drawAverageLine(sumPriod,dataPosition,dataIndex,Min,CAverage,color,Ctx,CtxHeight,drawFlag,type,saveTo=null){
  console.log("drawAverageLine "+drawFlag+"  "+type+" start:+++++++++++++++++++++++")
{
  dataRaw = []
  if(type == "normal"){
    sum = 0  
    // get raw data as array
    for(var i = startIndex;i<=pointIndex;i++){
      sum = 0
      if(i>=sumPriod-1){
        for(var ii=i-sumPriod+1;ii<=i;ii++){
          sum+=responseLocal[dataPosition][ii][dataIndex]
          // console.log("anverage plus",responseLocal[dataPosition][ii],responseLocal[dataPosition][ii][dataIndex])
        }
      }
      if(i==pointIndex && i>=sumPriod-1){
        sum -= responseLocal[dataPosition][pointIndex][dataIndex]
        sum += VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]
        // console.log("anverage replace",VisibleData[dataPosition][VisibleData[dataPosition].length-1])
      }
      // console.log("sum/sumPriod",Num_round(sum,3)/sumPriod,"sum",sum,"sumPriod",sumPriod)
      // console.log("\n!??????????????????????????????##########################\n")
      dataRaw.push(Num_round(sum,3)/sumPriod)
    }
      // lineDataIIF.push((Num_round(SubchartHeight - SubchartHeight*(element-min)/dict,3)))
      // temp.push(Num_round(MainchartHeight - (VisibleData[1][i][j]-minPrice)*MCaverage,1))
  }
  else if(type == "bbi"){dataRaw = BBI(3,6,12,24,1,2)}
}
// select
if (!(saveTo == null)) {
  saveTo.push(dataRaw)
}
if(drawFlag=="draw"){
  // drawLineToCTX(dataRaw,Min,Ctx,CtxHeight,CAverage,color)

  // heighted
  var lineData = []
  for(var i = 0;i<dataRaw.length;i++){
    if(dataRaw[i]!=0){
      lineData.push(Num_round(CtxHeight - (dataRaw[i]-Min)*CAverage,3))
    }else{lineData.push(0)}
  };
  // console.log("dataRaw",dataRaw,"lineData",lineData,"Min",Min,"CAverage",CAverage)
  // istart
  var iStart = 0
  for(var i = 0;i<dataRaw.length;i++){
    if(dataRaw[i] == 0){iStart++;}
    else{break}
  }
  Ctx.lineWidth = 2;
  Ctx.strokeStyle = color;
  Ctx.beginPath();
  Ctx.moveTo(drawGap+iStart*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
  dataIndex+=1
  for(var i = iStart;i<dataRaw.length;i++){
    Ctx.lineTo(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
  };Ctx.stroke();
}
  console.log("drawAverageLine end:--------------------------")
  return dataRaw
}
function drawLineToCTX(data,Min,Ctx,CtxHeight,CAverage,color){
  // heighted
  var lineData = []
  var iStart = 0
  for(var i = 0;i<data.length;i++){
    if(Number.isNaN(data[i])){lineData.push(NaN)}
    else{lineData.push(Num_round(CtxHeight - (data[i]-Min)*CAverage,3))}
  };
  // iStart
  for(var i = 0;i<data.length;i++){
    if(!Number.isNaN(data[i])){iStart = i;break;}
  };
  // console.log("lineData",lineData,"Min",Min,"CAverage",CAverage,"iStart",iStart)
  Ctx.lineWidth = 2;
  Ctx.strokeStyle = color;//#FF5C5C
  // console.log("Ctx",Ctx)
  Ctx.beginPath();
  Ctx.moveTo(drawGap+iStart*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
  for(var i = iStart;i<lineData.length;i++){
    Ctx.lineTo(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
  };Ctx.stroke();
}
function drawStickToCTX(data,Ctx,CtxHeight,CAverage,colors,times,width,offset){
  // heighted
  var stickData = 0
  var iStart = 0
  // for(var i = 0;i<data.length;i++){
  //   if(Number.isNaN(data[i])){stickData.push(NaN)}
  //   else{stickData.push(Num_round((CtxHeight - (data[i]-Min)*CAverage),3))}
  // };
  // iStart
  for(var i = 0;i<data.length;i++){
    if(!Number.isNaN(data[i])){iStart = i;break;}
  };
  // console.log("stickData",stickData,"Min",Min,"CAverage",CAverage,"iStart",iStart)
  // console.log("colors",colors)
  for(var i = iStart;i<data.length;i++){
    stickData = data[i]
    // color
    if(stickData>0){Ctx.fillStyle = colors[2]}
    else if(stickData==0){Ctx.fillStyle = colors[1]}
    else{Ctx.fillStyle = colors[0]}    
    stickData = Math.abs(Num_round(((data[i])*CAverage*times),3))
    // console.log("stickData",stickData)
    // ++++
    // +++-
    // ++--
    // +---
    // ----
    Ctx.fillRect(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2-width/2+offset,CtxHeight-stickData, width,stickData);

  }
}

/**
 * 在 canvas 上写字
 * @param {HTMLCanvasElement|string} target   - canvas 元素或其 id
 * @param {string}  text                      - 要写的文字
 * @param {number}  x                         - 起始 x
 * @param {number}  y                         - 起始 y
 * @param {object}  [opts]                    - 可选配置
 * @param {string}  [opts.font='16px Arial']  - 字体
 * @param {string}  [opts.color='#000']       - 填充色
 * @param {boolean} [opts.stroke=false]       - true = 描边，false = 实心
 * @param {string}  [opts.align='left']       - 水平对齐 left|center|right
 * @param {string}  [opts.baseline='top']     - 垂直基线 top|middle|bottom
 * @param {number}  [opts.maxWidth]           - 最大宽度（自动压缩）
 *  // 1. 简单用法
    drawText('myCanvas', 'Hello Canvas', 20, 30);

    // 2. 居中 + 描边 + 限制最大宽度
    drawText('myCanvas', 'Center Stroke Text', 200, 100, {
      font: 'bold 24px serif',
      color: '#007acc',
      stroke: true,
      align: 'center',
      baseline: 'middle',
      maxWidth: 180
    });
 */
function drawText(ctx, text, x, y, opts = {}) {
  // const canvas = typeof target === 'string' ? document.getElementById(target) : target;
  // const ctx = canvas.getContext('2d');
  // 默认配置
  const {
    font = '16px Arial',
    color = '#000',
    stroke = false,
    align = 'left',
    baseline = 'top',
    maxWidth = undefined
  } = opts;
  // 保存现场
  ctx.save();
  // 设置属性
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  // 绘制
  if (stroke) {
    ctx.strokeText(text, x, y, maxWidth);
  } else {
    ctx.fillText(text, x, y, maxWidth);
  }
  // 恢复现场
  ctx.restore();
}

// draw clear Chart
function clearChart(ctx){
  CrossInfo.innerHTML = ""
  ctx.fillRect(0,0,MainchartWidth,MainchartHeight)
}
//十字标
// draw cross Lines line_____FUNCTION
function crossLines(x,y){
  // MASKcanvas.height = MaskchartHeight
  // MASKcanvas.width = MainchartWidth
  MASKctx.clearRect(0,0,MASKcanvas.width,MASKcanvas.height)
  MASKctx.beginPath()
  MASKctx.strokeRect = "#000000"
  MASKctx.strokeStyle = "#FFFFFF"
  MASKctx.lineWidth = 1
  MASKctx.moveTo(x,0)
  MASKctx.lineTo(x,MASKcanvas.height)
  MASKctx.moveTo(0,y)
  MASKctx.lineTo(MASKcanvas.width,y)
  MASKctx.stroke()
  temp = Math.floor((x-(1*drawGap))/(drawGap + chartItemWidth))
  if(crossIdx!=temp && temp>=0 && responseLocal.length!=0 && temp<VisibleData[1].length){
    crossIdx = temp 
    // console.log(crossIdx,VisibleData[1][crossIdx])
    crossInfo(crossIdx)
    // }else{
    //   crossIdx = -1
    // }
  }
}
// draw K image_____FUNCTION  fixed
//open,close,high,low
//0      1    2   3
function drawK(ctx,Data,offsetx,offsety,kheight){
  // color
  color = (function(){
    // if(Data[1]>Data[0])return "#00FFFF"
    // else if(Data[1]<Data[0])return "#FF5C5C"
    if(Data[1]>Data[0])return "red"
    else if(Data[1]<Data[0])return "green"
    else return "white"
  })()

  var YData = []

  if(Data[2] == Data[3]){
    YData[0] = kheight/2
    YData[1] = YData[0] 
    YData[2] = YData[0] 
    YData[3] = YData[0] 
  }else{
    var av = kheight/(Data[2]-Data[3])
    YData[0] = kheight-av*(Data[0]-Data[3])+offsety
    YData[1] = kheight-av*(Data[1]-Data[3])+offsety
    YData[2] = 0+offsety
    YData[3] = kheight+offsety
  }
  ctx.fillStyle = color
  ctx.strokeStyle = color
  ctx.lineWidth = 6;
  // MAINctx.globalAlpha = 1;  // 确保透明度为1
  // MAINctx.globalCompositeOperation = 'source-over';  // 默认混合模式
  temp1 = 0
  temp2 = 1
  if (YData[1]<YData[0]){temp1 = 1;temp2 = 0}
  ctx.beginPath();
  ctx.moveTo(offsetx+SimChartItemWidth, YData[2]); // 从最高价
  ctx.lineTo(offsetx+SimChartItemWidth, YData[temp1]);
  ctx.moveTo(offsetx+SimChartItemWidth, YData[temp2]);
  ctx.lineTo(offsetx+SimChartItemWidth, YData[3]);  // 到最低价
  ctx.moveTo(offsetx+SimChartItemWidth, 0); // 从最高价
  ctx.stroke();  

  if(YData[1]>YData[0]){
    ctx.fillRect(offsetx, YData[0], chartItemWidth, YData[1]-YData[0]);
  }else if(YData[1]<YData[0]){
    ctx.strokeRect(offsetx, YData[0], chartItemWidth, YData[1]-YData[0]);
  }else{
    ctx.strokeRect(offsetx, YData[0], chartItemWidth, YData[1]-YData[0]);
  }

  ctx.beginPath();
  ctx.moveTo(offsetx-SimChartItemWidth, YData[2]); // 从最高价
  // ctx.lineTo(offsetx-SimChartItemWidth, YData[3]/Math.abs(numCLValueArray[15]));
  ctx.lineTo(offsetx-SimChartItemWidth, YData[3]/Math.abs(numCLValueArray[14]));

  // ctx.moveTo(offsetx+SimChartItemWidth, YData[temp2]);
  // ctx.lineTo(offsetx+SimChartItemWidth, YData[3]);  // 到最低价
  // ctx.moveTo(offsetx+SimChartItemWidth, 0); // 从最高价
  ctx.stroke();  
    {
  var innerHTMLText = ""
  if (numCLValueArray[14] > 0) {
    innerHTMLText += '<span style="color: #FF2222;">';
  } else   if (numCLValueArray[14] < 0) {
    innerHTMLText += '<span style="color: rgb(41, 158, 12);">';
  } else {
    innerHTMLText += '<span style="color: grey;">';
  }
  innerHTMLText += "涨跌："+ numCLValueArray[14] + "%"

  innerHTMLText += '<span style="color: grey;">';
  innerHTMLText += "   振幅："+ numCLValueArray[15] +"</span>" + "</div>"

  // if (numCLValueArray[15] > 0) {
  //   innerHTMLText += '<span style="color: #FF2222;">';
  // } else   if (numCLValueArray[15] < 0) {
  //   innerHTMLText += '<span style="color: rgb(41, 158, 12);">';
  // } else {
  //   innerHTMLText += '<span style="color: grey;">';
  // }
  // innerHTMLText += "   变化："+ numCLValueArray[15] + "%"
  // innerHTMLText += "   变化："+ Num_round(((moveLineDatas[moveStep]-moveLineDatas[moveStep-1])/moveLineDatas[moveStep-1]*100),2)+ "%"

  CrossInfo.innerHTML = innerHTMLText
    }
}
// draw arrow
function drawArrow(ctx,Data,offsetx,offsety,kheight){
  // color
  color = (function(){
    // if(Data[1]>Data[0])return "#00FFFF"
    // else if(Data[1]<Data[0])return "#FF5C5C"
    if(duanZhangDie>0 && Data!=10)return "red"
    else if(duanZhangDie<0)return "green"
    else return "white"
  })()

  ctx.fillStyle = color
  ctx.strokeStyle = color
  ctx.lineWidth = 6;

  ctx.beginPath();
  ctx.moveTo(offsetx, offsety); // 
  ctx.lineTo(offsetx, kheight);

  if(Data == 1){
    ctx.moveTo(offsetx, offsety); // 
    ctx.lineTo(offsetx-20, kheight/3);
    ctx.moveTo(offsetx, offsety); // 
    ctx.lineTo(offsetx+20, kheight/3);
  }
  if(Data == -1){
    ctx.moveTo(offsetx, kheight); // 
    ctx.lineTo(offsetx-20, kheight-kheight/5);
    ctx.moveTo(offsetx, kheight); // 
    ctx.lineTo(offsetx+20, kheight-kheight/5);
    ctx.stroke();  
  }
  ctx.stroke();  
}

// drawLines on pointed ctx and give or automatically generate maxmin_____FUNCTION  作废处理
function drawLines(ctx,data,height,width,offset,max=0,min=0,color,background){
  //console.log(max,min,"drawLines data.length,data",data.length,data);
  ctx.height = height
  ctx.width = MainchartWidth
  if(max == 0 && min == 0){
    max = data[0]
    min = data[0]
    for (i = 0; i <= offset; i++) {
      if(data[i]>max){max = data[i]}
      if(data[i]<min){min = data[i]}
    }
  }

  //background
  ctx.beginPath()
  ctx.fillStyle = background
  // MinsLinectx.strokeStyle = "white"
  ctx.rect(0,0,ctx.width,ctx.height)
  ctx.fill()

  //japan K
  drawK(ctx,kdata,MainchartWidth-100,20,MainchartHeight/3);
  drawArrow(MinsLinectx,geuss,MainchartWidth-250,20,MainchartHeight/8)
  //进场

  //CrossInfo.innerHTML = max + "  " + min;  
  ctx.beginPath()
  ctx.lineWidth = 4
  ctx.strokeStyle = "gray"
  // ctx.moveTo(pauseStep*width,0)
  for (var i = 0; i <= MainchartHeight; i+=50) {
    ctx.moveTo(pauseStep*width,i)
    ctx.lineTo(pauseStep*width,i+20)
  }
  ctx.stroke()  

  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = color
  if(max==min){
    //average = 1;
    ctx.moveTo(0,height/2)
    for (i = 0; i <= offset; i++) {
      ctx.lineTo(i*width,height/2)
    }
  }else{
    average = Num_round(height / (max - min),4)
    ctx.moveTo(0,Num_round(height - (data[0]-min)*average,1))
    for (i = 0; i <= offset; i++) {
      ctx.lineTo(i*width,Num_round(height - (data[i]-min)*average,1))
    }
  }
  ctx.stroke()  


  //console.log("drawLines data.length,data",data.length,data);
  

  //CrossInfo.innerHTML = moveStep + "  " + moveLineDatas[moveStep] + "  " + moveStepSeconds;
}

function drawHorizontalLine(level,color,Ctx,width){
    // heighted
    Ctx.lineWidth = 2;
    Ctx.strokeStyle = color;//#FF5C5C
    // console.log("Ctx",Ctx)
    Ctx.beginPath();
    Ctx.moveTo(0,level)
    Ctx.lineTo(width,level)
    Ctx.stroke();
}


}

// ______others____________________________________________________________________________
{
function changeSwitchStyle(ind,target){
  if(Switches[ind] == 1){
    Switches[ind] = 0
    target.style.background = '';
    target.style.color = 'white';
  }else{
    Switches[ind] = 1
    target.style.color = 'black';
    target.style.background = 'white';
  }
  refreshDraw(Switches)
}
function deepCopyArray(arr) {
  // deep copy slice array
  return arr.map(item => {
    if (Array.isArray(item)) {
      return deepCopyArray(item);
    } else if (item && typeof item === 'object') {
      return JSON.parse(JSON.stringify(item));
    } else {
      return item;
    }
  });
}
function handleKdata(arr){
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    var kitem = []
    kitem.push(element[1]) //open
    kitem.push(element[element.length-1]) //close
    kitem.push( Math.max(...element)) //high
    kitem.push( Math.min(...element)) //low
    arr[index] = kitem
  }
  return arr
}
// 起始事件处理
// add Event listener to element    FUNCTION  fixed
// buy and sale listener
document.addEventListener('DOMContentLoaded', function() {
  // trade machine
  // var inputElement1 = document.getElementById('WillBuy');
  // inputElement1.addEventListener('input', onInputChange);
  // inputElement1.addEventListener('click', onInputChange);
  // // class radioCL
  //let radioCL = document.getElementsByClassName("radioCL")
  // 遍历元素集合，为每个元素添加事件监听器
  for (let i = 0; i < radioCL.length; i++) {
    radioCL[i].addEventListener('change', function() {
      if(radioCL[i].checked){
        radioCLValueArray[i] = 1;
      }else{
        radioCLValueArray[i] = 0;
      }
      //console.log(radioCL[i].id, "No.", i,radioCLValueArray,radioCL[i].checked);
    });
  }

  //let numCL = document.getElementsByClassName("numCL")
  for (let i = 0; i < numCL.length; i++) {
    numCL[i].addEventListener('wheel', function(event) {
        // 阻止默认行为，防止页面滚动
        event.preventDefault();
        // 获取当前值
        let currentValue = parseInt(numCL[i].value, 10);
        // 根据滚轮方向调整值
        if (event.deltaY < 0) {
            // 向上滚动，增加值
            currentValue += 1;
        } else {
            // 向下滚动，减少值
            currentValue -= 1;
        }
        // 确保值在 min 和 max 之间
        //currentValue = Math.max(parseInt(numCL[i].min, 10), Math.min(currentValue, parseInt(numCL[i].max, 10)));
        // 更新输入框的值
        console.log("numCL[i].id",numCL[i].id,"No.",i,"numCL[i].value",numCL[i].value,"currentValue",currentValue,"numCL.length",numCL.length);
        
        numCL[i].value = currentValue;
        numCLValueArray[i] = currentValue;
    });
  }
  
});
// run when open    FUNCTION  fixed
window.onload = function() {
  // 监听图标容器变化
  // 选择需要监听的元素
  // const element = document.getElementById('Mainchart');
  // 创建 ResizeObserver 实例
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      console.log(`Width: ${width}, Height: ${height}`);
      MainchartWidth = 2*width;
      MainchartHeight = 2*height;
      MaskchartHeight = MainchartHeight/74*97
      if(responseLocal.length!=0){
        console.log("change window size refreshDraw()");
        reinitVarialsForZoom();
        refreshDraw(Switches)
      }
      windowLength = Math.floor((MainchartWidth-(2*drawGap))/(drawGap + chartItemWidth))
      console.log(`Width: ${width}, Height: ${height}`,"windowLength:",windowLength);
      PrintBASICVariables("init",true)

      moveUnitWidth = MainchartWidth/unitCount
      MASKcanvas.height = MaskchartHeight
      MASKcanvas.width = MainchartWidth
      MinsLinecanvas.height = MainchartHeight
      MinsLinecanvas.width = MainchartWidth
    }
  });
  // 监听该元素
  resizeObserver.observe(Mainchart);
  
  for(var i = 0;i<unitCount;i++){
    moveLineDatas.push(0)
  }
  // 初始化 radioCLValueArray 和 numCLValueArray
  // 遍历元素集合，为每个元素添加事件监听器
  for (let i = 0; i < radioCL.length; i++) {
    if(radioCLValueArray[i] == 1){
      radioCL[i].checked = true;
    }
  } 
  for (let i = 0; i < numCL.length; i++) {
    numCL[i].value = numCLValueArray[i];
  }

  gongFang[1] = numCLValueArray[6]
  gongFang[2] = numCLValueArray[8]
  if(numCLValueArray[7]>numCLValueArray[9]){
    tempBansui.push(numCLValueArray[9])
    tempBansui.push(numCLValueArray[9])    
  }else{
    tempBansui.push(numCLValueArray[7])
    tempBansui.push(numCLValueArray[7])      
  }
}
// draw test    FUNCTION
function drawTest(ctx,canvas,color,x,y,X,Y){
  //ctx.clearRect(0,0,ctx.width,ctx.height)
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.moveTo(X,0)
  ctx.lineTo(X,canvas.height)
  ctx.moveTo(0,Y)
  ctx.lineTo(canvas.width,Y)
  ctx.stroke()
  // ctx.rect(x,y,X,Y)
  // ctx.stroke()
  ctx.rect(x,y,X,Y)
  ctx.fill()
  console.log("drawtest",x,y,X,Y)
}
function drawTestDrict(color,x,y,X,Y){
  MASKctx.beginPath()
  MASKctx.strokeStyle = color
  MASKctx.lineWidth = 1
  MASKctx.moveTo(X,0)
  MASKctx.lineTo(X,MASKcanvas.height)
  MASKctx.moveTo(0,Y)
  MASKctx.lineTo(MASKcanvas.width,Y)
  MASKctx.stroke()
  console.log("drawTestDrict",x,y,X,Y)
}
// console log the conmmon variable    FUNCTION
function InfoOfOffsetX(flag){
  console.log(flag)
  console.log(

    "moveLineDatas",moveLineDatas,"\n",
    "moveStep",moveStep,"\n",
    "moveStepSeconds",moveStepSeconds,"\n",
    )
}
// console log Limi tPosition Variables    FUNCTION
function PrintBASICVariables(info,shortflag=false){
  console.log(info+" start:+++++++++++++++++++++++")
  if(shortflag){
    console.log(
      "duoGLiang",gongFang[1],"\n",
      "kongGliang",gongFang[2],"\n",
      "moveLineDatas",moveLineDatas,"\n",
      "moveStep",moveStep,"\n",
      "radioCLValueArray",radioCLValueArray,"\n",
      "numCLValueArray",numCLValueArray,"\n",
      )
  }else{
    console.log(
      "duoGLiang",gongFang[1],"\n",
      "kongGliang",gongFang[2],"\n",
      "moveStep",moveStep,"\n",
      "radioCLValueArray",radioCLValueArray,"\n",
      "numCLValueArray",numCLValueArray,"\n",
      )
  }
    console.log(info+" end:------------------------")
}
// Num_round_____FUNCTION
function Num_round(num,dgree){
  num = num*(10**dgree)
  num = Math.round(num)
  num = num/(10**dgree)
  return num
}
function SpecialInfo(){
  console.log("SpecialInfo start:+++++++++++++++++++++++")
  console.log("MainchartHeight",MainchartHeight);
  console.log("moveLineDatas",moveLineDatas);
  console.log("涨跌样本",simpleOfZD);
  console.log("SMPLE样本",simple);
  const KKKKdata2 = handleKdata(KKKKdata);
  console.log("KKKKdata样本",KKKKdata);
  // console.log("KKKKdata样本",KKKKdata.pop());
  //console.log("simple",simple,"simple.length",simple.length);
  var ssm = 0;
  for(var i = -numCLValueArray[2];i<=numCLValueArray[2];i++){
    var sum = 0
    for(var j = 0;j<simple.length;j++){
      if(simple[j] == i){
        sum++
      }
    }
    console.log("次数",i,sum,Num_round(sum/simple.length*100,2)+"%");
    ssm += sum;
  }
  console.log("样本容量",simple.length,"验证次数",ssm);
  console.log("负值",negative,"正值",positive,"总和",SumPositiveNegative);
  console.log("盈",win,"亏",loss,"平",ping,"总和",win+loss+ping,"盈利",Num_round(winRate,2),"亏损",Num_round(lossRate,2));
  console.log("盈率",Num_round(win/(win+loss+ping)*100,2)+"%","亏率",Num_round(loss/(win+loss+ping)*100,2)+"%","平率",Num_round(ping/(win+loss+ping)*100,2)+"%");

  sum = 0;
  for(var i = 0;i<simple.length;i++){
    sum += simple[i];
  }

  console.log("simple总和",sum);
  

  // for (let index = 0; index < KKKKdata2.length; index++) {
  //   console.log(KKKKdata2[index]);    
  // }

}

}