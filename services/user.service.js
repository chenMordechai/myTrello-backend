const users = require('../data/user.json')
const fs = require('fs');
const { json } = require('express');

module.exports = {
    query,
    getById,
    remove,
    save,
    login,
    logout,
}

function login(credentials) {
    let user = users.find(user => user.name === credentials.name
        && user.password === credentials.password)
    if (user) {
        user = { ...user }
        delete user.password
    }
    return Promise.resolve(user)
}


function logout() {
    return Promise.resolve(user)
}

function query() {
    return Promise.resolve(users)
}

function getById(userId) {
    const user = users.find(user => user._id === userId)
    return Promise.resolve(user)
}

function remove(userId) {
    const userIdx = users.findIndex(user => user._id === userId)
    if (userIdx >= 0) users.splice(userIdx, 1)
    _saveUsersToFile()
    return Promise.resolve()
}

function save(user) {
    if (user._id) {
        const userIdx = users.findIndex(currUser => currUser._id === user._id)
        users.splice(userIdx, 1, user)
    } else {
        user._id = _makeId()
        users.unshift(user)
    }
    _saveUsersToFile()
    return Promise.resolve(user)
}



function _saveUsersToFile() {
    fs.writeFileSync('data/user.json', JSON.stringify(users, null, 2));

}


function _makeId(length = 5) {
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
}