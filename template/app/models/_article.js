module.exports = (Schema) => {
    return new Schema({
        title: { type: String, default: '', trim: true },
        body: { type: String, default: '', trim: true },
        user: { type: Schema.ObjectId, ref: 'User' },
        comments: [{
            body: { type: String, default: '' },
            user: { type: Schema.ObjectId, ref: 'User' },
            createdAt: { type: Date, default: Date.now }
        }],
        tags: { type: [], get: (tags) => tags.join(','), set: (tags) => tags.split(',') },
        image: {
            cdnUri: String,
            files: []
        },
        createdAt: { type: Date, default: Date.now }
    })
}