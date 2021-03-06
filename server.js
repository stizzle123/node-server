const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// heroku port no.
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Registering express middleware
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });

    next();
});

/* // Maintenance mode
app.use((req, res, next) => {
    res.render('maintenance.hbs');
}); */

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Our Home page',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Personal Portfolio',
        welcomeMessage: 'Welcome to my Portfolio'
    });
});

app.get('/bad', (req, res) => {
    res.status(404).send({
        errorMessage: `404 Page not found`
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});