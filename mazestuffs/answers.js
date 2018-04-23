/////////////////////////
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

// =======================================================================================================================================

///////////////
var sj=0;
function recurse()
{
    sj++;
    if(sj==20)
    {
        return;
    }
    if(toty.isBlock('down')==false)
    {
        toty.movdown();
        recurse();
    }
        if(toty.isBlock('right')==false)
    {
        toty.movright();
        recurse();
    }
    return;
}
recurse();
console.log("el i " , sj);


// =========================================================================================================================================
////// 