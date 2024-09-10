async function getWindSpeed(lat, lon, key) {

    try {
        const requestMethod = {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                lat: lat,
                lon: lon,
                key: key
            })
        }
        const response = await fetch("http://localhost:3002/humidityData", requestMethod)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
};

getWindSpeed(37.64900223555577, -122.48898062972559).then((data) => 
    console.log(data))