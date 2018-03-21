module.exports = async(app) => {
    app.post('/socket/login', (req, res) => {
        const id = Date.now();
        console.log(`Updating session for user ${id}`);
        req.session.login = true
        req.session.user = { _id: id };
        res.send({ result: 'OK', message: 'Session updated' });
    });
    app.delete('/socket/logout', (req, res) => {
        console.log('Destroying session');
        req.session.destroy();
        res.send({ result: 'OK', message: 'Session destroyed' });
    });
    app.post('/socket/noti', (req, res) => {
        var id = Date.now();
        R.publish("public", JSON.stringify({ data: id }));
        res.send({ result: 'OK', message: 'Send noti to socket ' + id });
    });
    app.get('/socket/test/:id', (req, res) => {
        var id = req.params.id;
        R.publish("user:" + id, JSON.stringify({ data: Date.now() }));
        res.send({ result: 'OK', message: 'Send noti to socket ' + id });
    });
};