const express = require('express')

const router = express.Router()

const Car = require('../models/car')

const startingCars = [
	{
		make: 'Toyota',
		model: 'Tacoma',
		class: 'truck',
		drive: 4,
	},
	{
		make: 'Toyota',
		model: 'Tundra',
		class: 'truck',
		drive: 4,
	},
	{
		make: 'Jeep',
		model: 'Grand Cherokee',
		class: 'SUV',
		drive: 2,
	},
]

// /seed/characters
router.get('/cars', (req, res, next) => {
    Car.deleteMany({})
        .then(() => {
            Car.create(startingCars)
                .then(cars => {
                    res.status(200).json({ cars: cars })
                })
        })
        .catch(next)
})

module.exports = router