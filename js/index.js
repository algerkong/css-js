// 获取加载界面div，使其在4秒后隐藏
// function start() {
//     document.getElementById("main-pag").style.display = "none";

// }
// setTimeout(start, 4000);


// 点击图片实现放大效果

// 获取放大图片窗口
var showpags = document.getElementById("showpag");
// 获取所有图片
var imgs = document.getElementsByTagName("img");
// 获取对话框中图片
var showimgs = document.getElementById("show-img");
// 获取图片描述文字
var imgText = document.getElementById("img-alt");
// 上一张
var forwards = document.getElementById("forward");
// 下一张
var nexts = document.getElementById("next");

var count = 0;

// for循环获取所有图片
for (var i = 0; i < imgs.length - 1; i++) {
    imgs[i].onclick = function () {
        count = i;
        showpags.style.display = "block"; // 显示窗口
        showimgs.src = this.src; // 把图片地址附给窗口图片
        showimgs.alt = this.alt; // 把图片描述附给窗口图片
        imgText.innerText = showimgs.alt; // 把图片描述附给描述文字
        // 点击描述文字用新页面打开图片
        imgText.onclick = function () {
            window.open(showimgs.src, "blank");
        }
        forwards.onclick = function () {
            count--;
            if (count < imgs.length) {
                showimgs.src = imgs[count].src;
                showimgs.alt = this.alt; // 把图片描述附给窗口图片
                imgText.innerText = showimgs.alt; // 把图片描述附给描述文字
            }else{
                alert("没有上一张了");
            }
        }
        nexts.onclick = function () {
            count++;
           if(count<imgs.length){
            showimgs.src = imgs[count].src;
            imgText.innerText = showimgs.alt; // 把图片描述附给描述文字
           }else{
            alert("没有下一张了");
        }
        }

        /*不用的旋转 */
        /* var cont=0;
        imgRotate.onclick = function(){
            if(cont == 0){
                showimgs.style.transform = "rotate(90deg)";
                console.log(cont);
                
            }else if(cont == 1){
                showimgs.style.transform = "rotate(180deg)";
                console.log(cont);
                
            }else if(cont == 2){
                showimgs.style.transform = "rotate(270deg)";
                console.log(cont);
            }else if(cont == 3){
                showimgs.style.transform = "rotate(0deg)";
                console.log(cont);
                cont=0;
            }
            cont++;
        } */
    }

}



// 获取关闭按钮
var closes = document.getElementById("close");
closes.onclick = function () {
    showpags.style.display = "none";
}




/******************************************************************
 * 下面是header页面的设置，主要为了达到页面图片分栏切换的效果
 * 
 */

//获取图片分栏
var col = document.getElementById("colimg");
/*获取分栏的按钮 */
var c2 = document.getElementById("col-2");
var c4 = document.getElementById("col-4");
var c6 = document.getElementById("col-6");
var c8 = document.getElementById("col-8");


c2.onclick = function () {
    col.className = "col-2";
}
c4.onclick = function () {
    col.className = "col-4";
}
c6.onclick = function () {
    col.className = "col-6";
}
c8.onclick = function () {
    col.className = "col-8";
}



/*********登录界面的显示与隐藏***********/




var btn = document.getElementById("close-login");
btn.onclick = function () {
    login.style.display = "none";
}
var btn1 = document.getElementById("openLogin");

var btn_open = document.getElementById("load-o");

btn_open.onclick = function () {
    login.style.display = "block";
}









/** *****************终于实现了的拖动旋转图片**************************** */

var scrollBar = document.getElementById("scrollBar");
var bar = scrollBar.children[0];
var mask = scrollBar.children[1];
var demo = document.getElementById("demo");
var imgt = document.getElementById("show-img");


// 拖动原理
bar.onmousedown = function (event) {
    var event = event || window.event;
    var leftVal = event.clientX - this.offsetLeft;
    // 拖动放到down的里面
    var that = this;
    document.onmousemove = function (event) {
        var event = event || window.event;
        that.style.left = event.clientX - leftVal + "px";
        // 限制条件
        var val = parseInt(that.style.left);
        if (val < 0) {
            that.style.left = 0;
        } else if (val > 360) {
            that.style.left = "360px";
        }
        // 移动的距离为遮罩的宽度
        mask.style.width = that.style.left;
        // 图片旋转
        imgt.style.transform = "rotate(" + parseInt(parseInt(that.style.left)) + "deg" + ")";

        // 清除拖动 --- 防止鼠标已经弹起时还在拖动
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }
    // 鼠标抬起停止拖动
    document.onmouseup = function () {
        document.onmousemove = null;
    }
}


//点击动画效果
//感谢CSDN博主「monkeyfly007」
$("#colimg img").bind("click",function(event) {
    // $(this).className='zoomIn';
    $(this).css('animation', 'zoomIn 0.8s');
});
$("span.msg-data").each(function() {
    $(this)[0].addEventListener("animationend",function(){
        $(this).css("animation","");
    });
});


