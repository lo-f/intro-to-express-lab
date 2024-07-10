const express = require('express');
const morgan = require('morgan')
const app = express()
app.use(morgan('dev'))
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// 1. Be Polite, Greet the User

app.get('/greetings/:name', (req, res, next) => {
    res.send(`<h1>Hello there, ${req.params.name}!`)
})

// 2. Rolling the Dice

app.get('/roll/:diceNumber', (req, res, next) => {
    const num = req.params.diceNumber
    const rand = Math.floor(Math.random() * num);
    if (isNaN(num) || num < 0) {
        res.send(`You must select a number!`)
    } else {
        res.send (`You rolled a ${rand}!`)
    }
})

// 3. I Want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:indexNumber', (req, res, next) => {
     const idx = req.params.indexNumber
     if (isNaN(idx) || Number(idx) >= collectibles.length) {
        res.send(`This item is not yet in stock. Check back soon!`)
     } else {
        res.send(`So, you want the ${collectibles[idx].name}? For $${collectibles[idx].price},
            it can be yours!`)
     }
})

// 4. Filter Shoes by Query Parameters

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res, next) => {
    const minPrice = req.query.minPrice?Number(req.query.minPrice):0;
    const maxPrice = req.query.maxPrice?Number(req.query.maxPrice): Infinity;
    const type = req.query.type;

    const filterShoes = shoes.filter((shoe) => {
        return (
            shoe.price >= minPrice &&
            shoe.price <= maxPrice &&
            (!type || shoe.type === type)
        )
    })
    res.send(filterShoes)
})
