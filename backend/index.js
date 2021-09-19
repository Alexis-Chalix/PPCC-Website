const express = require('express')
const app = express()

const path = require('path')
const fs = require('fs')
const cors = require('cors')

const directoryPath = path.join(__dirname, 'image_generator/final_images');
app.options('*', cors())
app.use(cors())

app.get("/coins", async (req, res) => {
    const coins = []

    await fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        files.forEach(function (file) {
            coins.push(file)
        });

        res.status(200).json(coins)
    });
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})