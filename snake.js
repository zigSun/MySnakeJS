function fruit(x_coord,y_coord){
	this.x = x_coord,
	this.y = y_coord,
	canContext.fillRect(this.x*cell_size,this.y*cell_size,cell_size,cell_size);
};
function cell (x_coord,y_coord) {
	this.x = x_coord;
	this.y = y_coord;
}

var snake;
var nav;
var cell_size = 10;
var speed = 200;
var canEl;
var canContext;
var intervalID;
var fru;

function init () {
	
	canEl = document.getElementById("ololo");
	canContext = canEl.getContext("2d");
	window.addEventListener("keydown",this.control,true);
	reset();
}

function control (e) {
	if(e.keyCode == 65)
	{
		if(nav!="d")
			nav = "a";
	}
	if(e.keyCode == 68)
	{
		if(nav!="a")
			nav = "d";
	}
	if(e.keyCode == 87)
	{
		if(nav!="s")
			nav = "w";
	}
	if(e.keyCode == 83)
	{
		if(nav!="w")
			nav = "s";
	}
	if(e.keyCode == 82)
	{
		clearInterval(intervalID);
		reset();
	}
}
function collision_check()
{
	for(var i=1; i < snake.length; i++)
	{
		if((snake[0].x == snake[i].x) && (snake[0].y == snake[i].y))
			return true;
	}
	return false;
}
function fru_check()
{
	if((snake[0].x == fru.x) && (snake[0].y == fru.y))
	{
		snake.push(new cell(snake[snake.length-1].x,snake[snake.length-1].y));
		canContext.fillRect(fru.x*cell_size,fru.y*cell_size,cell_size,cell_size);
		do
		{
			fru.x = getRandomInt(0,14);
			fru.y = getRandomInt(0,14);
		}while(canContext.getImageData(fru.x*cell_size,fru.y*cell_size,1,1).data[3]!=0)
		canContext.fillStyle = "#ffa500";
		canContext.fillRect(fru.x*cell_size,fru.y*cell_size,cell_size,cell_size);
		canContext.fillStyle = "black"
	}
}
function run () {
			canContext.clearRect(snake[snake.length-1].x*cell_size,snake[snake.length-1].y*cell_size,cell_size,cell_size);
			switch(nav)
			{
				case "a": if(snake[0].x*cell_size-cell_size >= 0)
							{
								snake.unshift(snake.pop());
								snake[0].x=snake[1].x-1;
								snake[0].y=snake[1].y;
							}
							else
		 					{
							 	game_over();							 	
		 					};
							break;
				case "d": if(snake[0].x*cell_size+cell_size <= canEl.width-cell_size)
							{
								snake.unshift(snake.pop());
								snake[0].x=snake[1].x+1;
								snake[0].y=snake[1].y;
							}
							else
		 					{
		 						game_over();
		 					};
		 					break;
		 		case "w": if(snake[0].y*cell_size-cell_size >= 0)
							{
								snake.unshift(snake.pop());
								snake[0].y=snake[1].y-1;
								snake[0].x=snake[1].x;
							}
							else
		 					{
		 						game_over();
		 					};
		 					break;
		 		case "s": if(snake[0].y*cell_size+cell_size <= canEl.height-cell_size)
							{
								snake.unshift(snake.pop());
								snake[0].y=snake[1].y+1;
								snake[0].x=snake[1].x;
							}
							else
		 					{
		 						game_over();
		 					};
		 					break;
		 		default:
		 			 	break;
			}
			fru_check();
			if(collision_check())
				game_over();
			canContext.fillRect(snake[0].x*cell_size,snake[0].y*cell_size,cell_size,cell_size);

}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reset () {
	canEl.width = canEl.width;
	snake = [new cell(3,1),new cell(2,1),new cell(1,1)];
	nav = "d";
	fru = new fruit(10,10);
	intervalID = setInterval(run,speed);
}
function game_over () {
	clearInterval(intervalID);
	canEl.width = canEl.width;
	canContext.fillRect(0,0,canEl.width,canEl.height);
	canContext.fillStyle = "#FF00FF";
	canContext.font = "40px sans-serif";
  	canContext.fillText("Game Over", Math.floor(canEl.width/5),Math.floor(canEl.height/2.5));
}
