
//HTML elements
let ammountSlide = document.getElementById("numraindropsID");
let speedSlide= document.getElementById("speedID");
let sizeSlide = document.getElementById("rainSizeID");

let windLeft = document.getElementById("switch-left");
let windNo = document.getElementById("switch-no");
let windRight = document.getElementById("switch-right");

//Input values
let numberOfRaindrops = parseInt(ammountSlide.value); //default 100
let raindropSpeed = parseInt(speedSlide.value); // default 2
let raindropSize = parseInt(sizeSlide.value); // default 3
let windDirection = "no";

//var for animation setTimeout
let infinitePositionUpdate;

let currentNumberOfRaindrops = 0;
let raindropDiv;

// Set wind direction
let windHorizontalSpeed;
if (windDirection == "left")
    windHorizontalSpeed = -raindropSpeed;
else if (windDirection == "no")
    windHorizontalSpeed = 0;
else if (windDirection == "right")
    windHorizontalSpeed = raindropSpeed;

//Magnify input speed and size so the user doesnt have to input big values
raindropSpeed = raindropSpeed * 4;
raindropSize = raindropSize * 4;

let counter = 0;
let randomXPositions = [];
let randomYPositions = [];
let randomHorizontalSpeeds = [];
let eventMatrix = [];
let randomWidth;
let color;
let colorArray = ["555555", "888888", "666666", "999999", "777777", "aaaaaa"];
let viewportWidth = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
);
let viewportHeight = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
);
let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
let scrollTop =  window.scrollY || document.documentElement.scrollTop;

window.document.body.style.overflow = 'hidden';

//Create & delete rain drops
function createRainDropDivs(){
    for (let i = currentNumberOfRaindrops; i < numberOfRaindrops; i++) {
        color = colorArray[i % 6];
        raindropDiv = document.createElement('div');
        raindropDiv.className = 'rainDrop';
        raindropDiv.id = 'drop' + i;
        raindropDiv.style.position = 'absolute';
        raindropDiv.style.top = '0';
        raindropDiv.style.left = '0';
        raindropDiv.style.width = '1px';
        raindropDiv.style.height = Math.round(Math.random() * raindropSize) + raindropSize + 'px';
        raindropDiv.style.background = '#' + color;
        raindropDiv.style.fontSize = raindropDiv.style.height;
        raindropDiv.style.visibility = 'hidden';
        document.body.appendChild(raindropDiv);
    }
}
function deleteRainDropDivs(){
    for (let i = currentNumberOfRaindrops; i >= numberOfRaindrops; i--) {
        let divToRemove = document.getElementById("drop"+i);
        if(divToRemove){
            //console.log(i);
            divToRemove.remove();
        }
    }

}

function updateRainDropSize(){
    for(let i=0; i < numberOfRaindrops; i++){
        raindropDiv = document.getElementById("drop"+i);
        raindropDiv.style.height = Math.round(Math.random() * raindropSize) + raindropSize + 'px';
    }
    startAnimation();
}



 //Assign random positions to the raindrops
function giveRandomPositionToDivs(){
    for (let i = currentNumberOfRaindrops; i < numberOfRaindrops; i++) {
        randomXPositions[i] = Math.round(Math.random() * viewportWidth);
        randomYPositions[i] = Math.round(Math.random() * viewportHeight);
        randomHorizontalSpeeds[i] = Math.round(Math.random() * 8) + raindropSpeed;
        eventMatrix[i] = -1;
    }
}

function updateFallSpeed(){
    for(let i = 0; i < numberOfRaindrops; i ++){
        randomHorizontalSpeeds[i] = Math.round(Math.random() * 8) + raindropSpeed;
    }

    if(raindropSpeed>0){
        startAnimation();
    }
}




//This allows us to re-use the same X number of divs instead of having to infinetly create new ones
function raindropAnimation() {
    viewportWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
    );

    viewportHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
    );

    scrollLeft =  window.scrollX || document.documentElement.scrollLeft;
    scrollTop = window.scrollY || document.documentElement.scrollTop;

    counter++;
    counter = (counter > numberOfRaindrops) ? numberOfRaindrops : counter;

    for (let j = 0; j < numberOfRaindrops; j++) {
        randomXPositions[j] += windHorizontalSpeed;
        randomXPositions[j] = (randomXPositions[j] + viewportWidth) % viewportWidth;
        randomYPositions[j] += randomHorizontalSpeeds[j];
        if (randomYPositions[j] >= viewportHeight) {
            if (j < counter)
                eventMatrix[j] = 0;
            else
                eventMatrix[j] = -1;
            randomYPositions[j] = -10;
        }
        if (eventMatrix[j] == 0) {
            const raindropElement = document.getElementById("drop" + j);
            raindropElement.style.left = randomXPositions[j] + scrollLeft + 'px';
            raindropElement.style.top = randomYPositions[j] + scrollTop + 'px';
            raindropElement.style.visibility = 'visible';
        }
    }
}


//TODO Ammount updater!

function uptadeNumberOfDivs(){
    let elements = document.getElementsByClassName('rainDrop');
    currentNumberOfRaindrops= elements.length ;
    //console.log("Old: "+currentNumberOfRaindrops);

    if(numberOfRaindrops>currentNumberOfRaindrops){
        createRainDropDivs();
        giveRandomPositionToDivs();
    }else if (numberOfRaindrops<currentNumberOfRaindrops){
        //console.log("Del");
        deleteRainDropDivs();
    }
    startAnimation();
    }
 



//Show Starter!!!!!
function startAnimation() {
    raindropAnimation();
    infinitePositionUpdate = setTimeout(startAnimation, 20);
}

createRainDropDivs();
giveRandomPositionToDivs();
startAnimation();


window.onresize = () => {
    window.location.reload();
};



//Event Listeners
ammountSlide.addEventListener("change", function(){
    numberOfRaindrops = parseInt(ammountSlide.value);
    clearTimeout(infinitePositionUpdate);
    uptadeNumberOfDivs();
});

speedSlide.addEventListener("change", function(){
    raindropSpeed = parseInt(speedSlide.value) * 4;
    clearTimeout(infinitePositionUpdate);
    updateFallSpeed();
});

sizeSlide.addEventListener("change", function(){
    raindropSize = parseInt(sizeSlide.value) * 4;
    clearTimeout(infinitePositionUpdate);
    updateRainDropSize()
});

//Wind switch event listeners
windLeft.addEventListener("change", function() {
    if(this.checked){
        windDirection = "left";
        clearTimeout(infinitePositionUpdate);
        windHorizontalSpeed = -raindropSpeed;
        startAnimation();
        console.log(windDirection);
    }
});

windNo.addEventListener("change", function() {
    if(this.checked){
        windDirection = "no";
        clearTimeout(infinitePositionUpdate);
        windHorizontalSpeed = 0;
        startAnimation();
        console.log(windDirection);
    }

});

windRight.addEventListener("change", function() {
    if(this.checked){
        windDirection = "right";
        clearTimeout(infinitePositionUpdate);
        windHorizontalSpeed = raindropSpeed;
        startAnimation();
        console.log(windDirection);
    }
});