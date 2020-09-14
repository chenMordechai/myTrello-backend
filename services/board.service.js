const boards = require('../data/board.json')
const fs = require('fs');

function query() {
    return Promise.resolve(boards)
}

function getById(boardId) {
    const board = boards.find(board => board._id === boardId)
    return Promise.resolve(board)
}

function remove(boardId) {
    const boardIdx = boards.findIndex(board => board._id === boardId)
    if (boardIdx >= 0) boards.splice(boardIdx, 1)
    _saveBoardsToFile()
    return Promise.resolve()
}

function save(board) {
    if (board._id) {
        const boardIdx = boards.findIndex(currBoard => currBoard._id === board._id)
        if (boardIdx >= 0) boards.splice(boardIdx, 1, board)
    } else {
        board._id = _makeId()
        boards.unshift(board)
    }
    _saveBoardsToFile()
    return Promise.resolve(board)
}

module.exports = {
    query,
    getById,
    remove,
    save
}


function _saveBoardsToFile() {
    fs.writeFileSync('data/board.json', JSON.stringify(boards, null, 2));

}


function _makeId(length = 5) {
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
}