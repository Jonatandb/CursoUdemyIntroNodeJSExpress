const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
    email: { type: String, required: true }
    data: {
        type: { age: Number, isMale: Boolean }
    },
    role: { type: String, enum: ['admin', 'seller'], default: 'seller' }
})

const model = mongoose.model('user', userSchema)

module.exports = model
