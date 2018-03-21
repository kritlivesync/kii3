const crypto = require('crypto');
module.exports = (Schema) => {

    const oAuthTypes = [
        'twitter',
        'facebook',
        'google',
        'linkedin'
    ];

    const UserSchema = new Schema({
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

    const validatePresenceOf = value => value && value.length;

    /**
     * Virtuals
     */

    UserSchema
        .virtual('password')
        .set(function(password) {
            this._password = password;
            this.salt = this.makeSalt();
            this.hash = this.encryptPassword(password);
        })
        .get(function() {
            return this._password;
        });


    UserSchema.path('name').validate(function(name) {
        if (this.skipValidation()) return true;
        return name.length;
    }, 'Name cannot be blank');

    UserSchema.path('email').validate(function(email) {
        if (this.skipValidation()) return true;
        return email.length;
    }, 'Email cannot be blank');

    UserSchema.path('email').validate(function(email, fn) {
        if (this.skipValidation()) fn(true);

        if (this.isNew || this.isModified('email')) {
            D._user.find({ email: email }).exec(function(err, users) {
                fn(!err && users.length === 0);
            });
        } else fn(true);
    }, 'Email already exists');

    UserSchema.path('username').validate(function(username) {
        if (this.skipValidation()) return true;
        return username.length;
    }, 'Username cannot be blank');

    UserSchema.path('hash').validate(function(hash) {
        if (this.skipValidation()) return true;
        return hash.length && this._password.length;
    }, 'Password cannot be blank');

    UserSchema.pre('save', function(next) {
        if (!this.isNew) return next();

        if (!validatePresenceOf(this.password) && !this.skipValidation()) {
            next(new Error('Invalid password'));
        } else {
            next();
        }
    });


    UserSchema.methods = {
        authenticate: function(plainText) {
            return this.encryptPassword(plainText) === this.hash;
        },
        makeSalt: function() {
            return Math.round((new Date().valueOf() * Math.random())) + '';
        },
        encryptPassword: function(password) {
            if (!password) return '';
            try {
                return crypto
                    .createHmac('sha1', this.salt)
                    .update(password)
                    .digest('hex');
            } catch (err) {
                return '';
            }
        },
        skipValidation: function() {
            return ~oAuthTypes.indexOf(this.provider);
        }
    };

    UserSchema.statics = {
        load: function(options, cb) {
            options.select = options.select || 'name username';
            return this.findOne(options.criteria)
                .select(options.select)
                .exec(cb);
        }
    };

    return UserSchema
}