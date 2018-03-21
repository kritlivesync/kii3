
module.exports = (Schema) => {
    return new Schema({
        name: { type: String, default: '' },
        email: { type: String, default: '' },
        username: { type: String, default: '' },
        provider: { type: String, default: '' },
        hash: { type: String, default: '' },
        salt: { type: String, default: '' },
        authToken: { type: String, default: '' },
        facebook: {},
        twitter: {},
        google: {},
        linkedin: {}
    });
}