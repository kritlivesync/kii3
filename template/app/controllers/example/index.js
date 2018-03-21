module.exports = async(app) => {
    app.get('/example/', (req, res) => {
        res.render('example/passport', { user: req.user });
    });
};