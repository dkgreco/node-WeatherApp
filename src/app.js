const
    path = require('path'),
    publicDirectoryPath = path.join(__dirname, '../public'),
    viewsPath = path.join(__dirname, '../hbsTemplates/views'),
    partialsPath = path.join(__dirname, '../hbsTemplates/partials'),
    geocode = require('./utils/geocode'),
    fetchWeather = require('./utils/forecast'),
    express = require('express'),
    hbs = require('hbs'),
    app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);



app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Dustin K Greco'
    });
});

app.get('/about', (req, res) => {
   res.render('about', {
       title: 'About Me',
       author: 'Dustin K Greco'
   });
});

app.get('/help', (req, res) => {
   res.render('help', {
       helpMsg: 'Send us an email at help@dkghelp.com',
       title: 'Help Is On The Way!!',
       author: 'Dustin K Greco'
   });
});

app.get('/weather', (req, res) => {
   if (!req.query.address) {
       return res.send('You must provide an address');
   }
   res.send({
       location: 'Broomfield',
       forecast: 'Rainy',
       address: req.query.address
   })
});

app.get('/help/*', (req, res) => {
    res.render('err404', {
        title: 'ERROR 404',
        errMsg: 'Help Article Not Found',
        author: 'Dustin K Greco'
    });
});

app.get('*', (req, res) => {
   res.render('err404', {
       title: 'ERROR 404',
       errMsg: 'You must be lost...or snooping...',
       author: 'Dustin K Greco'
   });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
