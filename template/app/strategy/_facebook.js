const FacebookStrategy = require('passport-facebook').Strategy;
module.exports = async(passport) => {
  if(C.auth.facebook){
    passport.use(new FacebookStrategy(C.auth.facebook, (accessToken, refreshToken, profile, next) => {
        console.log('facebook===>',profile)
        D._user.findOne({
            'facebook.id': profile.id
        }, (err, user) => {
            if (err) return next(err);
            if (!user) {
                D._user.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username,
                    provider: 'facebook',
                    facebook: profile._json
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