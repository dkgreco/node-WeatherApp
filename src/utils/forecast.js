const
    request = require('request'),
    key = require('../../configKeys/config').darkskyKey,
    forecast = (latitude, longitude, callback) => {
        const
            baseURI = "https://api.darksky.net/forecast/",
            lang = "/us12",
            url = baseURI.concat(key, '/', latitude, ',', longitude);

        request({url: url, json: true}, (error, response) => {
            if (response.body.error || error) {
                error = response.body.error ? response.body.error : error;
                return callback(error, undefined);
            }
            let {temperature, precipProbability} = response.body.currently,
                formattedTemp = Math.trunc(temperature, 2),
                formattedPrecipChance = Math.round(precipProbability * 100, 2) + '%';

            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                temperature: formattedTemp,
                precipitationChance: formattedPrecipChance
            })
        });
    };

module.exports = forecast;