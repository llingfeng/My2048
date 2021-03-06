/**
 * Created by admin on 2016/11/5.
 */
function showNumberWithAnimation(i,j,num) {
    var numberCell = $("#number-cell-"+i+"-"+j);
    numberCell.css("background-color",getBackgroundColor(num));
    numberCell.css("color",getNumberColor(num));
    numberCell.text(num);

    numberCell.animate({
        "width":cellSideLength,
        "height":cellSideLength,
        "top":getPosTop(i,j),
        "left":getPosLeft(i,j)
    },50);
}

function showMoveAnimation(fromx,fromy,tox,toy) {
    var numberCell = $("#number-cell-"+fromx+"-"+fromy);
    numberCell.animate({
        "top":getPosTop(tox,toy),
        "left":getPosLeft(tox,toy)
    },200);
}