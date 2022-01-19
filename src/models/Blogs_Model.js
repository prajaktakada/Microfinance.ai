const mongoose = require('mongoose')

const BlogsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthorsDB',
        required: true
    },
    tags: [String],
    category: {
        type: String,
        required: true
    },
    subcategory: [String],
    createdAt:
    {
        type: Date,
        default: Date.now
    },
    updatedAt:
    {
        type: Date,
        default: null
    },
    deletedAt:
    {
        type: Date,
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('BlogsDB', BlogsSchema)