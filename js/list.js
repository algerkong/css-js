function showImgAlt() {
    var imgs = document.getElementById('#imgl');
    console.log(imgs);
    
    var img_alt = document.getElementById('#img-alt');
console.log(img_alt);

    img_alt.innerText = imgs.alt;
    console.log(img_alt.innerText);
}