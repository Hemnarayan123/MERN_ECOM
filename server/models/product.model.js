import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {

        type: 'String',
        required : true,
    },

    price: {
        type : Number,
        required : true,
    },

    description: {
        type: "String",
        required: true,
    },

    category : {
        type : 'String',
        required: true,
        enum: ['fashion','sports', 'gadgets']

    },

    created_at: {
        type: "String",
        default : Date.now
    }
}, {timestamps: true})