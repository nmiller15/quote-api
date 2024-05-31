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

app.get('/api/quotes', (req, res) => {
    if (!req.query.person) {
        res.send({ quotes }) 
    } else {
        let person = req.query.person;
        let results = quotes.filter((quote) => { 
            const isEqual = quote.person === person
            return isEqual;
        });    
        res.send({ quotes: results });
    }
    // res.send({quotes});
})

app.post('/api/quotes', (req, res) => {
    const { quote, person } = req.query;
    if (!quote, !person) {
        res.status(400).send('Must include a quote and a person');
    } else {
        const newQuote = {
            quote,
            person
        }
        quotes.push(newQuote);
        res.status(201).send({
            quote: newQuote
        });
    }
})

app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`);
})