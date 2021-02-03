const p = 10;  //starting coordinates of table are (p,p)
var width;  //width of a square - 42 for computer screens, 30 for iphone 11 pro max screens


if (screen.width > 450) {
    screen_width="monitor";
} else if (screen.width <=450) {
    screen_width="iphone pro max";
}        

if (screen_width=="monitor") {
    width = 42; //large monitor screen
    console.log("large screen");
} else if (screen_width=="iphone pro max") {
    width = 30;  //iphone pro max
}
const len = width*11; //width of table, should be 11x the width of a square 


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var mysquares = new Array();

function drawGrid(){
  //var imageObj = new Image();
    //imageObj.onload = function() {
    //context.drawImage(imageObj, 11, 11);
     //}
    //imageObj.src = "images/sb-small2.jpg";

    context.fillStyle = "#FFFFFF";
    context.fillRect(p, p, len, len); //added variables
  
    context.beginPath();
    for (var x = 0; x <= len; x += width) {  //added variable
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, len + p);
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(len + p, 0.5 + x + p);
    }
    context.strokeStyle = "black";
    context.lineWidth = 0.5;
    context.stroke();
}

function fillBoxes()
{    
    const taken_squares = [[2,3,6], [4,7,9], [16,20], [30,40]]; // add correct info here 
    const player_names = ["Fred Jones", "Sally Smith", "Fred Johnson", "Ruth Jackson"];  //add correct info here
    const winning_squares=[2,3,20,30];  //add correct winning squares here
    if (screen_width=="monitor") {
        context.font="11px Arial bold";  // 11px font for full-size monitor screen
        console.log("11px font")
    } else if (screen_width=="iphone pro max") {
        context.font="8px Arial bold";  //8 px font for iphone 11 pro max
        console.log("8px font");
    }
     
    context.textAlign="center";
    for (var i = 0; i < taken_squares.length; i++) {
        var first_last = player_names[i].split(' ');
        var temp_arr = taken_squares[i];
        for (var j = 0; j < temp_arr.length; j++) {
            var a = temp_arr[j]%10;        
            var b = Math.floor((temp_arr[j]/10));
            if (a === 0) {
                a = 10;
                b -= 1;
            }
            context.fillStyle = "lightgrey";  //fill color of boxes with each person's name
            context.fillRect(p + (width*a) + 1, p + (width*b) + (width+1), width-1,width-1); //added variables
            context.fillStyle = "black";  // text font color of player names in squares
            
               
            
            //highlight winning squares in green
            var k = winning_squares.indexOf(temp_arr[j]);
            //context.fillStyle = "white";
            if (k >= 0) {
                context.fillStyle = "lightgreen";
                context.fillRect(p + (width*a) + 1, p + (width*b) + (width+1), width-1, width-1); //added variables
                context.fillStyle = "black";  //font color of player names in winning squares
            }
            //end of winning squares section


            if (first_last[0].length > 8) {
                first_last[0] = first_last[0].substring(0, 8) + "..";
            }
            if (first_last[1].length > 8) {
                first_last[1] = first_last[1].substring(0, 8) + "..";
            }
            
            context.fillText(first_last[0], p + (width*a) + (width/2), p + (width*b) + (width*1.5), width-2); //added variables, original below
            context.fillText(first_last[1], p + (width*a) + (width/2), p + (width*b) + (width*1.75), width-2); //added variables, original below
            //context.fillText(first_last[0], p + (60*a) + 30, p + (60*b) + 90, 58);//
            //context.fillText(first_last[1], p + (60*a) + 30, p + (60*b) + 105, 58);//
        }
    }            
    //context.fillStyle = "#DCDCDC";   //fill color of boxes with numbers 
    
    //fill the one box "shared" between teams with a gradient of both team colors
    var grd;
    grd=context.createLinearGradient(width-1,p+1,p+1,width-1); //added variables for 59,11,11,59
    grd.addColorStop(0,"#FFB81C");  //horizontal team color
    grd.addColorStop(1.0,"#D50808"); //vertical team color
    context.fillStyle=grd;
    context.fillRect(p+1,p+1, width-1, width-1); //added variables for 11,11,59,59
     
        
    for (var x = 0; x < 10; x++) { 
        context.fillStyle="#FFB81C"; //fill color of horizontal boxes with numbers  (Chiefs gold)
        context.fillRect(p + 1 + (width*(x+1)), p + 1, width-1, width-1);  //added variables
        context.fillStyle="#D50808"; //fill color of vertical boxes with numbers (Bucs red)
        context.fillRect(p + 1, p + 1 + (width*(x+1)), width-1, width-1); //added variables
    }    
    //context.fillStyle = "black";   //text color of boxes with numbers, commented this out and added it placeNumbers function
}

// place random numbers from 0-9 in first row of horizontal boxes and vertical boxes
function placeNumbers() {
    var arr1 = [0,4,7,2,8,3,6,1,5,9];
    var arr2 = [3,9,2,7,5,1,8,0,4,6];

    if (screen_width=="monitor") {
        context.font="20px Arial";  // 20px font for full-size monitor screen
    } else if (screen_width=="iphone pro max") {
        context.font="16px Arial";  //16 px font for iphone 11 pro max
    }

    context.textAlign="center";
    context.textBaseline="middle"; 
    context.fillStyle="white";  //font color of numbers (can also do different colors for horizontal and vertical if desired, add these in loop below)
    for (var x = 0; x < 10; x++) { 
     context.fillText(arr1[x], (2/3)*width+3, (5/3)*width+6 + (width*x));  //added variables, original below
     context.fillText(arr2[x], (5/3)*width + 3 + (width*x), (2/3)*width + 6);  //added variables, original below
     //context.fillText(arr1[x], 40, 100 + (60*x));
     //context.fillText(arr2[x], 100 + (60*x), 40);
    }                
}

function drawThickBorders() {
    context.beginPath();
    context.moveTo(0.5 + width + p, p); //added variables
    context.lineTo(0.5 + width + p, len + p); //added variables
    context.moveTo(p, 0.5 + width + p);  //added variables
    context.lineTo(len + p, 0.5 + width + p); //added variables
    context.rect(p, p, len, len); //added variables
    context.strokeStyle = "black";
    context.lineWidth = 1;  //CHANGED FROM 2 to 1
    
    if (screen_width=="monitor") {
        context.lineWidth=2;  // border thickness for full size monitor screen
    } else if (screen_width=="iphone pro max") {
        context.lineWidth=1;  //border thickness for iphone prox max
    }
        
    context.stroke();
}

/* this function is for choosing squares, not using this for this version

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left - 70,
      y: evt.clientY - rect.top - 70
    };
}
*/

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

// Draw the board and its corresponding elements
drawGrid();
console.log('Finished drawGrid');
fillBoxes();
console.log('Finished fillBoxes');
placeNumbers();
console.log('Finished placeNumbers');
drawThickBorders();
console.log('Finished drawThickBorders');


/* functions used for picking squares, removing since not using this functionality
// Mouse listener
canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = mousePos.x + ',' + mousePos.y;
    }, false);

$("#canvas").click(function(e){
    var x = e.pageX-$("#canvas").offset().left - 70;
    var y = e.pageY-$("#canvas").offset().top - 70;
    if (x >= 0 && y >= 0 && x < 600 && y < 600) {
        var a = Math.floor(x/60);
        var b = Math.floor(y/60);
        var p = context.getImageData((60*a) + 101, (60*b) + 81, 1, 1).data;
        var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
        var num = a + (10*b) + 1;
        if (hex == "#ffffff") {
            context.fillStyle = "#7ddeff";
            context.fillRect(74 + (60*a), 74 +(60*b), 53, 53);    
            mysquares.push(num);
        }
        else if (hex == "#7ddeff") {
            context.fillStyle = "#ffffff";
            context.fillRect(74 + (60*a), 74 +(60*b), 53, 53);
            for (var x = 0; x < mysquares.length; x++) {
                if (mysquares[x] == num) {
                    mysquares.splice(x, 1);
                }
            }                    
        }        
    }
}
);

*/