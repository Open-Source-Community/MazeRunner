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