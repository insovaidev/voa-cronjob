const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const axios = require('axios')

const PORT = 3001
const CENTRAL_API_URL = 'http://192.168.88.25:3000/' // Central API URL


// Allow close domain
app.use(cors())

// Accept Form Submition
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.post('/syncs/users', async (req, res, next) => {
    let data = []
    let sync_logs = {}
    if(result = await fs.readFileSync('sync_logs')) sync_logs = JSON.parse(result)
    const sid = req.body.sid 
    const port = req.body.port 

    try {
        const sync_data_response = await axios.post(CENTRAL_API_URL+'syncs/users_to_sub', {port: port, 'sid': sid})
        data = sync_data_response.data.data        
        return  res.send({'data': data && data.length ? data : null})
    } catch (error) {
        console.log(error)
        next()
    }
})

app.post('/syncs/ports', async (req, res, next) => {
    let data = []
    let sync_logs = {}
    if(result = await fs.readFileSync('sync_logs')) sync_logs = JSON.parse(result)
    const sid = req.body.sid 
    try {
        const sync_data_response = await axios.post(CENTRAL_API_URL+'syncs/ports_to_sub', {'sid': sid})
        data = sync_data_response.data.data        
        return  res.send({'data': data && data.length ? data : null})
    } catch (error) {
        console.log(error)
        next()
    }
})


app.post('/syncs/countries', async (req, res, next) => {
    let data = []
    let sync_logs = {}
    if(result = await fs.readFileSync('sync_logs')) sync_logs = JSON.parse(result)
    const sid = req.body.sid 
    try {
        const sync_data_response = await axios.post(CENTRAL_API_URL+'syncs/countries_to_sub', {'sid': sid})
        data = sync_data_response.data.data        
        return  res.send({'data': data && data.length ? data : null})
    } catch (error) {
        console.log(error)
        next()
    }
})

app.post('/syncs/visa_types', async (req, res, next) => {
    let data = []
    let sync_logs = {}
    if(result = await fs.readFileSync('sync_logs')) sync_logs = JSON.parse(result)
    const sid = req.body.sid 
    try {
        const sync_data_response = await axios.post(CENTRAL_API_URL+'syncs/visa_types_to_sub', {'sid': sid})
        data = sync_data_response.data.data        
        return  res.send({'data': data && data.length ? data : null})
    } catch (error) {
        console.log(error)
        next()
    }
})


app.post('/sync/checklists', async (req, res, next) => {
    const body = req.body
    try {
        const sync_data = await axios.post(CENTRAL_API_URL+'syncs/checklists_from_sub', body)
    } catch (error) {
        console.log(error)
        next()
    }
})



app.use(function (req, res, next) {
    res.status(404).send({"message":"Page No Found"})
})

app.listen(PORT, console.log(`App running on port ${PORT} `))