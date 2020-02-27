const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true }
	},
	{
		timestamps: true
	}
)

const model = mongoose.model('product', productSchema)

module.exports = model
