const
    request = require('request'),
    key = require('../../configKeys/config').darkskyKey,
    forecast = (latitude, longitude, location, callback) => {
        const
            baseURI = "https://api.darksky.net/forecast/",
            lang = "/us12",
            url = baseURI.concat(key, '/', latitude, ',', longitude);

        request({url: url, json: true}, (error, response) => {
            console.log(response);
            if (response.body.error || error) {
                console.log(error);
                error = response.body.error ? response.body.error : error;
                return callback(error, undefined);
            }
            let {temperature, precipProbability, summary} = response.body.currently,
                formattedTemp = Math.trunc(temperature, 2),
                formattedPrecipChance = Math.round(precipProbability * 100, 2) + '%',
                currentForecast = `Currently, in ${location.split(',')[0]} it is ${formattedTemp} degrees F and will be ${summary}. There is a ${formattedPrecipChance} chance of precipitation at this time.`

            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                location,
                temperature: formattedTemp,
                precipitationChance: formattedPrecipChance,
                forecastMessage: currentForecast
            })
        });
    };

module.exports = forecast;