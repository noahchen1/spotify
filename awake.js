const express = require('express')

const app = express()

const http = require('http').Server(app)

setInterval(() => {
    http.get("https://songs-player.herokuapp.com/")
}, 1500000)