
var toty;
var maze_text; 
var blocks_array; 
var maze_array ;  
var end_pos; 
function setup()
{
  maze_array= new Array(10);
  for (var i=0; i<10; i++)
{
  maze_array[i] = new Array(10); 
}
  blocks_array= new Group();
  var cnv = createCanvas(windowWidth,windowHeight);
  var scale=3.7,stepwidth=1,stephight=1,blocksize=16;  
  maze_text = readTextFile("output.txt");
  end_pos = drawmaze(maze_text,scale,stepwidth,stephight,2); // removed the random, add a set 0 value to the draw maze late.
  console.log(maze_array); 
  toty=new movs(scale,stephight,stepwidth,blocksize); 
}
function draw() 
{
  clear();
  fill(120,2,2); 
 
  background(25,255,255);
  drawSprites();



 if (toty.pos_marker <= toty.v_step_list.length -1 )
 {
   
    if (toty.pos_marker<toty.v_step_list.length)
    {
    toty.tank.moveToPoint(toty.v_step_list[toty.pos_marker].x ,toty.v_step_list[toty.pos_marker].y );
    }
  if (toty.tank.reachedPoint(toty.v_step_list[toty.pos_marker].x ,toty.v_step_list[toty.pos_marker].y))
  {
   toty.pos_marker++;  
  }
  var endlist = toty.v_step_list.length-1; 
  if (toty.tank.reachedPoint(toty.v_step_list[endlist].x , toty.v_step_list[endlist].y))
  {
   toty.tank.setTankFriction(1);  
  }
 }

  for (var i=0; i<blocks_array.length; i++)
  {
    if (toty.tank.Body.overlap(blocks_array[i]))
    {
      text("Game Over Loop" , width/2 , height/2 , 100 , 100); 
      toty.tank.Body.collide(blocks_array[i]); 
      //toty.tank.canon.canonSprite.collide(blocks_array[i]); 
      noLoop();
    }
  }
  toty.GameWin(); 
 
 
}
class StartEnd
{
  constructor(Xposition,Yposition,blockscale )
  {
    this.xpos=Xposition;
    this.ypos=Yposition;
    this.blockscale=blockscale;
    this.blockssprite=null; 
  }
  drawbrick()
  {
    this.blockssprite = createSprite(this.xpos , this.ypos);
    this.blockssprite.addImage(loadImage("assets/block.png"));
    this.blockssprite.scale=this.blockscale*.2;
  }
}
class Brick
{
  constructor(Xposition,Yposition,blockscale )
  {
    this.xpos=Xposition;
    this.ypos=Yposition;
    this.blockscale=blockscale;
    this.blockssprite=null; 
  }
  drawbrick()
  {
    this.blockssprite = createSprite(this.xpos , this.ypos);
    this.blockssprite.addImage(loadImage("assets/blocks.png"));
    this.blockssprite.scale=this.blockscale;
  }
}
class Path
{
  constructor(Xposition,Yposition,blockscale )
  {
     this.xpos=Xposition;
     this.ypos=Yposition;
     this.blockscale=blockscale;
     this.blockssprite=null; 
  }
  drawbrick()
  {
     this.blockssprite = createSprite(this.xpos , this.ypos );
     this.blockssprite.addImage(loadImage("assets/hollow middle.png"));
     this.blockssprite.scale=this.blockscale*.125;
  }
}

class movs
{ 
  /***
   * @param {*} scale     picture scale 
   * @param {*} stephight number of vertical tiles in each step 
   * @param {*} stepwidth number of horizontal tiles in each step
   * @param {*} blocksize size or hight of a single tile (in pixels) 
   */
  constructor(scale,stephight,stepwidth,blocksize)
  {
    this.x_maze = 0; 
    this.y_maze= 0; 
    this.stephight=blocksize*scale*stephight;
    this.stepwidth=blocksize*scale*stepwidth;
    this.initx=this.stepwidth/2;
    this.inity=this.stephight/2;
    this.tank=new VisualTank(this.initx,this.inity,"assets/tankbody.png","assets/canon.png");
    this.tank.setTotalScale(0.66); 
    this.tank.setTankFriction(0.001); 
    this.steps_dic = {}; 
    this.v_step_horizontal = createVector(this.stepwidth, 0);
    this.v_step_vertical   = createVector(0,this.stephight);
    this.v_temp            = createVector(this.initx,this.inity);
    this.v_step_list=[];
    this.pos_marker =0; 
  } 
  movup()
  { 
    if (this.y_maze-1<0){
      return; 
    }
    this.v_temp.sub(this.v_step_vertical);
    this.v_step_list.push(createVector(this.v_temp.x , this.v_temp.y));
    toty.tank.setTankFriction(0); 
    this.y_maze--; 
    if (this.steps_dic[this.v_temp] == 1)
    {
 
    }
    this.steps_dic[this.v_temp] =1;
  
  }
  movdown()
  {
    if (this.y_maze+1>9)
    {
      return; 
    }
    this.v_temp.add(this.v_step_vertical);
    this.v_step_list.push(createVector(this.v_temp.x , this.v_temp.y));
    toty.tank.setTankFriction(0); 
    this.y_maze++; 
    if (this.steps_dic[this.v_temp] == 1)
    {
 
    }
    this.steps_dic[this.v_temp] =1; 
    
    
  }
  movright()
  {
    if (this.x_maze+1>9){return;}
    this.v_temp.add(this.v_step_horizontal);
    this.v_step_list.push(createVector(this.v_temp.x , this.v_temp.y)); 
    toty.tank.setTankFriction(0); 
    this.x_maze++; 
    if (this.steps_dic[this.v_temp] == 1)
    {
      
    }
    this.steps_dic[this.v_temp] =1; 
    
    
  }
  movleft ()
  {
    if(this.x_maze-1<0){return; }
    this.v_temp.sub(this.v_step_horizontal);
    this.v_step_list.push(createVector(this.v_temp.x , this.v_temp.y)); 
    toty.tank.setTankFriction(0);  
    this.x_maze--;    
    if (this.steps_dic[this.v_temp] == 1)
    {
      
    }
    this.steps_dic[this.v_temp] =1; 
  }
  isBlock(check)
  {
    if (check=='right')
    {
      if  (this.x_maze+1>9 || maze_array[this.y_maze][this.x_maze+1]=='#')
      {
        return true; 
      }
    }
    if (check=='left')
    {
      if (this.x_maze-1<0 ||maze_array[this.y_maze][this.x_maze-1]=='#')
      {
        return true; 
      }
    }
    if (check=='up')
    {
      if (this.y_maze-1<0 || maze_array[this.y_maze-1][this.x_maze]=='#')
      {
        return true; 
      }
    }
    if (check=='down')
    {
      if (this.y_maze+1>9 || maze_array[this.y_maze+1][this.x_maze]=='#')
      {
        return true; 
      }
    }
    return false; 
  }
  isWin(check)
  {
    if (check=='right')
    {
      if  (this.x_maze+1>9 || maze_array[this.y_maze][this.x_maze+1]=='o')
      {
        return true; 
      }
    }
    if (check=='left')
    {
      if (this.x_maze-1<0 ||maze_array[this.y_maze][this.x_maze-1]=='o')
      {
        return true; 
      }
    }
    if (check=='up')
    {
      if (this.y_maze-1<0 || maze_array[this.y_maze-1][this.x_maze]=='o')
      {
        return true; 
      }
    }
    if (check=='down')
    {
      if (this.y_maze+1>9 || maze_array[this.y_maze+1][this.x_maze]=='o')
      {
        return true; 
      }
    }
    return false; 
  }
  GameWin()
  {
    if (toty.tank.reachedPoint(end_pos.x , end_pos.y)==true)
    {
      fill(120,0,0); 
      textSize(50); 
      var str = this.v_step_list.length;
      str.toString(); 
      // str =  "WELL PLAYED GOOD GAME, your score is " + str;
      text( "this is your score " + this.v_step_list.length  , 50 , height-160, 200 , 200); 
    }
  }
}


///_________________________________________________
//maze     : 1d with the maze charecters 
//scale    : block sprite scale factor
//stepwidth:number of horizontal blocks that still count as one step in the array(rows)
//stephight:number of horizontal blocks that still count as one step in the array(colomns)
//a step is a bunch of block 
//block size is the size of each section of those little blocks 
///_________________________________________________
function drawmaze(maze,scale,stepwidth,stephight,mazenumber)
{ 
  blocksize=scale*16;
  var xpos=blocksize/2,ypos=blocksize/2;
  var brick,currnt_element;
  var rownumber=mazenumber*11;
  var row_end=rownumber+10;
  var row_temp = 0; 
  var end_pos = createVector(); 
  //row loop
  for(var row=rownumber;row<row_end;row++)
  {
    //colomn loop 
    for(var colomn=0;colomn<11;colomn++)
    {
      //charecter for this row in the array
      currnt_element = findelement(maze,11,row,colomn);

      if (colomn<10 && row_temp<10)
      {
        maze_array[row_temp][colomn] = currnt_element; 
         
      }
      var currentX=xpos,currentY=ypos;
        
      
        // start block is special XD , so is the end block
      if (row==rownumber && colomn==0|| row==row_end-1 && colomn==9)
      {
        //loop on said block's rows and colomns and add them 
        for(var inblock_row=0;inblock_row<stephight;inblock_row++)
        {
          xpos=currentX; // 1st 16  .. 
          if (currnt_element=='o')
          {
            end_pos.x = xpos; 
            end_pos.y = ypos
          }
          for(var inblock_colomn=0;inblock_colomn<stepwidth;inblock_colomn++)
          {
           Markbrick=new StartEnd(xpos,ypos,scale);
           Markbrick.drawbrick();
           xpos+=blocksize;
          }  
          
          if (inblock_row +1>= stephight)
          {
            continue; 
          }
          ypos+=blocksize;
          
        }
        ypos=currentY;
      }

    else if (currnt_element=='#')
      {
        //loop on said block's rows and colomns and add them 
        for(var inblock_row=0;inblock_row<stephight;inblock_row++)
        {
          xpos=currentX;
          for(var inblock_colomn=0;inblock_colomn<stepwidth;inblock_colomn++)
          {
           brick=new Brick(xpos,ypos,scale);
           brick.drawbrick();
           blocks_array.add(brick.blockssprite); 
           xpos+=blocksize;
          }  
          if(inblock_row +1 >= stephight)
          {
      
            continue; 
          }
          ypos+=blocksize;
          
        }
      ypos=currentY;
      
      }
      
      else if (currnt_element=='.')
      {
        for(var inblock_row=0;inblock_row<stephight;inblock_row++)
        {
          xpos=currentX;
          for(var inblock_colomn=0;inblock_colomn<stepwidth;inblock_colomn++)
          {
            path=new Path(xpos,ypos,scale);
            path.drawbrick();
            xpos+=blocksize;
          }  
          if (inblock_row + 1 >= stephight)
          {
                 continue; 
          }
          ypos+=blocksize;
          
        }
      ypos=currentY;
      
           
      }
      else 
      {
       
       continue;
      }
     
      //xpos+=blocksize/4;// remove this line to remove the spaces between each step 
    }
    row_temp++; 
    xpos=blocksize/2;
    ypos+=blocksize*(stephight);
  }   
  return end_pos; 
}

function findelement(_1d,num_O_colomns,row,colomn)
{
  return _1d[num_O_colomns*row+colomn];
}

function readTextFile(file)
{
     var rawFile = new XMLHttpRequest();
     var allText;
     rawFile.open("GET", file, false);
     rawFile.onreadystatechange = function ()
     {
         if(rawFile.readyState === 4)
         {
             if(rawFile.status === 200 || rawFile.status == 0)
             {
                 allText = rawFile.responseText;
                 //alert(allText);
             }
         }
     }
     rawFile.send(null);
     return allText; 
}

function btnpress()
{
  // var str = document.getElementById("in").value; 

  // eval(str); 
  var editor = ace.edit("editor");
  eval(editor.getValue());
  
}
