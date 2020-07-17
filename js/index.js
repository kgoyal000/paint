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
ctx.lineWidth = $('#slider').val();
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx1.lineWidth = $('#slider').val();
ctx1.lineCap = "round";
ctx1.lineJoin = "round";
var slideValue;
function slider(){
    slideValue = $('#slider').val()
    $('.cursor').css('width',slideValue);
    $('.cursor').css('height',slideValue);
}

function colorChange(){
    $('.cursor').css('background-color',$('#color').val());
}

function erase(){
    $('.erase').toggleClass('btn-danger');
    if($('.erase').hasClass('btn-danger')){
        erasing = true;
    }else{
        erasing = false;
    }
}

function mousedown(event){
    painting= true;
    ctx.lineWidth = slideValue;
    ctx.beginPath();
    var x = event.pageX - canvas.offsetLeft;     // Get the horizontal coordinate
    var y = event.pageY - canvas.offsetTop;     // Get the vertical coordinate
    ctx.moveTo(x,y)
    // console.log(x+" "+y)
}

function mousemove(event){
    if(painting){
        ctx.strokeStyle = $('#color').val();
        var x = event.pageX - canvas.offsetLeft;     // Get the horizontal coordinate
        var y = event.pageY - canvas.offsetTop;  
        ctx.lineTo(x,y)
        if(erasing){
            ctx.strokeStyle = '#ffffff';
        }
        ctx.stroke()
    }
}

function mouseup(event){
    painting= false;
}
function touchdown(event){
    painting= true;
    ctx1.beginPath();
    ctx1.lineWidth = slideValue;
    var touch = event.touches[0];
    // or taking offset into consideration
    var x = touch.pageX - canvasMob.offsetLeft;
    var y = touch.pageY - canvasMob.offsetTop;
    ctx1.moveTo(x,y)
    console.log(x+" "+y)
}

function touchmove(event){
    if(painting){
        ctx1.strokeStyle = $('#color').val();
        var touch = event.touches[0];
        // or taking offset into consideration
        var x = touch.pageX - canvasMob.offsetLeft;
        var y = touch.pageY - canvasMob.offsetTop;
        if(erasing){
            ctx.strokeStyle = '#ffffff';
            ctx1.strokeStyle = '#ffffff';
        }
        ctx1.lineTo(x,y)        
    }
    ctx1.stroke()
}

function touchup(event){
    painting= false;
}