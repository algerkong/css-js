// $(document).ready(function () {
//   $('#main').waterfall();
// });

// 初始页数
let page = 1;
//初始api
let url = 'https://picsum.photos/v2/list?page=' + page + '&limit=100';
// 图片数量
let imgCount = 100;
//主页面
let main = $('#main');
let mainHtml = '';
//图片背景色
let imgColor = ['#f6e58d', '#ffbe76', '#ff7979', '#badc58', '#dff9fb', '#dff9fb', '#f9ca24', '#f0932b', '#6ab04c', '#c7ecee', '#7ed6df', '#686de0', '#e056fd', '#30336b', '#95afc0', '#22a6b3', '#be2edd', '#130f40', '#535c68'];
// 所有图片
let imgs = [];
$(function () {
  
  // 调用加载图片
  imgLoad(url);
  
  setTimeout(function () {
    $('.item>img').css('width', '100%');
  }, 6000);
  
  // 加载图片
  function imgLoad(url) {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'JSON',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          //图片链接
          let imgUrl = data[i].download_url;
          imgs.push(imgUrl);
          let imgAuthor = data[i].author;
          let imgAuthorUrl = data[i].url;
          //图片宽度
          let imgWidth = imgUrl.split('/').slice(5)[0] / 1;
          //图片高度
          // let imgHeight = (imgUrl.split('/').slice(5)[1]).substring(0, (imgUrl.split('/').slice(5)[1]).indexOf('?')) / 1;
          let imgHeight = imgUrl.split('/').slice(5)[1] / 1;
          imgHeight = 319 * imgHeight / imgWidth;
          //图片大小style
          let imgSize = 'style="width:0%; height:' + imgHeight + 'px;"';
          //图片详细信息
          let imgContent = `
            <div class="img-link"><a class="img-blank" href="#">···</a></div>
            <div class="img-content">
              <div class="content-bottom">
                <span class="author">` + imgAuthor + `</span>
                <div class="download" >
                  <div class="download-img" id="download-img"></div>
                </div>
              </div>
            </div> `;
          
          //图片html
          let img = '<img class="img" src="' + imgUrl + '?random=' + i + '"' + imgSize + '>';
          
          //随机背景色
          let itemBackground = imgColor[randomNum(0, imgColor.length - 1)];
          
          //item-page的大小
          let itemSize = 'style="height:' + (imgHeight + 20) + 'px;"';
          //生成html
          mainHtml += '<div class="item-page" ' + itemSize + '><div class="item" style="background-color: ' + itemBackground + '">' + img + imgContent + '</div></div>';
          // main.style.cssText+="height:"+page * 5000 + "px";
          main.height(page * 6250);
        }
        //使用html
        main.html(mainHtml);
        
        //图片点击下载
        btnDown();
        //图片点击放大
        imgClick();
        //图片变暗
        // itemMouse();
        //跳转详情页
        imgJump();
      }
    });
  }
  
  //背景图切换
  let logoBackgroundSwitch = () => setTimeout(() => {
    setInterval(() => {
      let imgUrl = imgs[randomNum(1, 99)];
      $('#banner-img').attr('src',imgUrl);
    }, 5000);
  }, 5000);
  
  logoBackgroundSwitch();
  
  // console.log(imgs);
  
  
  // let urlDetail = 'https://picsum.photos/id/' + id + '/info';
  //搜索图片
  function searchImg(url) {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'JSON',
      success: function (data) {
        // console.log(data);
        let src = data.download_url;
        let width = data.width / 1;
        let height = data.height / 1;
        let imgHeight = 800 * height / width;
        let author = data.author;
        $('#img-pag').height(imgHeight);
        $('#img-alt').text(author);
        $('#img-details').attr('src', src);
      }
    });
  }
  
  // //点击切换下一页
  // $('#btn').click(function () {
  //   //页数
  //   let count = page++;
  //   url = 'https://picsum.photos/v2/list?page=' + count + '&limit=' + imgCount;
  //   //重新加载图片
  //   imgLoad(url);
  // });
  
  //下载图片
  function downloadImage(path, imgName) {
    let _OBJECT_URL;
    let request = new XMLHttpRequest();
    request.addEventListener('readystatechange', function (e) {
      if (request.readyState == 4) {
        _OBJECT_URL = URL.createObjectURL(request.response);
        let $a = $("<a></a>").attr("href", _OBJECT_URL).attr("download", imgName);
        $a[0].click();
      }
    });
    request.responseType = 'blob';
    request.open('GET', path);
    request.send();
  }
  
  // //加载banner图
  // setInterval(function () {
  //   let count = randomNum(1, 100);
  //   let url = 'url("' + imgs[count] + '")';
  //   $('.bannerBack').css('background-image', url);
  //   setTimeout(function () {
  //     $('#banner-page').addClass('.bannerBack');
  //   },2000);
  //
  //   console.log('41');
  // }, 4000);
  //
  
  //随机数
  function randomNum(x, y) {
    return parseInt(Math.random() * (x - y + 1) + y);
  }
  
  
  //滚动加载
  $(document).ready(function () {
    //滚动时加载
    if (page < 5) {
      $(window).scroll(function () {
        //当滚动到最底部以上1像素时，加载新内容
        if ($(document).height() - $(this).scrollTop() - $(this).height() < 1) {
          let count = page++;
          url = 'https://picsum.photos/v2/list?page=' + count + '&limit=' + imgCount;
          //重新加载图片
          imgLoad(url);
        }
      });
    } else {
    
    }
  });
  
  
  //点击下载
  let btnDown = () => {
    $('.download-img').click(function () {
      //路径
      let src = $(this).parent().parent().parent().prev().prev().attr('src');
      //文件名
      let imgName = src.split("random=")[1] / 1 + 1;
      //下载方法
      downloadImage(src, imgName);
    });
  };
  
  // let isImgCLick = false;
  // //图片点击放大
  // let imgClick = () => {
  //   $('img').click(function () {
  //     if(!isImgCLick){
  //        $(this).parent().addClass('item-click');
  //        isImgCLick = true;
  //     }else{
  //       $(this).parent().removeClass('item-click');
  //       isImgCLick = false;
  //     }
  //   })
  // };
  
  //点击跳转到详情页
  let imgJump = () => {
    $('.img-blank').click(function () {
      let href = $(this).parent().prev().attr('src').split('/').slice(4)[0];
      // console.log(href);
      location.href = './test/02.html?' + 'txt=' + href;
    })
  };
  
  //图片点击放大
  // let imgClick = () => {
  //   $('img').click(function (event) {
  //     $(this).parent().toggleClass('item-click');
  //     event.stopPropagation();
  //   })
  // };
  //
  //
  //
  //          let  src = $(this).attr('src');
  //       // let author = $(this).next().next().children('.content-bottom').children('.author').text();
  //       // let link = $(this).next().children('a').attr('href');
  //       // $('#a-img').attr('src',src);
  //       // $('#a-author').text(author);
  //       // $('#a-link').attr('href',link);
  //       // $('#a-item-page ').css('height','500px');
  //图片点击放大
  let imgClick = () => {
    $('img').click(function (event) {
      
      $(this).parent().toggleClass('item-click');
      event.stopPropagation();
    })
  };
  $(document).click(() => {
    $('.item').removeClass('item-click');
  });
  
  
  //回车和点击搜索图片
  $('#search').bind('keypress', function (event) {
    if (event.keyCode == "13") {
      $('#on-search').click();
    }
  });
  
  $('#on-search').click(function () {
    let val = $('#search').val();
    if (val != '') {
      location.href = '02.html?' + 'txt=' + val;
    }
  });
  
  
  //鼠标进入移出图片变暗
  let itemMouse = () => {
    $('.item').mouseenter(function () {
      $(this).children('img').addClass('img-dark');
      $(this).children('.img-link').addClass('block');
      $(this).children('.img-content').children('.content-bottom').css('display', 'block');
      
    }).mouseleave(function () {
      $(this).children('img').removeClass('img-dark');
      $(this).children('.img-link').removeClass('block');
      $(this).children('.img-content').children('.content-bottom').css('display', 'none');
    });
  };
});






