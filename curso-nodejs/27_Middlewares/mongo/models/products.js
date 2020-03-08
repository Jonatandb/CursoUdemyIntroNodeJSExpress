const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		images: { type: [{ type: String, require: true }], default: [] },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{
		timestamps: true
	}
)

const model = mongoose.model('Product', productSchema)

module.exports = model
