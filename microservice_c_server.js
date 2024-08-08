const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3002;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

/* https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key} */

async function aqiData(lat, lon, key) {

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=1&lon=1&appid=d5bbe0e7f04802cada0fb607ce9dba6d`);
    let data = await response.json();
    return {'humidity': data['main']['humidity']}
};

app.post("/aqiData", (req, res) => {
    aqiData(req.body["lat"], req.body["lon"], req.body["key"]).then((data) =>
        res.send(data))
})

app.listen(PORT, () => {
    console.log(`Litsening on port ${PORT}`)
});
