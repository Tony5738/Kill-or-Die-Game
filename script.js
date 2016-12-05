var canvas;
var canvasContext;

//Pictures
var SMLeft = new Image();
SMLeft.src = "img/static_stickman_left.png";
var widthSMLeft = SMLeft.naturalWidth;
var heightSMLeft = SMLeft.naturalHeight; 

var SMRight = new Image();
SMRight.src = "img/static_stickman_right.png";
var widthSMRight = SMRight.naturalWidth;
var heightSMRight = SMRight.naturalHeight;

var SMDeadRight = new Image();
SMDeadRight.src = "img/dead_stickman_right.png";
var widthSMDeadRight = SMDeadRight.naturalWidth;
var heightSMDeadRight = SMDeadRight.naturalHeight;

var SMDeadLeft = new Image();
SMDeadLeft.src = "img/dead_stickman_left.png";
var widthSMDeadLeft = SMDeadLeft.naturalWidth;
var heightSMDeadLeft = SMDeadLeft.naturalHeight;

var BulletRight = new Image();
BulletRight.src = "img/bullet_right.png";
var widthBulletRight = BulletRight.naturalWidth;
var heightBulletRight = BulletRight.naturalHeight;

var BulletLeft = new Image();
BulletLeft.src = "img/bullet_left.png";
var widthBulletLeft= BulletLeft.naturalWidth;
var heightBulletLeft = BulletLeft.naturalHeight;

var GameTitle = new Image();
GameTitle.src = "img/game_title.png";
var widthGameTitle = GameTitle.naturalWidth;
var heightGameTitle = GameTitle.naturalHeight;

var SMDownLeft = new Image();
SMDownLeft.src = "img/static_stickman_down_left.png"
var widthSMDownLeft = SMDownLeft.naturalWidth;
var heightSMDownLeft = SMDownLeft.naturalHeight;

var SMDownRight = new Image();
SMDownRight.src = "img/static_stickman_down_right.png"
var widthSMDownRight = SMDownRight.naturalWidth;
var heightSMDownRight = SMDownRight.naturalHeight;



//jumpAudio
var jumpAudio = new Audio("sound/jump.mp3");
var jumpAudioIsPlayedOnce;

//gunshotAudioP1
var gunshotAudioP1 = new Audio("sound/gunshot.mp3");
var gunshotAudioP1IsPlayedOnce;

//gunshotAudioP2
var gunshotAudioP2 = new Audio("sound/gunshot.mp3");
var gunshotAudioP2IsPlayedOnce;

//deathAudio
var deathAudio = new Audio("sound/pain.mp3");
var deathAudioIsPlayedOnce = false;

//fallAudio
var fallAudio = new Audio("sound/fall.mp3");
var fallAudioIsPlayedOnce = false;

//cheerAudio
var cheerAudio = new Audio("sound/cheer.mp3");
var cheerAudioIsPlayedOnce = false;


//stickman variables
var stickMan1;
var stickMan2;

//bullet shoot variables
var shootingP1 = false;
var shootingP2 = false;
var shootBtnIsActiveP1 = true;
var shootBtnIsActiveP2 = true;

//jumping variables
var jumpingP1 = false;
var jumpingP2 = false;
const GRAVITY = 9.81;
const SM_LEGS_FORCE = -50;


//bullet variables
var bulletP1
var bulletP2
const BULLET_SPEED = 40;

//score variables
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 10;

//command detection
var map = {};

//round done
var roundIsDone = false;

//winScreen
var showingWinScreen = false;

//startScreen
var showingStartScreen = true;



window.addEventListener('load', function () {

    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');  
	
	drawStartGameScreen();

    stickMan1 = Object.create(StickMan);
    stickMan1.init((canvas.width-widthSMLeft/2)*(1/4),canvas.height-heightSMLeft ,1,'Player 1 ', SMLeft,widthSMLeft,heightSMLeft);

    stickMan2 = Object.create(StickMan);
    stickMan2.init((canvas.width-widthSMRight/2)*(3/4),canvas.height-heightSMRight,2,'Player 2 ',SMRight,widthSMRight,heightSMRight);

    bulletP1 = Object.create(Bullet);
    bulletP2 = Object.create(Bullet);


    framesPerSecond = 15;
    setInterval(function () {

        if(!showingStartScreen)
        {

            canvasContext.clearRect(0, 0, canvas.width, canvas.height);

            if(showingWinScreen)
            {
                drawShowingWinScreen();
            }
            else
            {
                 //draw stickman objects
                stickMan1.drawPicture(stickMan1.img);
                stickMan1.drawName(stickMan1.name);
                stickMan2.drawPicture(stickMan2.img);
                stickMan2.drawName(stickMan2.name);

                //score
                displayScore();
            }
           
            //jump
            if(jumpingP1){
               
                stickMan1.jump();
            }

            if(jumpingP2){
               
                stickMan2.jump();
            }

            //improve
            //shoot
            if(shootingP1)
            { 
                shootBtnIsActiveP1 = false;
                bulletP1.drawPicture(bulletP1.img);
                bulletP1.move();
                bulletP1.touch();
            }

            if(shootingP2)
            {
                shootBtnIsActiveP2 = false;
                bulletP2.drawPicture(bulletP2.img);
                bulletP2.move();
                bulletP2.touch();
            }

            if(roundIsDone)
            {
                displayTransitionSentence();
            }

        }

    }, 1000/framesPerSecond);

       
    

    window.addEventListener("keydown", checkCommand); 
    window.addEventListener("keyup",checkCommand);
    window.addEventListener("mousedown",checkCommand); 
	
    
});


function displayScore()
{
    canvasContext.fillText("Player 1: " + player1Score, 100,100);
    canvasContext.fillText("Player 2: " + player2Score, canvas.width - 150,100);
}

function drawStartGameScreen()
{
	canvasContext.drawImage(GameTitle, canvas.width/2-widthGameTitle/2,canvas.height/2-100);
	
    canvasContext.fillStyle = "black";
    canvasContext.fillText("CLICK TO START", canvas.width/2-(canvasContext.measureText("CLICK TO START").width/2),canvas.height/2+100);
}

function displayTransitionSentence()
{
    canvasContext.fillStyle = "black";
    canvasContext.fillText("CLICK TO CONTINUE", canvas.width/2-(canvasContext.measureText("CLICK TO CONTINUE").width/2),canvas.height/2-100);
}

function drawShowingWinScreen()
{

    if(!cheerAudioIsPlayedOnce)
    {
        cheerAudio.play();
        cheerAudioIsPlayedOnce = true;
    }

    if(player1Score >= WINNING_SCORE)
    {
        canvasContext.fillStyle = "black";
        canvasContext.fillText("PLAYER 1 WINS: CLICK TO CONTINUE", canvas.width/2-(canvasContext.measureText("PLAYER 1 WINS: CLICK TO CONTINUE").width/2),canvas.height/2-100);
        stickMan1.drawPicture(stickMan1.img);
        stickMan1.drawName(stickMan1.name);
    }
    else if (player2Score >= WINNING_SCORE)
    {
        
        canvasContext.fillStyle = "black";
        canvasContext.fillText("PLAYER 2 WINS: CLICK TO CONTINUE", canvas.width/2-(canvasContext.measureText("PLAYER 2 WINS: CLICK TO CONTINUE").width/2),canvas.height/2-100);
        stickMan2.drawPicture(stickMan2.img);
        stickMan2.drawName(stickMan2.name);
    }   
}

function resetGame(){

    stickMan1.init((canvas.width-widthSMLeft/2)*(1/4),canvas.height-heightSMLeft ,1,'Player 1 ', SMLeft,widthSMLeft,heightSMLeft);
    stickMan2.init((canvas.width-widthSMRight/2)*(3/4),canvas.height-heightSMRight,2,'Player 2 ',SMRight,widthSMRight,heightSMRight);

    shootingP1 = false;
    shootingP2 = false;
    shootBtnIsActiveP1 = true;
    shootBtnIsActiveP2 = true;
    jumpingP1 = false;
    jumpingP2 = false;
    map = {};
    deathAudioIsPlayedOnce = false;
    fallAudioIsPlayedOnce = false;


    if(showingWinScreen)
    {
        player1Score = 0;
        player2Score = 0;
        cheerAudioIsPlayedOnce = false; 
    }
    

    roundIsDone = false;
    showingWinScreen = false;




}

function checkCommand(evt){
    
	if(!roundIsDone && !showingWinScreen && !showingStartScreen)
    {
        key = evt.keyCode;

        map[evt.keyCode] = evt.type == 'keyup';
        map[evt.keyCode] = evt.type == 'keydown';


       // console.log(map);


        //key down in the same time
        //e + up arrow
        if(map[69] && map[38])
        {
            console.log("Players jump");
       

            if(stickMan1.y+stickMan1.height == canvas.height)
            {
                stickMan1.jumpSpeed = SM_LEGS_FORCE;
                jumpingP1 = true; 
                jumpAudioIsPlayedOnce = false; 
            }

            if(stickMan2.y+stickMan2.height == canvas.height)
            {
                stickMan2.jumpSpeed = SM_LEGS_FORCE;
                jumpingP2 = true;
                jumpAudioIsPlayedOnce = false; 
            }
        }
        //s + left arrow
        else if(map[83] && map[37])
        {
            console.log("Players go left");
            stickMan1.goLeft();
            stickMan2.goLeft();
        }
        //f + right arrow
        else if(map[70] && map[39])
        {
            console.log("Players go right");
            stickMan1.goRight();
            stickMan2.goRight();
        }
        //d + down arrow
        else if(map[68] && map[40])
        {
            console.log("Players go down");
            stickMan1.goDown();
            stickMan2.goDown();
            
        }
        //s + right arrow
        else if(map[83] && map[39])
        {

            console.log("Player 1 go left, Player 2 go right");
            stickMan1.goLeft();
            stickMan2.goRight();
        }
        //f + left arrow
        else if(map[70] && map[37])
        {
            console.log("Player 1 go right, Player 2 go left");
            stickMan1.goRight();
            stickMan2.goLeft();
        }
        //e
        else if(key == 69)
        {
            console.log("Player 1 jumps");

            //if I am in the firm ground
            //console.log(stickMan1.y+stickMan1.height == canvas.height);
            if(stickMan1.y+stickMan1.height == canvas.height)
            {

                stickMan1.jumpSpeed = SM_LEGS_FORCE;
                jumpingP1 = true;
                jumpAudioIsPlayedOnce = false; 
            }
            
        }

        //s
        else if (key == 83)
        {
            console.log("Player 1 goes left");
            stickMan1.goLeft();
        }
        //d
        else if (key == 68)
        {
            console.log("Player 1 goes down");
            stickMan1.goDown();
        }
        //f
        else if (key == 70)
        {
            console.log("Player 1 goes right");
            stickMan1.goRight();
        }
        //space
        else if (key == 32)
        {
            console.log("Player 1 shoots");
            if(shootBtnIsActiveP1)
            {
                stickMan1.shoot(bulletP1);
                shootingP1 = true;
                console.log("Active");
                gunshotAudioP1IsPlayedOnce = false;
            }
            else
            {
                console.log("Inactive");
            }
           
        }
        //up arrow
        else if (key == 38)
        {
            console.log("Player 2 jumps");

             //if I am in the firm ground
            
            if(stickMan2.y+stickMan2.height == canvas.height)
            {
                stickMan2.jumpSpeed = SM_LEGS_FORCE;
                jumpingP2 = true;
                jumpAudioIsPlayedOnce = false;
                 
            }
        }
        //left arrow
        else if (key == 37)
        {
            console.log("Player 2 goes left");
            stickMan2.goLeft();
        }
        //right arrow
        else if (key == 39)
        {
            console.log("Player 2 goes right");
            stickMan2.goRight();
        }
        //down arrow
        else if (key == 40)
        {
            console.log("Player 2 goes down");
            stickMan2.goDown();
        }
        //0
        else if (key == 96)
        {
            console.log("Player 2 shoots");
            if(shootBtnIsActiveP2)
            {
                stickMan2.shoot(bulletP2);
                shootingP2 = true;
                console.log("Active");
                gunshotAudioP2IsPlayedOnce = false;
            }
            else{
                console.log("Inactive"); 
            }
        } 
    }
    else
    {
        if(evt.type == "mousedown")
        {
            console.log("click");
            if(showingStartScreen)
            {
                showingStartScreen = false;
            }
            else
            {
                resetGame();
            }
            
        }
        
    }
	
}
 

var StickMan = {

    
	xSpeed:15,
    jumpSpeed:0,
 
	
    // initialize the stickMan
    init: function (x, y,numPlayer,name,img, width, height) {
        this.x = x;
        this.y = y;
        this.numPlayer = numPlayer;
        this.name = name;
        this.img = img;
        this.width = width;
        this.height = height;
        
		this.drawPicture(this.img);
		this.drawName(this.name);
    },

    // load picture
    drawPicture: function (img) {
       
	    //console.log(this.x);
        //console.log(widthSMLeft + ',' + heightSMLeft);
        //console.log(widthSMRight + ',' + heightSMRight);

	    canvasContext.drawImage(img, this.x,this.y);
    },

    drawName:function(name){
    	canvasContext.fillStyle = 'black';
    	canvasContext.fillText(name,this.x,this.y-10); 
    },

    goLeft:function(){
        this.img = SMRight;
        this.width = widthSMRight;
        this.height = heightSMRight;
        this.y = canvas.height-this.height;
        
        this.x -= this.xSpeed;
        if(this.x < 0-this.width)
        {
            this.x= canvas.width;
        }
    },

    goRight:function(){
        
        this.img = SMLeft;
        this.width = widthSMLeft;
        this.height = heightSMLeft;
        this.y = canvas.height-this.height;
        
        this.x += this.xSpeed;
                
        if(this.x > canvas.width)
        {
            this.x = 0-this.width;
        }
    },

    goDown:function(){
        if(this.img == SMLeft){

            this.img = SMDownLeft;
            this.width = widthSMDownLeft;
            this.height = heightSMDownLeft;
            this.y = canvas.height-this.height;


        }else if(this.img == SMRight)
        {
            this.img = SMDownRight;
            this.width = widthSMDownRight;
            this.height = heightSMDownRight;
            this.y = canvas.height-this.height;
        }
    },

    shoot:function(bullet){
        if(this.img == SMLeft)
        {
            
            bullet.init(this.numPlayer,this.x+this.width, this.y+(this.height*(2*1/7)),'r',BulletLeft,widthBulletLeft,heightBulletLeft);
        }
        else if(this.img == SMRight)
        {
            
            bullet.init(this.numPlayer,this.x, this.y+(this.height*(2*1/7)),'l',BulletRight,widthBulletRight,heightBulletRight);
        }

        if(this.numPlayer == 1)
        {
            if(!gunshotAudioP1IsPlayedOnce)
            {
                gunshotAudioP1.play();
                gunshotAudioP1IsPlayedOnce = true;
            }
        }else if(this.numPlayer == 2)
        {
             if(!gunshotAudioP2IsPlayedOnce)
            {
                gunshotAudioP2.play();
                gunshotAudioP2IsPlayedOnce = true;
            }
        }
        
    },

    //improve
    jump:function(){


        if(!jumpAudioIsPlayedOnce)
        {   
            jumpAudio.play();
            jumpAudioIsPlayedOnce = true;
        }
        //console.log("jumpSpeed "+this.jumpSpeed);
        //console.log("y "+this.y);
        this.jumpSpeed += GRAVITY;
        this.y += this.jumpSpeed;


        if(this.y > canvas.height - this.height)
        {

            console.log("ground");
            this.y = canvas.height - this.height
            this.jumpSpeed = 0;

            if(this.numPlayer == 1)
            {
               
                jumpingP1 = false;
                
            }
            else if(this.numPlayer == 2)
            {
               
                jumpingP2 = false;
                
            }    
        }
    } 
};



var Bullet = {

    init:function(num,x,y, dir, img, width, height){
        this.x = x;
        this.y = y;
        this.direction = dir;
        this.width = width;
        this.height = height;
        this.img = img;
        this.numBullet = num;

        this.drawPicture(this.img);
    },

    drawPicture: function (img) {
       
        //console.log(this.x);
        console.log(widthBulletLeft + ',' + heightBulletLeft);
        console.log(widthBulletRight + ',' + heightBulletRight);
      
        canvasContext.drawImage(img, this.x,this.y);

        
    },

    move:function(){

        if(!roundIsDone)
        {
           

            if (this.direction == 'r' && this.x < canvas.width)
            {
                //console.log(this.x);
                this.x += BULLET_SPEED;
               
            }
            else if (this.direction =='l' && this.x>0)
            {
                //console.log(this.x);
                this.x -= BULLET_SPEED;
            }
            else{
                if(this.numBullet == 1)
                {
                    shootingP1 = false;
                    shootBtnIsActiveP1 = true;
                }
                else if(this.numBullet == 2)
                {
                    shootingP2 = false;
                    shootBtnIsActiveP2 = true;
                }
            }
        }
       
    },

    touch:function(){

      
        if(this.x < stickMan2.x + stickMan2.width && 
            this.x > stickMan2.x &&
            this.y > stickMan2.y &&
            this.y < stickMan2.y + stickMan2.height)
        {

            console.log("player 2 dead");

            player1Score++;

            if(!fallAudioIsPlayedOnce)
            {
                fallAudio.play();
                fallAudioIsPlayedOnce = true;
            }


            if(this.img == BulletLeft)
            {
                stickMan2.y = canvas.height-heightSMDeadRight;
                stickMan2.img = SMDeadRight;
                
            }
            else if(this.img == BulletRight)
            {
                stickMan2.y = canvas.height-heightSMDeadLeft;
                stickMan2.img = SMDeadLeft;
                
            }
            //In the case, where the player is killed in the air
            jumpingP2 = false;
            
            if(!deathAudioIsPlayedOnce)
            {
                deathAudio.play();
                deathAudioIsPlayedOnce = true;
            }

            if (player2Score >= WINNING_SCORE || player1Score >= WINNING_SCORE)
            {
                showingWinScreen = true;

            }
            else
            {
                roundIsDone = true;
            }
                    
        }
        else if(this.x < stickMan1.x + stickMan1.width && 
            this.x > stickMan1.x &&
            this.y > stickMan1.y &&
            this.y < stickMan1.y + stickMan1.height)
        {
            console.log("player 1 dead");

            player2Score++;

            if(!fallAudioIsPlayedOnce)
            {
                fallAudio.play();
                fallAudioIsPlayedOnce = true;
            }

           if(this.img == BulletLeft)
            {
                stickMan1.y = canvas.height-heightSMDeadRight;
                stickMan1.img = SMDeadRight;
                
            }
            else if(this.img == BulletRight)
            {
                stickMan1.y = canvas.height-heightSMDeadLeft;
                stickMan1.img = SMDeadLeft;
                
            }
            //In the case, where the player is killed in the air
            jumpingP1 = false;

            if(!deathAudioIsPlayedOnce)
            {
                deathAudio.play();
                deathAudioIsPlayedOnce = true;
            }

            if (player2Score >= WINNING_SCORE || player1Score >= WINNING_SCORE)
            {
                showingWinScreen = true;
                
            }
            else
            {
                roundIsDone = true;
            }
            
                    
        }
        
        
    }

};







