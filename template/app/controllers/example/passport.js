module.exports = async(app) => {
    app.get('/passport/account', M._passport, (req, res) => {
        res.render('example/account', { user: req.user });
    });
    app.get('/passport/login', (req, res) => {
        res.render('example/login', { user: req.user });
    });
    app.get('/passport/auth/linkedin', L.passport.authenticate('linkedin'), (req, res) => {});
    app.get('/passport/auth/linkedin/callback', L.passport.authenticate('linkedin', { failureRedirect: '/passport/login' }), (req, res) => { res.redirect('/'); });
    app.get('/passport/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};