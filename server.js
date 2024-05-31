const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    const response = {
        quote: randomQuote
    }
    res.status(200).send(response);
})

app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`);
})