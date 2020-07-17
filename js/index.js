var painting = false;
var erasing = false;
var canvas = document.getElementById('paint');
canvas.height = document.querySelector('.canvas').clientHeight;
canvas.width = document.querySelector('.canvas').clientWidth;


var ctx = canvas.getContext('2d');
ctx.lineWidth = $('#slider').val();
ctx.lineCap = "round";
ctx.lineJoin = "round";
var slideValue;
if(localStorage.getItem("imgCanvas") != null){
    var img = new Image();
    img.onload = function(){
    ctx.drawImage(img, 0, 0);
    }
    img.src = localStorage.getItem("imgCanvas");
    };
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
    ctx.beginPath();
    ctx.lineWidth = slideValue;
    var touch = event.touches[0];
    // or taking offset into consideration
    var x = touch.pageX - canvas.offsetLeft;
    var y = touch.pageY - canvas.offsetTop;
    ctx.moveTo(x,y)
    console.log(x+" "+y)
}

function touchmove(event){
    if(painting){
        ctx.strokeStyle = $('#color').val();
        var touch = event.touches[0];
        // or taking offset into consideration
        var x = touch.pageX - canvas.offsetLeft;
        var y = touch.pageY - canvas.offsetTop;
        if(erasing){
            ctx.strokeStyle = '#ffffff';
        }
        ctx.lineTo(x,y)        
    }
    ctx.stroke()
}

function touchup(event){
    painting= false;
}

$("#save").click(function(){
    if(typeof(localStorage) != null){
    localStorage.setItem("imgCanvas",
   canvas.toDataURL());
    }else{
    window.alert("Your browser does not support slocal storage!");
    }
    });

    $("#reset").click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        $(".erase").removeClass("btn-danger");
    });

    function download() {
        var download = document.getElementById("download");
        var image = document.getElementById("paint").toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
        //download.setAttribute("download","archive.png");
        }