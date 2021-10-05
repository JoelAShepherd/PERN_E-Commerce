const express = require('express');
const paymentRouter = require('express').Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");

paymentRouter.use(bodyParser.urlencoded({ extended: true }));
paymentRouter.use(bodyParser.json());

paymentRouter.use(cors())

paymentRouter.post("/", cors(), async (req, res) => {
	let { amount, id } = req.headers

	try {
		const payment = await stripe.paymentIntents.create({
			amount: amount,
			currency: "GBP",
			description: "PernStack",
			payment_method: id,
			confirm: true
		});
		console.log("Payment", payment);
		res.json({
			"message": "Payment successful",
			"success": true
		});
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})



module.exports = paymentRouter; 