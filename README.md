# MazeRunner
A simple maze game that uses the user's code to move the tank 

Game Link : [Game](https://open-source-community.github.io/MazeRunner/mazestuffs/maze%20rendring/index.html)

## How To Play:

- There are 5 main functions 
- ``` toty.movright(); ``` Moves the tank one block right
- ``` toty.movleft(); ``` Moves the tank one block left
- ``` toty.movup(); ``` Moves the tank one block up
- ``` toty.movdown(); ``` Moves the tank one block down
- ``` toty.isBlock(str) ``` Checks if the given direction has a block or not, for example if str equals 'right' and on the right 
of the tank there is a block then the function will return true.

- Use recursive algorithms to solve any maze using the isBlock function to create a generic algorithm, be creative.

- If you solved it try forking this repo and adding a screenshot of your submission code in the submission folder and pull request it, best answers shall be displayed.


## Code example

- This code is not generic, it just solves the first maze, you can copy and run it to test how the tank moves.

``` javascript 
var d = function(a)
{
    toty.movdown();
}
var r = function(a)
{
    toty.movright();
}

var a =[6,6,1,1,1,2,1];
var b=[d,r,d,r,d,r,d];

for (var i=0; i<7; i++)
{
    for (var j=0; j<a[i]; j++)
    {
        b[i](2); 
    }
}
```
