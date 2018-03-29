const LocalStrategy = require('passport-local').Strategy;
module.exports = async(passport) => {
  if(C.auth.local){
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, next) => {
            D._user.findOne({
                 email: email
            }, (err, user) => {
                if (err) return next(err);
                if (!user) {
                    return next(null, false, { message: 'Unknown user' });
                }
                if (!F.pass.compare({'salt' : user.salt,'hash' : user.hash},password)) {
                    return next(null, false, { message: 'Invalid password' });
                }
                return next(null, user);
            });
        }
    ));
  }
};