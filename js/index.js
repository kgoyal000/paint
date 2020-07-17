var painting = false;
var erasing = false;
var canvas = document.getElementById('paint');

var ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.lineWidth = 1;
ctx.lineCap = "round";
ctx.lineJoin = "round";
function slider(){
    let slideValue = $('#slider').val()
    $('.cursor').css('width',slideValue);
    $('.cursor').css('height',slideValue);
    ctx.lineWidth = slideValue;
}

function colorChange(){
    $('.cursor').css('background-color',$('#color').val());
    ctx.strokeStyle = $('#color').val();
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
    var x = touch.pageX - canvas.offsetLeft;
    var y = touch.pageY - canvas.offsetTop;
    ctx.moveTo(x,y)
    console.log(x+" "+y)
}

function touchmove(event){
    if(painting){
        var touch = event.touches[0];
        // or taking offset into consideration
        var x = touch.pageX - canvas.offsetLeft;
        var y = touch.pageY - canvas.offsetTop;
        ctx.lineTo(x,y)
    }
    ctx.stroke()

}

function touchup(event){
    painting= false;
}