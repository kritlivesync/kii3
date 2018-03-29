const GoogleStrategy = require('passport-google-oauth20').Strategy;
module.exports = async(passport) => {
  if(C.auth.google){
    passport.use(new GoogleStrategy(C.auth.google, (accessToken, refreshToken, profile, next) => {
        console.log('google===>',profile)
        D._user.findOne({
            'google.id': profile.id
        }, (err, user) => {
            if (err) return next(err);
            if (!user) {
                D._user.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username,
                    provider: 'google',
                    google: profile._json
                }, (err, user) => {
                    if (err) console.log(err);
                    return next(err, user);
                });
            } else {
                return next(err, user);
            }
        });
    }));
  }
};