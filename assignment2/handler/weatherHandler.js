const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/weather-data.json");

const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

function writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}

exports.showAllDetails = (req, res) => {
    res.status(200).json(data);
};

exports.showRainDetails = (req, res) => {
    const rainDetails = data.map(city => ({ city: city.city, rain: city.rain }));
    res.status(200).json(rainDetails);
};

exports.addNewCityTempDetails = (req, res) => {
    const newCity = req.body;
    data.push(newCity);
    writeData(data);
    res.status(201).json(newCity);
};

exports.changeRainDetails = (req, res) => {
    const city = data.find(c => c.city === "Delhi");
    if (city) {
        city.rain = false;
        writeData(data);
        res.status(200).json(city);
    } else {
        res.status(404).json({ message: "City not found" });
    }
};

exports.removeCityDetails = (req, res) => {
    const { cityName } = req.params;
    let newdata =data;
    const cityIndex = newdata.findIndex(c => c.city.toLowerCase() === cityName.toLowerCase());

    if (cityIndex > -1) {
        const removedCity = newdata.splice(cityIndex, 1);
        writeData(newdata);
        res.status(200).json(removedCity);
    } else {
        res.status(404).json({ message: "City not found" });
    }
};

exports.showCityDetails = (req, res) => {
    const { cityName } = req.params;
    const city = data.find(c => c.city.toLowerCase() === cityName.toLowerCase());

    if (city) {
        res.status(200).json(city);
    } else {
        res.status(404).json({ message: "City not found" });
    }
};
