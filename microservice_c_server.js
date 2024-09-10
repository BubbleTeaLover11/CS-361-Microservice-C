const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3002;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

const msToMPH = (ms) => ms / 0.44704
const msToKPH = (ms) => ms * 3.6

async function humidityData(lat, lon, key) {

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
    let data = await response.json();
    let jsonData = {'humidity': data['main']['humidity'] + ' %',
                    'windSpeedms': data['wind']['speed'],
                    'windDegree': data['wind']['deg']
    }

    jsonData['windSpeedMPH'] = Math.round(msToMPH(jsonData['windSpeedms']) * 10) / 10
    jsonData['windSpeedKMH'] = Math.round(msToKPH(jsonData['windSpeedms']) * 10) / 10

    return jsonData
};

app.post("/humidityData", (req, res) => {
    console.log(req.body)
    humidityData(req.body["lat"], req.body["lon"], req.body["key"]).then((data) => {
        res.send(data)
        console.log(data)
    })
})

app.listen(PORT, () => {
    console.log(`Litsening on port ${PORT}`)
});