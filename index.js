const express = require('express')
const axios = require('axios')
const cors = require('cors');
const app = express()
const port = 8080
const lastHerosSearched = [];

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/super-hero/:name', (req, result) => {
    lastHerosSearched.push(req.params.name);
    try {
        axios.get(`https://superheroapi.com/api/10223009321394258/search/${req.params.name}`).then(res => {
            result.send(res.data);
        });
    } catch (error) {
        console.log("ERROR in get superhero by name", error.message);
    }
    console.log("lastHerosSearched", lastHerosSearched);
})

app.get('/last-searched', (req, result) => {
    result.send(lastHerosSearched);
    console.log("lastHerosSearched", lastHerosSearched);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})