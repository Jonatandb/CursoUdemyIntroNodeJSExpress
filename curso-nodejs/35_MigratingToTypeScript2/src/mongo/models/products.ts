import mongoose, { Document, Model, Schema } from 'mongoose'

const productSchema: Schema = new Schema(
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

//const model = model('Product', productSchema)

//module.exports = model
