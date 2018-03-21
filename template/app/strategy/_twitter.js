const TwitterStrategy = require('passport-twitter').Strategy;
module.exports = async(passport) => {
  if(C.auth.twitter){
    passport.use(new TwitterStrategy(C.auth.twitter, (accessToken, refreshToken, profile, next) => {
        D._user.findOne({
            criteria: { 'twitter.id_str': profile.id }
        }, (err, user) => {
            if (err) return next(err);
            if (!user) {
                D._user.create({
                    name: profile.displayName,
                    username: profile.username,
                    provider: 'twitter',
                    twitter: profile._json
                }, (err) => {
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