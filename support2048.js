/**
 * Created by admin on 2016/11/5.
 */
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92*documentWidth;
cellSideLength = 0.18*documentWidth;
cellSpace = 0.04*documentWidth;

function getPosTop(i, j) {
    return cellSpace + (cellSpace+cellSideLength) * i;
}

function getPosLeft(i, j) {
    return cellSpace + (cellSpace+cellSideLength) * j;
}

function getBackgroundColor(num) {
    switch (num) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#eee4da";
            break;
        case 64:
            return "#eee4da";
            break;
        case 128:
            return "#eee6da";
            break;
        case 256:
            return "#ee64da";
            break;
        case 512:
            return "#e7e4da";
            break;
        case 1024:
            return "#e2e4da";
            break;
        case 2048:
            return "#eee4ra";
            break;
        case 4096:
            return "#ebe4da";
            break;
        default:
            return "#ebe4da";
            break;
    }
    return "black";
}

function getFontSize(num) {
    switch ((num+"").length) {
        case 1:
            return 50;
            break;
        case 2:
            return 40;
            break;
        case 3:
            return 30;
            break;
        case 4:
            return 20;
            break;
        default:
            return 15;
            break;
    }
    return 50;
}

function getNumberColor(num) {
    if (num <= 4)
        return "#774e56";
    return "white";
}

function noSpace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0)
                return false;
        }
    }
    return true;
}

function noRemove(board) {
    if(canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || canMoveUp(board))
        return false;
    return true;
}

function moveLeft() {
    if (!canMoveLeft(board))
        return false;
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlock(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlock(i, j, k, board) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][k];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        score += board[i][k];
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(), 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board))
        return false;
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[j][i] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[k][i] == 0 && noBlockToUp(i, j, k, board)) {
                        showMoveAnimation(j, i, k, i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    }
                    else if (board[k][i] == board[j][i] && noBlockToUp(i, j, k, board) && !hasConflicted[k][i]) {
                        showMoveAnimation(j, i, k, i);
                        board[k][i] += board[k][i];
                        board[j][i] = 0;
                        hasConflicted[k][i] = true;
                        score += board[k][i];
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board))
        return false;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockToRight(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockToRight(i, j, k, board) && !hasConflicted[i][j]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][k];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        score += board[i][k];
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(), 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board))
        return false;
    for (var i = 0; i < 4; i++) {
        for (var j = 3; j >= 0; j--) {
            if (board[j][i] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[k][i] == 0 && noBlockToDown(i, j, k, board)) {
                        showMoveAnimation(j, i, k, i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0
                        continue;
                    }
                    else if (board[k][i] == board[j][i] && noBlockToDown(i, j, k, board) && !hasConflicted[k][i]) {
                        showMoveAnimation(j, i, k, i);
                        board[k][i] += board[k][i];
                        board[j][i] = 0;
                        hasConflicted[k][i] = true;
                        score += board[k][i];
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(), 200);
    return true;
}

function noBlock(i, j, k, board) {
    for (var m = k + 1; m < j; m++)
        if (board[i][m] != 0)
            return false;
    return true;
}

//向上没有障碍物
function noBlockToUp(i, j, k, board) {
    for (var m = k + 1; m < j; m++)
        if (board[m][i] != 0)
            return false;
    return true;
}

//向右没有障碍物
function noBlockToRight(i, j, k, board) {
    for (var m = j + 1; m < k; m++) {
        if (board[i][m] != 0)
            return false;
    }
    return true;
}

//向下没有障碍物
function noBlockToDown(i, j, k, board) {
    for (var m = j + 1; m < k; m++)
        if (board[m][i] != 0)
            return false;
    return true;
}

//是否可以向左移动
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//是否可以向右移动
function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1]) {
                    return true;
                }
            }
        }
    }
}

//是否可以向上移动
function canMoveUp(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[j][i] != 0) {
                if (board[j - 1][i] == 0 || board[j - 1][i] == board[j][i]) {
                    return true;
                }
            }
        }
    }
    return false;
}

//是否可以向下移动
function canMoveDown(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[j][i] != 0) {
                if (board[j + 1][i] == 0 || board[j + 1][i] == board[j][i]) {
                    return true;
                }
            }
        }
    }
    return false;
}

