// Import modules
const path = require('path')
const fs = require('fs')
const cors = require('cors')

// Init express app
const express = require('express')
const app = express()
let privateKey  = fs.readFileSync('cert/server.key', 'utf8');
let certificate = fs.readFileSync('cert/server.crt', 'utf8');
let credentials = { key: privateKey, cert: certificate }

// Options & Path
const directoryPath = path.join(__dirname, 'image_generator/final_images');
app.options('*', cors())
app.use(cors())

// Create coins list
const coins = []
async function createCoinList() {
    await fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (file) {
            coins.push(file)
        });
    });
}

// Create coins route
app.get("/coins", async (req, res) => {
    res.status(200).json(coins)
})

// Create app
let httpsServer = https.createServer(credentials, app);
httpsServer.listen(8080);

createCoinList()