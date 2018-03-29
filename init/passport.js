module.exports = function(app,passport) {
    function eachFiles(dir) {
        F.file.readdirSync(dir).forEach((name) => {
            if (F.path.extname(name) == '.js') {
                require(F.path.join(dir, name))(passport);
            } else if (name !== '.DS_Store') {
                eachFiles(F.path.join(dir, name));
            }
        })
    }
    
    if(C.auth && C.dir.strategy){
        L.passport = passport;

        app.use(passport.initialize())
        app.use(passport.session())

        passport.serializeUser(function(user, done) {
          done(null, user);
        });

        passport.deserializeUser(function(obj, done) {
          done(null, obj);
        });

        eachFiles(C.dir.strategy);        
    }

};