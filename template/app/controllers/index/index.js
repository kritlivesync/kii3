module.exports = async(app) => {
    app.get('/', (req, res) => {
        res.render('index', { user: req.user });
    });
};