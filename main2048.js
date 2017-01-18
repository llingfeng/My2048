/**
 * Created by admin on 2016/11/5.
 */
var board = new Array();
var score = 0;
var hasConflicted = new Array();

$(function () {
    preparedForPhone();
    newgame();
});

function preparedForPhone() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSideLength = 100;
        cellSpace = 20;
    } else {
        $("#grid-contain").css("width", gridContainerWidth - 2 * cellSpace);
        $("#grid-contain").css("height", gridContainerWidth - 2 * cellSpace);
        $("#grid-contain").css("padding", cellSpace);
        $(".grid-cell").css("width", cellSideLength);
        $(".grid-cell").css("height", cellSideLength);
    }
}
function newgame() {
    //初始化盘格
    init();
    //在随机的两个格子里生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    //初始化小格子
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var grilCell = $("#grid-cell-" + i + "-" + j);
            grilCell.css("top", getPosTop(i, j));
            grilCell.css("left", getPosLeft(i, j));
        }
    }
    //初始化数组board
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();

    score = 0;
}

function updateBoardView() {
    //清理
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-contain").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);
            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + cellSideLength / 2);
                numberCell.css("left", getPosLeft(i, j) + cellSideLength / 2);
            } else {
                numberCell.css("width", cellSideLength);
                numberCell.css("height", cellSideLength);
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
                numberCell.css("font-size",getFontSize(board[i][j])+"px");
            }
            numberCell.css("line-height", cellSideLength + "px");
            hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber() {
    if (noSpace(board)) {
        return false;
    }
    //随机生产位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    //判断该位置是否存在数字
    while (true) {
        if (board[randx][randy] == 0) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }
    //随机生产2或者4
    var randNumber = Math.random() > 0.5 ? 2 : 4;
    board[randx][randy] = randNumber;

    //生产数字动态效果
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://Left
            event.preventDefault();
            if (moveLeft())
                setTimeout(generateOneNumber(), 250);
            setTimeout(isgameover(), 300);
            break;
        case 38://Up
            event.preventDefault();
            if (moveUp())
                setTimeout(generateOneNumber(), 250);
            setTimeout(isgameover(), 300);
            break;
        case 39://Right
            event.preventDefault();
            if (moveRight())
                setTimeout(generateOneNumber(), 250);
            setTimeout(isgameover(), 300);
            break;
        case 40://Down
            event.preventDefault();
            if (moveDown())
                setTimeout(generateOneNumber(), 250);
            setTimeout(isgameover(), 300);
            break;
        default:
            break;
    }
    $("#score").text(score);
});

function isgameover() {
    if (noSpace(board) && noRemove(board))
        alert("游戏结束");
}

document.addEventListener('touchstart', function (event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
})

document.addEventListener('touchmove', function (event) {
    event.preventDefault();
})

document.addEventListener('touchend', function (event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < 0.3 * documentWidth && Math.abs(deltay) < 0.3 * documentWidth)
        return;

    if (Math.abs(deltax) > Math.abs(deltay)) {
        if (deltax > 0) {//右移
            if (moveRight())
                setTimeout(generateOneNumber(), 250);
        } else {//左移
            if (moveLeft())
                setTimeout(generateOneNumber(), 250);
        }
    } else {
        if (deltay > 0) {//下移
            if (moveDown())
                setTimeout(generateOneNumber(), 250);
        } else {
            if (moveUp())
                setTimeout(generateOneNumber(), 250);
        }
    }
    setTimeout(isgameover(), 300);
    $("#score").text(score);
})


