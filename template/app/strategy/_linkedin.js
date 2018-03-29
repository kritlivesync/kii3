const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
module.exports = async(passport) => {
    if(C.auth.linkedin){
      passport.use(new LinkedinStrategy(C.auth.linkedin, (accessToken, refreshToken, profile, next) => {
          console.log('linkedin===>',profile)
          D._user.findOne({
              'linkedin.id': profile.id
          }, (err, user) => {
              if (err) return next(err);
              if (!user) {
                  D._user.create({
                      name: profile.displayName,
                      email: profile.emails[0].value,
                      username: profile.emails[0].value,
                      provider: 'linkedin',
                      linkedin: profile._json
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