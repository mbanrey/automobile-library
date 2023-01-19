// require Express
const express = require('express')

// require the Model we just created
const Car = require('../models/car')

// Creating a router for us to make paths on
const router = express.Router()

router.get('/cars', (req,res, next)=>{
	Car.find()
	.then(cars =>{
		return cars.map(car => car)
	})
	.then(cars =>{
		res.status(200).json({ cars: cars })
	})
	.catch(next)
})
router.get('/cars/:id', (req,res,next) =>{
	Car.findById(req.params.id)
	.then(car =>{
		res.status(200).json({car: car})
	})
	.catch(next)
})
// CREATE
// POST /characters
router.post('/cars', (req, res, next) => {

	Car.create(req.body.car)
		.then((car) => {
			res.status(201).json({ car: car })
		})
		.catch(next)
})

// exporting the router to use elsewhere
module.exports = router