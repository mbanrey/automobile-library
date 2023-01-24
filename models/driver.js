const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
	},
	{
		timestamps: true,
	}
)

module.exports = noteSchema
