const express = require('express')
const app = express()
const axios = require('axios')

const port = 5000
const URL = 'http://192.168.88.25:8081/'


app.post('/syncs/users', async (req, res, next) => {
    try {
        const result = await axios.post(URL+'syncs/users_from_central')
        return res.send({'message': 'success'})
    } catch (error) {
        console.log(error)
        next()
    }
})

app.post('/syncs/ports', async (req, res, next) => {
    try {
        const result = await axios.post(URL+'syncs/ports_from_central')
        return res.send({'message': 'success'})
    } catch (error) {
        console.log(error)
        next()
    }
})


app.use(function (req, res, next) {
    res.status(404).send({"message":"Page No Found"})
})

app.listen(port, console.log(`app running on port ${port}.`))