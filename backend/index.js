const express = require('express')
const app = express()

app.get("/coins", (req, res) => {
    

    res.status(200).json(coins)
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})