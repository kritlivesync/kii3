module.exports = async(app) => {
        app.get('/passport/account', M._passport, (req, res) => {
            console.log(req.user)
            res.render('example/account', { user: req.user });
        });

        app.get('/passport/login', (req, res) => {
            console.log(req.user)
            res.render('example/login', { user: req.user });
        });

        // // un comment when use passport login
        // app.get('/passport/auth/facebook', L.passport.authenticate('facebook',{scope:[ 'email', 'user_about_me']}), (req, res) => {});
        // app.get('/passport/auth/twitter', L.passport.authenticate('twitter'), (req, res) => {});
        // app.get('/passport/auth/google', L.passport.authenticate('google',{ scope:['profile','email']}), (req, res) => {});
        // app.get('/passport/auth/linkedin', L.passport.authenticate('linkedin',{ scope: [ 'r_basicprofile', 'r_emailaddress']}), (req, res) => {});

        // app.get('/passport/auth/facebook/callback', L.passport.authenticate('facebook', { failureRedirect: '/passport/login' }), (req, res) => {
        //     res.redirect('/passport/login'); 
        // });
        // app.get('/passport/auth/twitter/callback', L.passport.authenticate('twitter', { failureRedirect: '/passport/login' }), (req, res) => {
        //     res.redirect('/passport/login'); 
        // });
        // app.get('/passport/auth/google/callback', L.passport.authenticate('google', { failureRedirect: '/passport/login'}), (req, res) => {
        //     res.redirect('/passport/login'); 
        // });
        // app.get('/passport/auth/linkedin/callback', L.passport.authenticate('linkedin', { failureRedirect: '/passport/login' }), (req, res) => {
        //     res.redirect('/passport/login'); 
        // });

        app.get('/passport/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });
}
