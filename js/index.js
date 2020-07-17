if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }
  
var painting = false;
var erasing = false;
var canvas = document.getElementById('paint');
var canvasMob = document.getElementById('paint1');
canvas.height = document.querySelector('.canvas').clientHeight;
canvas.width = document.querySelector('.canvas').clientWidth;
canvasMob.height = document.querySelector('.canvas').clientHeight;
canvasMob.width = document.querySelector('.canvas').clientWidth;

var ctx = canvas.getContext('2d');
var ctx1 = canvasMob.getContext('2d');
ctx.beginPath();
ctx.lineWidth = 1;
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx1.beginPath();
ctx1.lineWidth = 1;
ctx1.lineCap = "round";
ctx1.lineJoin = "round";
function slider(){
    let slideValue = $('#slider').val()
    $('.cursor').css('width',slideValue);
    $('.cursor').css('height',slideValue);
    ctx.lineWidth = slideValue;
    ctx1.lineWidth = slideValue;
}

function colorChange(){
    $('.cursor').css('background-color',$('#color').val());
    ctx.strokeStyle = $('#color').val();
    ctx1.strokeStyle = $('#color').val();
}

function erase(){
    erasing = true;
    $('.erase').toggleClass('btn-danger');
}

function mousedown(event){
    painting= true;
    var x = event.clientX - canvas.offsetLeft;     // Get the horizontal coordinate
    var y = event.clientY - canvas.offsetTop;     // Get the vertical coordinate
    ctx.moveTo(x,y)
    // console.log(x+" "+y)
}

function mousemove(event){
    if(painting){
        var x = event.clientX - canvas.offsetLeft;     // Get the horizontal coordinate
        var y = event.clientY - canvas.offsetTop;  
        ctx.lineTo(x,y)
    }
    ctx.stroke()

}

function mouseup(event){
    painting= false;
}

function touchdown(event){
    painting= true;
    var touch = event.touches[0];
    // or taking offset into consideration
    var x = touch.clientX - canvas.offsetLeft;
    var y = touch.clientY - canvas.offsetTop;
    ctx1.moveTo(x,y)
    console.log(x+" "+y)
}

function touchmove(event){
    if(painting){
        var touch = event.touches[0];
        // or taking offset into consideration
        var x = touch.clientX - canvas.offsetLeft;
        var y = touch.clientY - canvas.offsetTop;
        ctx1.lineTo(x,y)
    }
    ctx1.stroke()
}

function touchup(event){
    painting= false;
}