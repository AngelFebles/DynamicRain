let ammountSlide = document.getElementById("numraindropsID");
let speedSlide= document.getElementById("speedID");
let sizeSlide = document.getElementById("rainSizeID");

let windLeft = document.getElementById("switch-left");
let windNo = document.getElementById("switch-no");
let windRight = document.getElementById("switch-right");

//Default rain propreties
let numraindrops= ammountSlide.value;
let speed= speedSlide.value;
let rainsize=sizeSlide.value;
let wind="no";



ammountSlide.addEventListener("change", function(){
    numraindrops = parseInt(ammountSlide.value);
    //console.log(parseInt(numraindrops);

});

speedSlide.addEventListener("change", function(){
    speed = parseInt(speedSlide.value);
    //console.log(speed);
});

sizeSlide.addEventListener("change", function(){
    rainsize = parseInt(sizeSlide.value);
    //console.log(rainsize);
});

//Wind switch event listeners
windLeft.addEventListener("change", function() {
    if(this.checked){
        wind = "left";
        //console.log(wind);

    }
});

windNo.addEventListener("change", function() {
    if(this.checked){
        wind = "no";
        //console.log(wind);
    }

});

windRight.addEventListener("change", function() {
    if(this.checked){
        wind = "right";
        //console.log(wind);
    }
});
