module.exports = async(app) => {
    app.get('/', (req, res) => {
        res.redirect('/example');
    });
};