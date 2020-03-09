import { Document, model, Schema } from 'mongoose'
import { IUser } from './users'

export interface IProduct extends Document {
	title: string
	description: string
	price: number
	images: Array<string> // También se puede poner: string[]
	user: IUser | string
}

const productSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		images: { type: [{ type: String, require: true }], default: [] },
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{
		timestamps: true
	}
)

export default model<IProduct>('Product', productSchema)
