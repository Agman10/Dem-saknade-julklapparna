var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const AMOUNT_OF_GIFTS = 30; //persenter man ska samla


class Item{
    constructor(url, x, y){
        this.sprites = new Object();
        this.importSprite(url, "default");
        this.currentSprite = this.getSprite("default");
        this.x = x
        this.y = y
        this.width = this.currentSprite.width;
        this.height = this.currentSprite.height;
        
    }
    render(){
        ctx.drawImage(this.currentSprite, this.x, this.y);
    }
    importSprite(path, name){
        var sprite = new Image;
        sprite.src = path;
        this.sprites[name] = sprite;
    }

    getSprite(name){
        for(var sprite in this.sprites){
            if(name == sprite){
                return this.sprites[sprite];
            }
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    //när man går så läggs x eller y positionen till
    move(x, y){
        this.x+=x;
        this.y+=y;
    }

}

//collision
function collision(obj1, obj2){

    if (obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
       obj1.y < obj2.y + obj2.height &&
       obj1.height + obj1.y > obj2.y) {
         return true;
    }
    return false;
    }

//rita ut player sprites
//var player_left = new Item("sprites/player_left.png", 100, 100);
var player = new Item("sprites/player_down.png", 100, 100);
    player.importSprite("sprites/player_left.png", "left");
    player.importSprite("sprites/player_right.png", "right");
    player.importSprite("sprites/player_up.png", "up");
    

var gifts = new Array();

var score = 0;

var timer = 25;
    
var background = new Item("sprites/background.png", 0, 0);

var success = new Item("sprites/success.png", 0, 0); //skriv ut success på skärmen när man vinner

var failure = new Item("sprites/failure.png", 0, 0); //skriv fail

var gamerunning = true;

setInterval(() => {timer-- }, 1000)

startGame()
function startGame(){

    player.setPosition(genrateRandomPos().x, genrateRandomPos().y)

    for(var i = 0; i < AMOUNT_OF_GIFTS; i++){
        gifts.push(new Item("sprites/gift.png", genrateRandomPos().x, genrateRandomPos().y))
        

    }
    //genererar slummessig position
    function genrateRandomPos(){
        return{
            x: Math.floor(Math.random() * (canvas.width-60)),
            y: Math.floor(Math.random() * (canvas.height-60))
        }
    }
}


function render(){

    //logic
    for(var i = 0; i < gifts.length; i++) {
        if(collision(player, gifts[i])){
            console.log("picked up!")
            gifts.splice(i, 1);
            score++;

        }
    }        
    
    //går genom piltangenterna
    //när player.move går vämnster eller höger så blir det (1.5, 0) eller (-1.5, 0) eftersom (x, y) den går x position
    if (keysDown[39]){
        player.move(1.5, 0)
        player.currentSprite = player.getSprite("right");
    }
    if (keysDown[37]) {
        player.move(-1.5, 0)
        player.currentSprite = player.getSprite("left");
    }
    if (keysDown[40]) {
        player.move(0, 1.5)
        player.currentSprite = player.getSprite("default");
    }
    if (keysDown[38]){
        player.move(0, -1.5)
        player.currentSprite = player.getSprite("up");
    }


    
    
    //draw
    ctx.fillStyle="black"
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    

    background.render()
    
    for(var i = 0; i < gifts.length; i++){
        gifts[i].render()
        
    }

    ctx.font = "20px Arial";

    ctx.fillText("score: " + score, 10, 20);

    ctx.fillText("timer: " + timer, 550, 20);
    

    player.render()

    if (score == AMOUNT_OF_GIFTS){
        success.render()
    } else if (timer < 1) {
        failure.render()
    }

    requestAnimationFrame(render);
    
}

var keysDown = []

document.addEventListener("keydown", event => {
    console.log(event.keyCode)
    keysDown[event.keyCode] = true;
})

document.addEventListener("keyup", event => {
    keysDown[event.keyCode] = false;
})





render();