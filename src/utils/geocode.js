const
    request = require('request'),
    key = process.env.MAPBOX_API_KEY || require('../../configKeys/config').mapboxKey,
    geocode = (address, callback) => {
        const
            baseURI = "https://api.mapbox.com/geocoding/v5/mapbox.places/",
            location = encodeURIComponent(address),
            token =  `.json?access_token=${key}`,
            limit = "&limit=1",
            url = baseURI.concat(location, token, limit);

        request({url: url, json: true}, (error, response) => {
            if (error) {
                return callback('GeoCode API Unreachable.', undefined);
            } else if (response.body.message === 'Not Found') {
                return callback('Invalid URL Request Sent', undefined);
            } else if (response.body.features.length === 0) {
                return callback('Location Not Found. Try another search...', undefined);
            }
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        });
    };

module.exports = geocode;