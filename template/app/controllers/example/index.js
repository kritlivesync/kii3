module.exports = async(app) => {
    app.get('/example/', (req, res) => {
        res.render('example/main', { user: req.user });
    });
};